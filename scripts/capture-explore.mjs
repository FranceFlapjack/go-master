#!/usr/bin/env node
// Authoring helper for ladder/net problems (the capture search). Prints the status of the target chain with the
// opponent to move, then every first move of the reader that works (kill: the chain cannot escape; escape: it cannot
// be caught), with the search's main line. Usage:
//   node scripts/capture-explore.mjs <size> "<black stones>" "<white stones>" <target> <b|w to move> <kill|escape> [quiet]
import { Game, BLACK, WHITE, parseCoord, parseCoords, coordName } from '../js/rules/go.js'
import { canCapture, canEscape } from '../js/rules/capture-search.js'

const [size, black, white, target, mover, expect, quiet] = process.argv.slice(2)
const n = +size
const g = new Game(n).setup({ black: parseCoords(black, n), white: parseCoords(white, n) })
const t = parseCoord(target, n)
const reader = mover === 'w' ? WHITE : BLACK, opp = 3 - reader
const so = quiet !== undefined ? { quiet: +quiet } : {}
const name = m => m === null ? 'pass' : coordName(m, n)
const own = g.board[t]
{
  const h = g.clone(); h.turn = opp
  const r = expect === 'kill' ? canEscape(h, t, so) : canCapture(h, t, so)
  console.log(`opponent to move first: ${expect === 'kill' ? (r.escaped ? 'escapes' : 'cannot escape') : (r.captured ? 'captured' : 'safe')} ${r.line.map(name).join(' ')}`)
}
const found = []
for (let m = 0; m < n * n; m++) {
  if (g.board[m] || !g.check(m, reader).ok) continue
  const h = g.clone(); h.turn = reader; const rec = h.play(m)
  if (!h.group(t)) { if (expect === 'kill') found.push(`${name(m)} captures outright`); continue }
  const r = expect === 'kill' ? canEscape(h, t, so) : canCapture(h, t, so)
  const ok = expect === 'kill' ? !r.escaped : !r.captured
  if (ok) found.push(`${name(m)}  ${r.line.map(name).join(' ')}`)
}
console.log(found.length ? found.join('\n') : '(no working first move)')
