#!/usr/bin/env node
// Rules engine checks: run before touching js/rules/go.js. Exit code 1 on any failure.
import { Game, BLACK, WHITE, EMPTY, parseCoord, coordName, parseSgfCoord, sgfCoord, starPoints } from '../js/rules/go.js'
import { canCapture, canEscape } from '../js/rules/capture-search.js'

let fails = 0
const ok = (cond, msg) => { if (!cond) { fails++; console.log('FAIL', msg) } else console.log('ok  ', msg) }
const g9 = () => new Game(9)
const P = (g, s) => parseCoord(s, g.size)
const playAll = (g, seq) => { for (const s of seq.split(/\s+/)) g.play(s.toLowerCase() === 'pass' ? null : P(g, s)); return g }

// coordinates
ok(coordName(parseCoord('A1', 9), 9) === 'A1' && parseCoord('A1', 9) === 8 * 9, 'A1 is the bottom-left point')
ok(coordName(parseCoord('J9', 9), 9) === 'J9' && parseCoord('J9', 9) === 8, 'J9 is the top-right point (no letter I)')
ok(coordName(parseCoord('T19', 19), 19) === 'T19', 'T19 on a 19×19 board')
ok(parseSgfCoord('dp', 19) === parseCoord('D4', 19), 'SGF "dp" is D4 on 19×19')
ok(sgfCoord(parseCoord('Q16', 19), 19) === 'pd', 'Q16 is SGF "pd"')
ok(parseSgfCoord('tt', 19) === null && parseSgfCoord('', 19) === null, 'SGF "tt" and "" are passes')
let threw = false; try { parseCoord('I5', 9) } catch { threw = true } ok(threw, 'I is not a column')
ok(starPoints(19).length === 9 && starPoints(13).length === 5 && starPoints(9).length === 5, 'star points 9/5/5')

// capture in the middle
{ const g = playAll(g9(), 'E5 E4 A1 E6 A2 D5 A3 F5')
  ok(g.get(P(g, 'E5')) === EMPTY && g.captures[WHITE] === 1, 'single stone surrounded on four sides is captured') }
// capture in every corner (two liberties only)
for (const [stone, a, b] of [['A1', 'A2', 'B1'], ['J1', 'J2', 'H1'], ['A9', 'A8', 'B9'], ['J9', 'J8', 'H9']]) {
  const g = g9(); g.play(P(g, stone)); g.play(P(g, a)); g.play(P(g, 'E5')); g.play(P(g, b))
  ok(g.get(P(g, stone)) === EMPTY, `corner stone at ${stone} captured with two stones`)
}
// on the edge: three liberties
{ const g = playAll(g9(), 'E1 D1 A9 F1 A8 E2'); ok(g.get(P(g, 'E1')) === EMPTY, 'edge stone captured with three stones') }
// a two-stone chain
{ const g = playAll(g9(), 'E5 E4 F5 F4 A1 D5 A2 G5 A3 E6 A4 F6')
  ok(g.get(P(g, 'E5')) === EMPTY && g.get(P(g, 'F5')) === EMPTY && g.captures[WHITE] === 2, 'two-stone chain captured as one group') }
// suicide is illegal, but a capturing "suicide" is legal
{ const g = g9(); g.setup({ white: ['A2', 'B1'].map(s => P(g, s)) })
  ok(!g.check(P(g, 'A1'), BLACK).ok && g.check(P(g, 'A1'), BLACK).reason === 'suicide', 'suicide in the corner is illegal')
  const h = g9(); h.setup({ white: ['A2', 'B1'].map(s => P(h, s)), black: ['A3', 'B2', 'C1'].map(s => P(h, s)) })
  ok(h.check(P(h, 'A1'), BLACK).ok && h.check(P(h, 'A1'), BLACK).captures.length === 2, 'a move with no liberties is legal when it captures') }
// simple ko
{ const m = g9()
  m.setup({ black: ['D5', 'E6', 'E4'].map(s => P(m, s)), white: ['G5', 'F6', 'F4', 'E5'].map(s => P(m, s)) })
  m.play(P(m, 'F5'), BLACK)        // captures E5
  ok(m.get(P(m, 'E5')) === EMPTY && m.ko === P(m, 'E5'), 'capturing one stone in a ko shape sets the ko point')
  ok(!m.check(P(m, 'E5'), WHITE).ok && m.check(P(m, 'E5'), WHITE).reason === 'ko', 'retaking the ko at once is illegal')
  m.play(P(m, 'A1'), WHITE); m.play(P(m, 'A9'), BLACK)
  ok(m.check(P(m, 'E5'), WHITE).ok, 'after a move elsewhere the ko may be retaken')
  m.play(P(m, 'E5'), WHITE)
  ok(m.get(P(m, 'F5')) === EMPTY && m.ko === P(m, 'F5'), 'retaking the ko captures and sets the ko point the other way') }
// capturing several stones: never a ko
{ const g = g9()
  g.setup({ black: ['C3', 'C4', 'D5', 'E5', 'F4', 'F3', 'E2', 'D2'].map(s => P(g, s)), white: ['D4', 'E4', 'D3'].map(s => P(g, s)) })
  // white group D4 E4 D3 has one liberty: E3. Black E3 captures three.
  ok(g.check(P(g, 'E3'), BLACK).captures.length === 3, 'a three-stone group in atari is captured at its last liberty')
  g.play(P(g, 'E3'), BLACK)
  ok(g.ko === null, 'capturing more than one stone never sets a ko') }
// pass and game end, undo
{ const g = playAll(g9(), 'E5 pass'); ok(g.passes === 1 && !g.over, 'one pass does not end the game')
  g.pass(); ok(g.over, 'two consecutive passes end the game')
  g.undo(); g.undo(); ok(g.passes === 0 && g.turn === WHITE, 'undo restores passes and the turn')
  const h = playAll(g9(), 'E5 E4 A1 E6 A2 D5 A3 F5'); h.undo()
  ok(h.get(P(h, 'E5')) === BLACK && h.captures[WHITE] === 0 && h.turn === WHITE, 'undo puts captured stones back') }
// area scoring
{ const g = g9()
  // black wall on column E, black owns the left (cols A–D) and the wall; white stones on the right
  g.setup({ black: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'].map(s => P(g, s)), white: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'].map(s => P(g, s)) })
  const s = g.score()
  ok(s.black === 45 && s.white === 36 + 7.5, `area score: black 45, white 36 + komi (got ${s.black} / ${s.white})`)
  ok(s.winner === BLACK && s.margin === 1.5, 'black wins by 1.5')
  const t = g9(); t.setup({ black: [P(t, 'E5')], white: [P(t, 'A1')] }); const st = t.score()
  ok(st.black === 1 && st.white === 1 + 7.5, 'a region touching both colours is neutral') }
// dead stones removed before scoring
{ const g = g9()
  g.setup({ black: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'].map(s => P(g, s)), white: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'B5'].map(s => P(g, s)) })
  const alive = g.score()
  ok(alive.black === 9 && alive.white === 37 + 7.5, 'a lone white stone inside black\'s area makes the region neutral while it stands')
  const s = g.score([P(g, 'B5')])
  ok(s.black === 45 && s.white === 36 + 7.5, 'removed as dead, the region is black\'s again') }
// capture search (ladders and nets)
{ const pos = (size, b, w) => { const g = new Game(size); g.setup({ black: b.split(' ').map(s => parseCoord(s, size)), white: w.split(' ').map(s => parseCoord(s, size)) }); return g }
  let g = pos(9, 'D5 E6 F4', 'E5'); ok(canCapture(g, P(g, 'E5')).captured, 'a stone with two liberties and a black stone on the diagonal is caught in a ladder')
  g = pos(9, 'D5 E6 F4 E4', 'E5'); ok(!canEscape(g, P(g, 'E5')).escaped, 'once in the ladder it cannot escape')
  g = pos(9, 'D5 E6 F4 E4', 'E5 J7'); ok(canEscape(g, P(g, 'E5')).escaped, 'a ladder breaker on the path lets it escape')
  g = pos(9, 'D5 E6 F4', 'E5 B2 H8'); ok(!canCapture(g, P(g, 'E5')).captured, 'with both ladders broken the stone is safe')
  g = pos(9, 'D5 E6', 'E5'); ok(!canCapture(g, P(g, 'E5')).captured, 'a lone stone with two liberties in the open cannot be caught')
  g = pos(9, 'D5 E6 F6 D4', 'E5 B2 H8 G2 B8')
  const net = canCapture(g, P(g, 'E5')); ok(net.captured && coordName(net.line[0], 9) === 'F4', `both ladders broken, the net at F4 still catches it (found ${net.line.map(p => coordName(p, 9)).join(' ')})`)
  for (const m of ['F5', 'E4']) { const h = g.clone(); h.play(P(h, m)); ok(canEscape(h, P(h, 'E5')).escaped, `…while the atari at ${m} lets it escape`) } }
// legal moves count on an empty board
ok(g9().legalMoves().length === 81, '81 legal moves on an empty 9×9')

console.log(fails ? `\n${fails} failure(s)` : '\nall rules checks passed')
process.exit(fails ? 1 : 0)
