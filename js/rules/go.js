// Go rules: the board, liberties, capture, suicide, ko (simple ko as the fast path, positional superko behind it),
// passes and area scoring.
// Positional superko: a move may not recreate any earlier board position of the game, whoever is to move. Positions
// are tracked as Zobrist hashes (two independent 32-bit hashes per position, joined as a string key), one entry per
// position reached; setup() resets the record, undo() removes the undone position.
// Pure data, no DOM: `scripts/rules-test.mjs` runs it under Node. Every board in the app goes through this.

export const EMPTY = 0, BLACK = 1, WHITE = 2
export const other = c => c === BLACK ? WHITE : BLACK
export const colorName = c => c === BLACK ? 'Black' : 'White'

// --- coordinates ---------------------------------------------------------------
// Lessons use the board notation players know: letters A–T skipping I for columns,
// numbers from the bottom for rows ("D4"). SGF files use two lowercase letters
// counted from the top-left ("dp"). Internally a point is an index, row-major from the top-left.
export const LETTERS = 'ABCDEFGHJKLMNOPQRST'

export function parseCoord(s, size) {
  const t = String(s).trim().toUpperCase()
  if (t === 'PASS') return null
  const m = t.match(/^([A-HJ-T])(\d{1,2})$/)
  if (!m) throw new Error(`Bad coordinate "${s}"`)
  const x = LETTERS.indexOf(m[1]), row = +m[2]
  if (x < 0 || x >= size || row < 1 || row > size) throw new Error(`Coordinate "${s}" is off a ${size}×${size} board`)
  return (size - row) * size + x
}
export function coordName(i, size) {
  if (i == null) return 'pass'
  const x = i % size, y = Math.floor(i / size)
  return LETTERS[x] + (size - y)
}
export function parseSgfCoord(s, size) {
  if (!s || (s === 'tt' && size <= 19)) return null // SGF "tt" (or empty) is a pass
  const x = s.charCodeAt(0) - 97, y = s.charCodeAt(1) - 97
  if (x < 0 || x >= size || y < 0 || y >= size) throw new Error(`SGF coordinate "${s}" is off a ${size}×${size} board`)
  return y * size + x
}
export function sgfCoord(i, size) { return i == null ? '' : String.fromCharCode(97 + i % size) + String.fromCharCode(97 + Math.floor(i / size)) }

// --- Zobrist hashing for superko ---------------------------------------------------
// Deterministic pseudo-random 32-bit values per (point, colour), from a seeded LCG, so hashes are stable across runs.
const ZOBRIST = new Map()   // size → Uint32Array(2 * 3 * size*size): [hashIndex][colour][point]
function zobrist(size) {
  let t = ZOBRIST.get(size)
  if (t) return t
  const n = size * size; t = new Uint32Array(2 * 3 * n)
  let x = (size * 2654435761) >>> 0 || 1
  for (let i = 0; i < t.length; i++) { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; x ^= x >>> 13; t[i] = x }
  ZOBRIST.set(size, t)
  return t
}

// --- the game -------------------------------------------------------------------
export class Game {
  constructor(size = 19, { komi = 7.5, handicap = 0 } = {}) {
    this.size = size
    this.komi = komi
    this.board = new Uint8Array(size * size)
    this.turn = BLACK
    this.captures = { [BLACK]: 0, [WHITE]: 0 } // stones captured *by* each colour
    this.ko = null           // point that may not be retaken this turn (simple ko)
    this.history = []        // {color, point, captured:[points], ko, passes}
    this.passes = 0          // consecutive passes; two end the game
    this.handicap = 0
    this.hash = [0, 0]       // Zobrist hash of the current board (two independent 32-bit hashes)
    this.seen = new Set([this._key(this.hash)])   // every board position reached so far (positional superko)
    if (handicap >= 2) { this.handicap = handicap; this.setup({ black: handicapPoints(size, handicap) }); this.turn = WHITE }
  }

  clone() {
    const g = new Game(this.size, { komi: this.komi })
    g.handicap = this.handicap
    g.board = this.board.slice(); g.turn = this.turn
    g.captures = { ...this.captures }; g.ko = this.ko; g.history = this.history.slice(); g.passes = this.passes
    g.hash = this.hash.slice(); g.seen = new Set(this.seen)
    return g
  }

  get(i) { return this.board[i] }
  get over() { return this.passes >= 2 }
  _key(h) { return h[0] + ':' + h[1] }
  /** flip the hash for a stone of `color` at `point` (adding and removing are the same operation) */
  _flip(h, point, color) { const t = zobrist(this.size), n = this.size * this.size; h[0] ^= t[color * n + point]; h[1] ^= t[3 * n + color * n + point] }
  _rehash() { this.hash = [0, 0]; for (let i = 0; i < this.board.length; i++) if (this.board[i]) this._flip(this.hash, i, this.board[i]); this.seen = new Set([this._key(this.hash)]) }

  neighbors(i) {
    const n = this.size, x = i % n, out = []
    if (x > 0) out.push(i - 1)
    if (x < n - 1) out.push(i + 1)
    if (i >= n) out.push(i - n)
    if (i < n * (n - 1)) out.push(i + n)
    return out
  }

  /** the chain of stones connected to `i`, and its liberties */
  group(i) {
    const color = this.board[i]
    if (!color) return null
    const stones = new Set([i]), liberties = new Set(), stack = [i]
    while (stack.length) {
      const p = stack.pop()
      for (const q of this.neighbors(p)) {
        const c = this.board[q]
        if (c === EMPTY) liberties.add(q)
        else if (c === color && !stones.has(q)) { stones.add(q); stack.push(q) }
      }
    }
    return { color, stones, liberties }
  }
  liberties(i) { const g = this.group(i); return g ? g.liberties.size : 0 }

  /** place stones without playing (SGF AB/AW, lesson diagrams). Throws if any group would have no liberties. */
  setup({ black = [], white = [] } = {}) {
    for (const i of black) this.board[i] = BLACK
    for (const i of white) this.board[i] = WHITE
    for (const i of [...black, ...white]) if (this.board[i] && this.liberties(i) === 0) throw new Error(`Setup stone at ${coordName(i, this.size)} has no liberties`)
    this._rehash()
    return this
  }

  /** is `point` a legal move for `color` (default: side to move)? Returns {ok, reason, captures} */
  check(point, color = this.turn) {
    if (point === null) return { ok: true, captures: [] }
    if (point < 0 || point >= this.board.length) return { ok: false, reason: 'off the board' }
    if (this.board[point] !== EMPTY) return { ok: false, reason: 'occupied' }
    if (point === this.ko) return { ok: false, reason: 'ko' }
    // captures first: an enemy group whose only liberty is this point dies
    const captures = []
    const opp = other(color)
    const seen = new Set()
    for (const q of this.neighbors(point)) {
      if (this.board[q] !== opp || seen.has(q)) continue
      const g = this.group(q)
      for (const s of g.stones) seen.add(s)
      if (g.liberties.size === 1) captures.push(...g.stones)
    }
    if (captures.length) {
      // positional superko: the position after the captures must be new (the simple-ko test above is its fast path)
      const h = this.hash.slice(); this._flip(h, point, color); for (const c of captures) this._flip(h, c, opp)
      if (this.seen.has(this._key(h))) return { ok: false, reason: 'superko' }
      return { ok: true, captures }
    }
    // no capture: the stone needs a liberty of its own, or a friendly group with one to spare
    for (const q of this.neighbors(point)) {
      if (this.board[q] === EMPTY) return { ok: true, captures }
      if (this.board[q] === color && this.liberties(q) > 1) return { ok: true, captures }
    }
    return { ok: false, reason: 'suicide' }
  }
  isLegal(point, color) { return this.check(point, color).ok }
  legalMoves(color = this.turn) {
    const out = []
    for (let i = 0; i < this.board.length; i++) if (this.board[i] === EMPTY && this.check(i, color).ok) out.push(i)
    return out
  }

  /** play a stone (point index) or pass (null). Returns the move record. Throws on an illegal move. */
  play(point, color = this.turn) {
    const r = this.check(point, color)
    if (!r.ok) throw new Error(`Illegal move at ${coordName(point, this.size)}: ${r.reason}`)
    const rec = { color, point, captured: r.captures, ko: this.ko, passes: this.passes }
    if (point === null) { this.passes++; this.ko = null } // a pass lifts the ko: the position has changed
    else {
      this.board[point] = color
      for (const c of r.captures) this.board[c] = EMPTY
      this.captures[color] += r.captures.length
      this.passes = 0
      this._flip(this.hash, point, color); for (const c of r.captures) this._flip(this.hash, c, other(color))
      this.seen.add(this._key(this.hash))
      // simple ko: a single stone that captured a single stone and now has exactly one liberty
      this.ko = null
      if (r.captures.length === 1) {
        const g = this.group(point)
        if (g.stones.size === 1 && g.liberties.size === 1) this.ko = r.captures[0]
      }
    }
    this.turn = other(color)
    this.history.push(rec)
    return rec
  }
  pass(color = this.turn) { return this.play(null, color) }

  undo() {
    const rec = this.history.pop()
    if (!rec) return null
    if (rec.point !== null) {
      this.seen.delete(this._key(this.hash))
      this.board[rec.point] = EMPTY
      for (const c of rec.captured) this.board[c] = other(rec.color)
      this.captures[rec.color] -= rec.captured.length
      this._flip(this.hash, rec.point, rec.color); for (const c of rec.captured) this._flip(this.hash, c, other(rec.color))
    }
    this.ko = rec.ko; this.passes = rec.passes; this.turn = rec.color
    return rec
  }

  /** Area (Chinese) scoring: stones on the board plus empty regions bordered by one colour only.
   *  `dead` lists stones to remove first (agreed dead at the end of a game). Seki regions count for nobody. */
  score(dead = []) {
    const n = this.size, b = this.board.slice()
    for (const i of dead) b[i] = EMPTY
    const area = { [BLACK]: 0, [WHITE]: 0 }
    const owner = new Int8Array(n * n) // 0 neutral, 1 black, 2 white (for painting)
    const seen = new Uint8Array(n * n)
    for (let i = 0; i < b.length; i++) {
      if (b[i]) { area[b[i]]++; owner[i] = b[i]; continue }
      if (seen[i]) continue
      // flood the empty region, noting which colours border it
      const region = [], stack = [i]; seen[i] = 1
      let touches = 0
      while (stack.length) {
        const p = stack.pop(); region.push(p)
        for (const q of this.neighbors(p)) {
          if (b[q]) touches |= b[q] === BLACK ? 1 : 2
          else if (!seen[q]) { seen[q] = 1; stack.push(q) }
        }
      }
      const who = touches === 1 ? BLACK : touches === 2 ? WHITE : 0
      if (who) { area[who] += region.length; for (const p of region) owner[p] = who }
    }
    const black = area[BLACK], white = area[WHITE] + this.komi
    return { black, white, komi: this.komi, margin: black - white, winner: black > white ? BLACK : white > black ? WHITE : 0, owner }
  }
}

/** star points (hoshi) for the common sizes */
export function starPoints(size) {
  if (size === 19) return [3, 9, 15].flatMap(y => [3, 9, 15].map(x => y * 19 + x))
  if (size === 13) return [3, 9].flatMap(y => [3, 9].map(x => y * 13 + x)).concat([6 * 13 + 6])
  if (size === 9) return [2, 6].flatMap(y => [2, 6].map(x => y * 9 + x)).concat([4 * 9 + 4])
  if (size >= 7 && size % 2 === 1) return [Math.floor(size / 2) * size + Math.floor(size / 2)]
  return []
}

/** fixed handicap placement (the traditional order): upper right, lower left, lower right, upper left, then the centre,
 *  then the side star points (left and right, then top and bottom). 9×9 and 13×13 have no side star points here, so at most 5. */
export function handicapPoints(size, n) {
  const c = size === 19 ? 3 : size === 13 ? 3 : size === 9 ? 2 : 3, f = size - 1 - c, m = Math.floor(size / 2)
  const P = (x, y) => y * size + x
  const order = [P(f, c), P(c, f), P(f, f), P(c, c)]           // UR, LL, LR, UL  (y counted from the top)
  const sides = size === 19 ? [P(c, m), P(f, m), P(m, c), P(m, f)] : []
  const centre = P(m, m)
  const max = 4 + (sides.length ? 5 : 1)
  if (n < 2 || n > max) throw new Error(`handicap ${n} is not available on ${size}×${size}`)
  if (n <= 4) return order.slice(0, n)
  if (n === 5) return [...order, centre]
  if (n === 6) return [...order, sides[0], sides[1]]
  if (n === 7) return [...order, sides[0], sides[1], centre]
  if (n === 8) return [...order, ...sides]
  return [...order, ...sides, centre]
}
export const maxHandicap = size => (size === 19 ? 9 : 5)

/** parse "D4 E5, C3" into point indexes */
export function parseCoords(s, size) { return s ? String(s).split(/[,\s]+/).filter(Boolean).map(c => parseCoord(c, size)) : [] }
