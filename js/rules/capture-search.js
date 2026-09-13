// Capture search: can the attacker capture a given chain, if the defender plays as well as possible?
// The classic ladder / net reader. Scope, deliberately narrow so it stays fast and honest:
//   - the attacker only plays ataris (moves that leave the chain with one liberty), except for
//     at most `quiet` non-atari moves per line (the net stone);
//   - the defender extends from the chain's liberties, or captures an adjacent attacking chain in atari;
//   - the chain has escaped when it reaches `safe` liberties (3) after a defender move, or when
//     the attacker has no working continuation.
// Used by scripts/check-content.mjs for `expect: kill` / `expect: escape`, never in the page.
import { other } from './go.js'

const DEFAULTS = { maxDepth: 60, quiet: 1, safe: 3 }

/** attacker to move: {captured: bool, line: [points…]} */
export function canCapture(game, target, o = {}) {
  const opt = { ...DEFAULTS, ...o }
  const r = attack(game, target, opt.maxDepth, opt.quiet, opt)
  return r ? { captured: true, line: r } : { captured: false, line: [] }
}
/** defender to move: {escaped: bool, line} */
export function canEscape(game, target, o = {}) {
  const opt = { ...DEFAULTS, ...o }
  const r = defend(game, target, opt.maxDepth, opt.quiet, opt)
  return r ? { escaped: true, line: r } : { escaped: false, line: [] }
}

function attack(game, target, depth, quiet, opt) {
  const g = game.group(target)
  if (!g) return [] // already gone
  const libs = [...g.liberties]
  if (libs.length === 0) return []
  if (depth <= 0) return null
  const me = other(g.color)
  // candidates: the chain's liberties first (ataris), then, if a quiet move is allowed, the empty neighbours of its liberties
  const cands = new Set(libs)
  if (quiet > 0 && libs.length >= 2) for (const l of libs) for (const n of game.neighbors(l)) if (game.board[n] === 0) cands.add(n)
  for (const m of cands) {
    if (!game.check(m, me).ok) continue
    const trial = game.clone(); trial.play(m, me)
    const after = trial.group(target)
    if (!after) return [m] // the move captured it outright
    const nl = after.liberties.size
    const isAtari = nl <= 1
    if (!isAtari && (quiet <= 0 || nl > 2)) continue // a quiet move that leaves 3+ liberties is not a capturing attempt
    const reply = defend(trial, target, depth - 1, isAtari ? quiet : quiet - 1, opt)
    if (reply === null) return [m] // no escape: captured (the refutation lines are not kept)
  }
  return null
}

function defend(game, target, depth, quiet, opt) {
  const g = game.group(target)
  if (!g) return null // captured
  if (g.liberties.size >= opt.safe) return [] // safe
  if (depth <= 0) return [] // unresolved counts as escape: the checker errs on the side of "not proven"
  const me = g.color
  const cands = new Set(g.liberties)
  // capturing an adjacent attacking chain in atari
  for (const s of g.stones) for (const n of game.neighbors(s)) {
    if (game.board[n] !== other(me)) continue
    const ag = game.group(n)
    if (ag.liberties.size === 1) cands.add([...ag.liberties][0])
  }
  for (const m of cands) {
    if (!game.check(m, me).ok) continue
    const trial = game.clone(); trial.play(m, me)
    const after = trial.group(target)
    if (after.liberties.size >= opt.safe) return [m]
    if (after.liberties.size <= 1 && !trial.history[trial.history.length - 1].captured.length) continue // self-atari that captures nothing
    const att = attack(trial, target, depth - 1, quiet, opt)
    if (att === null) return [m] // the attacker has nothing: escaped
  }
  return null
}
