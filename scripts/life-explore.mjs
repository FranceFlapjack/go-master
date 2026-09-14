#!/usr/bin/env node
// Authoring helper for life-and-death problems. Prints every working first move for the reader and, for each,
// a working answer to every opponent reply, in the solution-tree syntax. Usage:
//   node scripts/life-explore.mjs <size> "<black stones>" "<white stones>" <target> <b|w to move> <live|dead>
import { Game, BLACK, WHITE, parseCoord, parseCoords, coordName } from '../js/rules/go.js'
import { lifeStatus } from '../js/rules/life-search.js'

const [size, black, white, target, mover, expect] = process.argv.slice(2)
const n = +size
const g = new Game(n).setup({ black: parseCoords(black, n), white: parseCoords(white, n) })
const t = parseCoord(target, n)
const reader = mover === 'w' ? WHITE : BLACK, opp = 3 - reader
const defender = g.board[t]
const want = expect === 'live' ? 'alive' : 'dead'
const name = m => m === null ? 'pass' : coordName(m, n)
const region = lifeStatus(g, t, opp).region || []
const before = lifeStatus(g, t, opp)
console.log(`before (opponent to move): ${before.status} ${before.line.map(name).join(' ')}; region ${region.map(name).join(' ')}`)
const works = (game, turn) => { const r = lifeStatus(game, t, turn); return r.status === want }
for (const m of [...region.filter(q => !g.board[q]), null]) {
  if (m !== null && !g.check(m, reader).ok) continue
  const g1 = g.clone(); g1.turn = reader; g1.play(m)
  if (m !== null && g1.board[t] !== defender) { if (want === 'dead') console.log(`${name(m)} captures outright`); continue }
  if (!works(g1, opp)) continue
  const parts = []
  for (const r of [...region.filter(q => !g1.board[q]), null]) {
    if (r !== null && !g1.check(r, opp).ok) continue
    const g2 = g1.clone(); g2.play(r)
    if (r !== null && g2.board[t] !== defender) { parts.push(`(${name(r)} ·captured)`); continue }
    // the reader's answers that keep the status
    const answers = []
    for (const a of [...region.filter(q => !g2.board[q]), null]) {
      if (a !== null && !g2.check(a, reader).ok) continue
      const g3 = g2.clone(); g3.play(a)
      if (a !== null && g3.board[t] !== defender) { if (want === 'dead') answers.push(name(a) + '✓'); continue }
      if (works(g3, opp)) answers.push(name(a))
    }
    parts.push(`(${name(r)} ${answers.join('|') || '??'})`)
  }
  console.log(`${name(m)} ${parts.join(' ')}`)
}
