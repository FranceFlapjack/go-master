// The computer opponent: plain Monte-Carlo tree search (UCT) over FastBoard, random playouts that never
// fill their own eyes, area scoring at the end. No patterns, no neural network, no opening book —
// on 9×9 with a second or two per move it plays like a beginner who has read the capturing track,
// which is exactly the opponent this course needs first. Pure module, no DOM: runs in a Web Worker
// (js/bot/worker.js) and under Node (scripts/bot-test.mjs).
import { FastBoard, BLACK, WHITE, EMPTY } from './board.js'

const PASS = -1

/** a seedable PRNG (mulberry32) so tests are repeatable */
export function rng(seed = 1) {
  let a = seed >>> 0
  return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

/** the playout policy's one piece of Go knowledge: answer the last move if it made an atari.
 *  Capture the last-played chain if it has one liberty; else save an own chain next to it that is in atari,
 *  by playing its liberty when that gives two or more. Returns a move or −1. */
function atariReply(b, color) {
  const last = b.last
  if (last < 0) return PASS
  const board = b.board, nb = b.nb, opp = 3 - color
  if (b._flood(last) === 1) {
    // its single liberty: find it among the chain's neighbours
    const chain = b._chain, count = b._count
    for (let j = 0; j < count; j++) for (let k = 0; k < 4; k++) { const q = nb[chain[j] * 4 + k]; if (q >= 0 && board[q] === EMPTY) { if (b.isLegal(q, color)) return q; return PASS } }
  }
  for (let k = 0; k < 4; k++) {
    const q = nb[last * 4 + k]
    if (q < 0 || board[q] !== color || b._flood(q) !== 1) continue
    const chain = b._chain, count = b._count
    for (let j = 0; j < count; j++) for (let m = 0; m < 4; m++) {
      const r = nb[chain[j] * 4 + m]
      if (r >= 0 && board[r] === EMPTY) { if (b.libsAfter(r, color) >= 2 && b.isLegal(r, color)) return r; j = count; break }
    }
  }
  return PASS
}

/** one random game from `b` to the end (two passes or the move cap). Returns Black's margin. */
export function playout(b, komi, rand, cap) {
  const n = b.n, board = b.board
  while (b.passes < 2 && b.moves < cap) {
    const color = b.turn
    let move = PASS
    if (rand() < 0.9) move = atariReply(b, color)
    if (move < 0) {
      // pick a random empty point and probe forward from it: no allocation, no legal-move list
      const start = (rand() * n) | 0
      for (let t = 0; t < n; t++) {
        const p = (start + t) % n
        if (board[p] !== EMPTY || b.isEye(p, color) || !b.isLegal(p, color)) continue
        move = p; break
      }
    }
    b.play(move)
  }
  return b.score(komi)
}

class Node {
  constructor(move, color) { this.move = move; this.color = color; this.visits = 0; this.wins = 0; this.children = null; this.untried = null }
}

/** every legal move for the side to move that is not a true eye of its own, plus pass */
function candidateMoves(b) {
  const out = []
  for (let p = 0; p < b.n; p++) if (b.board[p] === EMPTY && !b.isEye(p, b.turn) && b.isLegal(p, b.turn)) out.push(p)
  out.push(PASS)
  return out
}

/**
 * Think about a position. `pos` = {size, board (array of 0/1/2), turn, ko (index or null), komi, passes}.
 * `passes` matters: after the opponent's pass, a pass ends the game on the current count, and the search sees that.
 * Options: timeMs (wall-clock budget), maxPlayouts, seed, uct (exploration constant).
 * Returns {move: index or null for pass, winrate (for the side to move), visits, playouts, ms, ownership}
 * where ownership[i] is how often point i ended up Black's (1) or White's (−1) across the playouts.
 */
export function think(pos, { timeMs = 1500, maxPlayouts = 200000, seed = Date.now(), uct = 0.9 } = {}) {
  const rand = rng(seed)
  const size = pos.size, n = size * size, komi = pos.komi ?? 7.5
  const root = new FastBoard(size).load(pos.board, pos.turn, pos.ko, pos.passes || 0)
  const b = new FastBoard(size)
  const cap = n * 2
  const t0 = now()
  const rootNode = new Node(PASS, 3 - pos.turn)
  rootNode.untried = candidateMoves(root)
  const own = new Float64Array(n), ownBuf = new Uint8Array(n)
  const path = []
  let playouts = 0

  while (playouts < maxPlayouts) {
    if ((playouts & 15) === 0 && now() - t0 > timeMs) break
    b.copyFrom(root)
    let node = rootNode
    path.length = 0; path.push(node)
    // select
    while (node.untried && node.untried.length === 0 && node.children && node.children.length) {
      let best = null, bestU = -1
      const logN = Math.log(node.visits + 1)
      for (const c of node.children) {
        const u = c.wins / c.visits + uct * Math.sqrt(logN / c.visits)
        if (u > bestU) { bestU = u; best = c }
      }
      node = best; path.push(node)
      b.play(node.move)
      if (b.passes >= 2) break
    }
    // expand one untried move
    if (b.passes < 2) {
      if (node.untried === null) node.untried = candidateMoves(b)
      if (node.untried.length) {
        const k = (rand() * node.untried.length) | 0
        const mv = node.untried[k]; node.untried[k] = node.untried[node.untried.length - 1]; node.untried.pop()
        const child = new Node(mv, b.turn)
        if (!node.children) node.children = []
        node.children.push(child)
        b.play(mv)
        node = child; path.push(node)
      }
    }
    // simulate
    const margin = b.passes >= 2 ? b.score(komi) : playout(b, komi, rand, cap)
    const blackWins = margin > 0 ? 1 : margin < 0 ? 0 : 0.5
    b.owners(ownBuf)
    for (let i = 0; i < n; i++) own[i] += ownBuf[i] === BLACK ? 1 : ownBuf[i] === WHITE ? -1 : 0
    // backpropagate: each node's wins are from the point of view of the colour that played node.move
    for (const nd of path) { nd.visits++; nd.wins += nd.color === BLACK ? blackWins : 1 - blackWins }
    playouts++
  }

  // the most visited child is the move; ties broken by win rate
  let best = null
  for (const c of rootNode.children || []) {
    if (!best || c.visits > best.visits || (c.visits === best.visits && c.wins / c.visits > best.wins / best.visits)) best = c
  }
  const ownership = new Float32Array(n)
  for (let i = 0; i < n; i++) ownership[i] = playouts ? own[i] / playouts : 0
  if (!best) return { move: null, winrate: 0.5, visits: 0, playouts, ms: now() - t0, ownership }
  return { move: best.move === PASS ? null : best.move, winrate: best.wins / best.visits, visits: best.visits, playouts, ms: now() - t0, ownership }
}

/** a uniformly random legal, non-eye-filling move; the sparring partner for the tests */
export function randomMove(pos, rand = Math.random) {
  const b = new FastBoard(pos.size).load(pos.board, pos.turn, pos.ko, pos.passes || 0)
  const c = candidateMoves(b)
  const mv = c[(rand() * (c.length - 1)) | 0] // never pass while a move exists
  return c.length === 1 ? null : mv
}

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now())
