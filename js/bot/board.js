// A fast board for the bot's playouts. Same rules as js/rules/go.js (capture before suicide, simple ko,
// area scoring) but typed arrays only, no Sets, no history, no allocation per move: a Monte-Carlo search
// plays thousands of games per second on 9×9. scripts/bot-test.mjs checks it against the reference engine
// move by move on random games, so the two cannot drift apart unnoticed.
export const EMPTY = 0, BLACK = 1, WHITE = 2
const other = c => 3 - c

export class FastBoard {
  constructor(size) {
    this.size = size
    const n = size * size
    this.n = n
    this.board = new Uint8Array(n)
    this.turn = BLACK
    this.ko = -1
    this.passes = 0
    this.moves = 0
    this.last = -1          // the last stone played (−1 after a pass)
    // scratch space reused by every flood fill
    this._stamp = new Uint32Array(n); this._gen = 0
    this._stack = new Int32Array(n)
    this._chain = new Int32Array(n)
    // neighbours precomputed: 4 entries per point, -1 for off-board
    this.nb = new Int32Array(n * 4)
    for (let i = 0; i < n; i++) {
      const x = i % size, y = (i - x) / size
      this.nb[i * 4] = x > 0 ? i - 1 : -1
      this.nb[i * 4 + 1] = x < size - 1 ? i + 1 : -1
      this.nb[i * 4 + 2] = y > 0 ? i - size : -1
      this.nb[i * 4 + 3] = y < size - 1 ? i + size : -1
    }
    // diagonals, for the eye test
    this.dg = new Int32Array(n * 4)
    for (let i = 0; i < n; i++) {
      const x = i % size, y = (i - x) / size
      this.dg[i * 4] = x > 0 && y > 0 ? i - size - 1 : -1
      this.dg[i * 4 + 1] = x < size - 1 && y > 0 ? i - size + 1 : -1
      this.dg[i * 4 + 2] = x > 0 && y < size - 1 ? i + size - 1 : -1
      this.dg[i * 4 + 3] = x < size - 1 && y < size - 1 ? i + size + 1 : -1
    }
  }

  /** load a position (board array of 0/1/2, side to move, ko point or null, consecutive passes so far) */
  load(board, turn, ko, passes = 0) {
    this.board.set(board); this.turn = turn; this.ko = ko == null ? -1 : ko; this.passes = passes; this.moves = 0; this.last = -1
    return this
  }
  copyFrom(b) {
    this.board.set(b.board); this.turn = b.turn; this.ko = b.ko; this.passes = b.passes; this.moves = b.moves; this.last = b.last
    return this
  }

  /** flood the chain at p into _chain[0.._count); returns its liberty count (each liberty counted once). */
  _flood(p) {
    const color = this.board[p], nb = this.nb, board = this.board, stamp = this._stamp, chain = this._chain, stack = this._stack
    const gen = ++this._gen
    let sp = 0, count = 0, libs = 0
    stack[sp++] = p; stamp[p] = gen
    while (sp) {
      const q = stack[--sp]; chain[count++] = q
      for (let k = 0; k < 4; k++) {
        const r = nb[q * 4 + k]
        if (r < 0 || stamp[r] === gen) continue
        stamp[r] = gen
        const c = board[r]
        if (c === EMPTY) libs++
        else if (c === color) stack[sp++] = r
      }
    }
    this._count = count
    return libs
  }

  /** liberties of the chain at p (0 for an empty point) */
  liberties(p) { return this.board[p] ? this._flood(p) : 0 }

  /** is `p` a legal move for `color`? Same rule as Game.check: captures first, then suicide. */
  isLegal(p, color = this.turn) {
    const board = this.board
    if (board[p] !== EMPTY || p === this.ko) return false
    const nb = this.nb, opp = other(color)
    // a neighbouring enemy chain with one liberty makes the move legal (it captures)
    for (let k = 0; k < 4; k++) {
      const q = nb[p * 4 + k]
      if (q >= 0 && board[q] === opp && this._flood(q) === 1) return true
    }
    for (let k = 0; k < 4; k++) {
      const q = nb[p * 4 + k]
      if (q < 0) continue
      if (board[q] === EMPTY) return true
      if (board[q] === color && this._flood(q) > 1) return true
    }
    return false
  }

  /** play p (or -1 for pass) for the side to move. Caller checks legality first. Returns stones captured. */
  play(p) {
    this.moves++
    if (p < 0) { this.passes++; this.ko = -1; this.last = -1; this.turn = other(this.turn); return 0 }
    const color = this.turn, opp = other(color), board = this.board, nb = this.nb, chain = this._chain
    board[p] = color
    let captured = 0, lastCaptured = -1
    for (let k = 0; k < 4; k++) {
      const q = nb[p * 4 + k]
      if (q < 0 || board[q] !== opp) continue
      if (this._flood(q) === 0) {
        for (let j = 0; j < this._count; j++) { board[chain[j]] = EMPTY; lastCaptured = chain[j] }
        captured += this._count
      }
    }
    // simple ko: a lone stone that took exactly one stone and has exactly one liberty
    this.ko = -1
    if (captured === 1) {
      let lone = true
      for (let k = 0; k < 4; k++) { const q = nb[p * 4 + k]; if (q >= 0 && board[q] === color) { lone = false; break } }
      if (lone && this._flood(p) === 1) this.ko = lastCaptured
    }
    this.passes = 0
    this.last = p
    this.turn = opp
    return captured
  }

  /** rough liberty count a stone of `color` would have at empty `p` (empty neighbours plus the liberties of
   *  adjacent friendly chains, minus p itself; may double count). Used by the playout to avoid self-atari. */
  libsAfter(p, color) {
    const board = this.board, nb = this.nb
    let libs = 0
    for (let k = 0; k < 4; k++) {
      const q = nb[p * 4 + k]
      if (q < 0) continue
      if (board[q] === EMPTY) libs++
      else if (board[q] === color) libs += this._flood(q) - 1
    }
    return libs
  }

  /** a true eye for `color` at empty point p: all neighbours `color`, and diagonals mostly `color`
   *  (interior: at most one diagonal not ours; edge/corner: none). The playout never fills these. */
  isEye(p, color) {
    const board = this.board, nb = this.nb, dg = this.dg
    for (let k = 0; k < 4; k++) { const q = nb[p * 4 + k]; if (q >= 0 && board[q] !== color) return false }
    let bad = 0, offBoard = 0
    for (let k = 0; k < 4; k++) {
      const q = dg[p * 4 + k]
      if (q < 0) offBoard++
      else if (board[q] === other(color)) bad++
    }
    return offBoard ? bad === 0 : bad <= 1
  }

  /** Tromp–Taylor area count: black stones + black territory − (white + komi). Positive is good for Black.
   *  Regions bordered by both colours count for nobody. */
  score(komi) {
    const board = this.board, nb = this.nb, n = this.n, stamp = this._stamp, stack = this._stack
    const gen = ++this._gen
    let black = 0, white = 0
    for (let i = 0; i < n; i++) {
      const c = board[i]
      if (c === BLACK) black++
      else if (c === WHITE) white++
      else if (stamp[i] !== gen) {
        let sp = 0, size = 0, touches = 0
        stack[sp++] = i; stamp[i] = gen
        while (sp) {
          const q = stack[--sp]; size++
          for (let k = 0; k < 4; k++) {
            const r = nb[q * 4 + k]
            if (r < 0) continue
            const rc = board[r]
            if (rc === EMPTY) { if (stamp[r] !== gen) { stamp[r] = gen; stack[sp++] = r } }
            else touches |= rc
          }
        }
        if (touches === BLACK) black += size
        else if (touches === WHITE) white += size
      }
    }
    return black - white - komi
  }

  /** per-point owner after the game (for dead-stone guesses): 1 black, 2 white, 0 neutral */
  owners(out) {
    const board = this.board, nb = this.nb, n = this.n, stamp = this._stamp, stack = this._stack
    const gen = ++this._gen
    for (let i = 0; i < n; i++) {
      const c = board[i]
      if (c) { out[i] = c; continue }
      if (stamp[i] === gen) continue
      let sp = 0, touches = 0, start = 0
      const region = this._chain
      stack[sp++] = i; stamp[i] = gen
      while (sp) {
        const q = stack[--sp]; region[start++] = q
        for (let k = 0; k < 4; k++) {
          const r = nb[q * 4 + k]
          if (r < 0) continue
          const rc = board[r]
          if (rc === EMPTY) { if (stamp[r] !== gen) { stamp[r] = gen; stack[sp++] = r } }
          else touches |= rc
        }
      }
      const who = touches === BLACK ? BLACK : touches === WHITE ? WHITE : 0
      for (let j = 0; j < start; j++) out[region[j]] = who
    }
    return out
  }
}
