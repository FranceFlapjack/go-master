// Life-and-death reader: the checker's oracle for the life-and-death track (see CLAUDE.md, Oracles).
// Given a target chain, it searches every move inside the chain's eye space (plus passes) for both sides
// and returns 'dead', 'alive' or 'unknown':
//   dead    — the attacker can capture the chain whatever the defender does (a proof, with the line);
//   alive   — the attacker cannot: every attacking try is answered, until the chain is pass-alive
//             (Benson's test: it cannot be captured even if the defender always passes) or both sides pass;
//   unknown — the search ran out of depth or nodes (a ko fight, or too big a region). The checker treats
//             unknown as failure: a problem must be small enough to read out completely.
// Scope: the region is the empty space reachable from the target's liberties plus any chains whose liberties
// all lie inside it; moves outside it are not considered. So the surrounding wall is taken as safe. Use it on
// enclosed corner and edge problems with a region of about ten points or fewer — the classical beginner shapes.
import { FastBoard, EMPTY, BLACK, WHITE } from '../bot/board.js'

const other = c => 3 - c
const DEFAULTS = { maxDepth: 18, maxNodes: 400000, maxRegion: 14 }

/** Benson's algorithm: the points of every chain of `color` that is unconditionally (pass-)alive. */
export function passAlive(board, size, color) {
  const n = size * size
  const nb = neighbours(size)
  // label chains of `color` and regions (connected sets of non-`color` points)
  const chainId = new Int32Array(n).fill(-1), regionId = new Int32Array(n).fill(-1)
  const chains = [], regions = []
  const stack = []
  for (let i = 0; i < n; i++) {
    if (board[i] === color) {
      if (chainId[i] >= 0) continue
      const id = chains.length; chains.push({ stones: [], libs: new Set(), regions: new Set(), vital: new Set() })
      stack.push(i); chainId[i] = id
      while (stack.length) { const p = stack.pop(); chains[id].stones.push(p); for (const q of nb[p]) { if (board[q] === color && chainId[q] < 0) { chainId[q] = id; stack.push(q) } else if (board[q] === EMPTY) chains[id].libs.add(q) } }
    } else {
      if (regionId[i] >= 0) continue
      const id = regions.length; regions.push({ points: [], empties: [], chains: new Set() })
      stack.push(i); regionId[i] = id
      while (stack.length) { const p = stack.pop(); regions[id].points.push(p); if (board[p] === EMPTY) regions[id].empties.push(p); for (const q of nb[p]) { if (board[q] !== color) { if (regionId[q] < 0) { regionId[q] = id; stack.push(q) } } } }
    }
  }
  // which chains border which regions; a region is vital to a chain if all its empty points are that chain's liberties
  for (let r = 0; r < regions.length; r++) {
    const reg = regions[r]
    for (const p of reg.points) for (const q of nb[p]) if (board[q] === color) { reg.chains.add(chainId[q]); chains[chainId[q]].regions.add(r) }
    for (const c of reg.chains) if (reg.empties.every(e => chains[c].libs.has(e))) chains[c].vital.add(r)
  }
  const liveChain = new Uint8Array(chains.length).fill(1), liveRegion = new Uint8Array(regions.length).fill(1)
  let changed = true
  while (changed) {
    changed = false
    for (let c = 0; c < chains.length; c++) {
      if (!liveChain[c]) continue
      let vital = 0; for (const r of chains[c].vital) if (liveRegion[r]) vital++
      if (vital < 2) { liveChain[c] = 0; changed = true }
    }
    for (let r = 0; r < regions.length; r++) {
      if (!liveRegion[r]) continue
      for (const c of regions[r].chains) if (!liveChain[c]) { liveRegion[r] = 0; changed = true; break }
    }
  }
  const out = new Uint8Array(n)
  for (let c = 0; c < chains.length; c++) if (liveChain[c]) for (const p of chains[c].stones) out[p] = 1
  return out
}

function neighbours(size) {
  const n = size * size, out = []
  for (let i = 0; i < n; i++) {
    const x = i % size, y = (i - x) / size, a = []
    if (x > 0) a.push(i - 1); if (x < size - 1) a.push(i + 1); if (y > 0) a.push(i - size); if (y < size - 1) a.push(i + size)
    out.push(a)
  }
  return out
}

/** the eye space around the target: the empty points reachable from its liberties, grown until it is closed —
 *  a chain (either colour, not the target) whose liberties all lie inside joins it, since it can be captured and its
 *  points played on; an empty point joins when every neighbour is inside, is the target, or belongs to a chain that
 *  touches the inside (a point hemmed in by inside stones, like the corner point behind a cutting stone). */
export function lifeRegion(board, size, target) {
  const nb = neighbours(size), n = size * size
  const color = board[target]
  const inRegion = new Uint8Array(n), stack = []
  const targetStones = new Uint8Array(n); stack.push(target); targetStones[target] = 1
  while (stack.length) { const p = stack.pop(); for (const q of nb[p]) if (board[q] === color && !targetStones[q]) { targetStones[q] = 1; stack.push(q) } }
  const floodEmpty = from => { stack.push(...from); for (const f of from) inRegion[f] = 1; while (stack.length) { const p = stack.pop(); for (const q of nb[p]) if (board[q] === EMPTY && !inRegion[q]) { inRegion[q] = 1; stack.push(q) } } }
  const seeds = []; for (let i = 0; i < n; i++) if (targetStones[i]) for (const q of nb[i]) if (board[q] === EMPTY && !inRegion[q]) seeds.push(q)
  floodEmpty(seeds)
  // chains, once
  const chainId = new Int32Array(n).fill(-1), chains = []
  for (let i = 0; i < n; i++) {
    if (!board[i] || chainId[i] >= 0) continue
    const id = chains.length, stones = [], libs = new Set(); chainId[i] = id; stack.push(i)
    while (stack.length) { const p = stack.pop(); stones.push(p); for (const q of nb[p]) { if (board[q] === board[i] && chainId[q] < 0) { chainId[q] = id; stack.push(q) } else if (board[q] === EMPTY) libs.add(q) } }
    chains.push({ stones, libs, target: !!targetStones[i] })
  }
  let grew = true
  while (grew) {
    grew = false
    for (const c of chains) {
      if (c.target || inRegion[c.stones[0]] || !c.libs.size) continue
      let all = true; for (const l of c.libs) if (!inRegion[l]) { all = false; break }
      if (all) { for (const s of c.stones) inRegion[s] = 1; grew = true }
    }
    for (let p = 0; p < n; p++) {
      if (board[p] !== EMPTY || inRegion[p]) continue
      let closed = true
      for (const q of nb[p]) {
        if (inRegion[q] || targetStones[q]) continue
        if (board[q] === EMPTY) { closed = false; break }
        let touches = false; for (const l of chains[chainId[q]].libs) if (inRegion[l]) { touches = true; break }
        if (!touches) { closed = false; break }
      }
      if (closed) { floodEmpty([p]); grew = true }
    }
  }
  const points = []; for (let i = 0; i < n; i++) if (inRegion[i]) points.push(i)
  return { points, targetStones }
}

/**
 * Status of the chain at `target` with `turn` to move. game: a Game (js/rules/go.js) or {size, board, turn, ko}.
 * Returns {status: 'dead'|'alive'|'unknown', line: [points or null], nodes, complete}
 */
export function lifeStatus(game, target, turn = game.turn, o = {}) {
  const opt = { ...DEFAULTS, ...o }
  const size = game.size, n = size * size
  const color = game.board[target]
  if (!color) throw new Error('life search: no stone at the target')
  const attacker = other(color)
  const { points } = lifeRegion(game.board, size, target)
  if (points.length > opt.maxRegion) return { status: 'unknown', line: [], nodes: 0, complete: false, reason: `region of ${points.length} points is larger than ${opt.maxRegion}` }
  const root = new FastBoard(size).load(game.board, turn, game.ko ?? null, 0)
  const table = new Map()
  let nodes = 0, aborted = false

  function key(bd) { let s = bd.turn + ':' + bd.ko + ':' + bd.passes + ':'; for (const p of points) s += bd.board[p]; return s }

  /** returns {status, line} for the position with bd.turn to move */
  function search(bd, depth) {
    if (aborted) return { status: 'unknown', line: [] }
    if (bd.board[target] !== color) return { status: 'dead', line: [] }        // the anchor stone is gone: captured
    if (bd.passes >= 2) return { status: 'alive', line: [] }                   // both passed: the attacker had nothing
    if (passAlive(bd.board, size, color)[target]) return { status: 'alive', line: [] }
    if (depth >= opt.maxDepth) return { status: 'unknown', line: [] }
    if (++nodes > opt.maxNodes) { aborted = true; return { status: 'unknown', line: [] } }
    const k = key(bd)
    const hit = table.get(k); if (hit) return hit
    const mover = bd.turn, want = mover === attacker ? 'dead' : 'alive', lose = mover === attacker ? 'alive' : 'dead'
    let unknown = false, fallback = null
    const moves = points.filter(p => bd.board[p] === EMPTY && bd.isLegal(p, mover)); moves.push(-1)
    for (const mv of moves) {
      const next = new FastBoard(size).copyFrom(bd); next.play(mv)
      const r = search(next, depth + 1)
      if (r.status === want) { const res = { status: want, line: [mv < 0 ? null : mv, ...r.line] }; table.set(k, res); return res }
      if (r.status === 'unknown') unknown = true
      else if (!fallback) fallback = [mv < 0 ? null : mv, ...r.line]
    }
    if (unknown) return { status: 'unknown', line: [] }
    const res = { status: lose, line: fallback || [] }
    table.set(k, res)
    return res
  }
  const r = search(root, 0)
  return { status: r.status, line: r.line, nodes, complete: !aborted, region: points }
}
