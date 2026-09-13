// Tests for the computer opponent. Run: node scripts/bot-test.mjs
// 1. FastBoard agrees with the reference engine (js/rules/go.js) on legality, captures, ko and the count,
//    move by move, over random games. 2. The search never returns an illegal move, never fills a true eye,
//    takes a large chain in atari, does not pass while behind, and beats a random player.
import { Game, BLACK, WHITE, parseCoord, parseCoords, coordName } from '../js/rules/go.js'
import { FastBoard } from '../js/bot/board.js'
import { think, playout, randomMove, rng } from '../js/bot/mcts.js'

let failed = 0, passed = 0
function check(name, ok, detail = '') { if (ok) passed++; else { failed++; console.log('FAIL', name, detail) } }

function pos(game) { return { size: game.size, board: game.board, turn: game.turn, ko: game.ko, komi: game.komi, passes: game.passes } }

// --- 1. FastBoard vs Game -------------------------------------------------------------
function sameLegality(g, fb) {
  for (let p = 0; p < g.board.length; p++) {
    const a = g.check(p).ok, b = fb.isLegal(p)
    if (a !== b) return `${coordName(p, g.size)}: engine ${a} fast ${b} (ko ${g.ko} / ${fb.ko})`
  }
  return ''
}
{
  const rand = rng(7)
  let mismatches = 0, games = 0, moves = 0, kos = 0, captures = 0
  for (const size of [5, 7, 9]) for (let gi = 0; gi < (size === 9 ? 60 : 120); gi++) {
    const g = new Game(size, { komi: 7.5 }), fb = new FastBoard(size).load(g.board, g.turn, g.ko)
    games++
    for (let step = 0; step < size * size * 3 && !g.over; step++) {
      const d = sameLegality(g, fb); if (d) { mismatches++; if (mismatches < 4) console.log('  legality', size, gi, step, d); break }
      // random legal move that is not a true eye (so games fill up and end), else pass
      const legal = g.legalMoves().filter(p => !fb.isEye(p, g.turn))
      const mv = legal.length ? legal[(rand() * legal.length) | 0] : null
      const rec = g.play(mv); const caps = fb.play(mv === null ? -1 : mv)
      moves++
      if (rec.captured.length !== caps) { mismatches++; console.log('  captures differ', size, gi, step); break }
      if (rec.captured.length) captures++
      if ((g.ko ?? -1) !== fb.ko) { mismatches++; console.log('  ko differs', size, gi, step, g.ko, fb.ko); break }
      if (g.ko != null) kos++
      let same = true; for (let i = 0; i < g.board.length; i++) if (g.board[i] !== fb.board[i]) same = false
      if (!same) { mismatches++; console.log('  board differs', size, gi, step); break }
      if (g.turn !== fb.turn || g.passes !== fb.passes) { mismatches++; console.log('  turn/passes differ'); break }
    }
    const s = g.score()
    if (Math.abs(s.margin - fb.score(7.5)) > 1e-9) { mismatches++; console.log('  score differs', size, gi, s.margin, fb.score(7.5)) }
  }
  check('FastBoard agrees with the engine on random games', mismatches === 0, `${mismatches} mismatches`)
  check('random games exercised captures and kos', captures > 200 && kos > 20, `${captures} captures, ${kos} kos over ${moves} moves in ${games} games`)
}

// --- 2. eyes ----------------------------------------------------------------------------
{
  const g = new Game(9).setup({ black: parseCoords('A2 B1 B2 C2 D3 D1 E2 F5 G4 G6 H5 G3 H2', 9), white: parseCoords('F4 J5 H6', 9) })
  const fb = new FastBoard(9).load(g.board, BLACK, null)
  check('corner eye A1 is an eye', fb.isEye(parseCoord('A1', 9), BLACK))
  check('interior eye D2 with empty diagonals is an eye', fb.isEye(parseCoord('D2', 9), BLACK))
  check('G5 with two enemy diagonals (F4, H6) is not an eye', !fb.isEye(parseCoord('G5', 9), BLACK))
  check('an empty point with an enemy neighbour is not an eye', !fb.isEye(parseCoord('E4', 9), BLACK))
  check('a full eye is not one for the other colour', !fb.isEye(parseCoord('A1', 9), WHITE))
}

// --- 3. playouts end and count like the engine ----------------------------------------------
{
  const rand = rng(3)
  const fb = new FastBoard(9)
  let ok = true, total = 0
  for (let i = 0; i < 50; i++) {
    fb.load(new Uint8Array(81), BLACK, null)
    const margin = playout(fb, 7.5, rand, 162)
    total += fb.moves
    if (!(fb.passes >= 2 || fb.moves >= 162)) ok = false
    const g = new Game(9); g.board.set(fb.board)
    if (Math.abs(g.score().margin - margin) > 1e-9) ok = false
    // no true eye of the side that could fill it is ever filled: every true eye left is empty by construction; check no suicide-like 0-liberty chains
    for (let p = 0; p < 81; p++) if (fb.board[p] && fb.liberties(p) === 0) ok = false
  }
  check('playouts end by passes or the cap and score like the engine', ok, `avg ${total / 50} moves`)
}

// --- 4. the search -----------------------------------------------------------------------
{
  // never illegal, from random positions
  const rand = rng(11)
  let bad = 0
  for (let i = 0; i < 20; i++) {
    const g = new Game(9)
    for (let k = 0; k < 10 + i * 3; k++) { const l = g.legalMoves(); if (!l.length) break; g.play(l[(rand() * l.length) | 0]) }
    const r = think(pos(g), { maxPlayouts: 150, timeMs: 5000, seed: i })
    if (r.move !== null && !g.check(r.move).ok) bad++
    if (r.move !== null) { const fb = new FastBoard(9).load(g.board, g.turn, g.ko); if (fb.isEye(r.move, g.turn)) bad++ }
  }
  check('search never returns an illegal move or fills a true eye', bad === 0, `${bad} bad`)
}
{
  // a capturing race: Black's chain has one liberty (G4), White's has one (G5); only G5 wins the race
  const g = new Game(9).setup({ black: parseCoords('D4 E4 F4 C5 D6 E6 F6', 9), white: parseCoords('D5 E5 F5 C4 D3 E3 F3 G3 H4', 9) })
  const r = think(pos(g), { maxPlayouts: 2000, timeMs: 10000, seed: 5 })
  check('wins the capturing race by taking three stones', r.move === parseCoord('G5', 9), `played ${coordName(r.move, 9)} winrate ${r.winrate.toFixed(2)}`)
}
{
  // behind with the board open: does not pass
  const g = new Game(9).setup({ white: parseCoords('C3 C7 G3 G7 E5', 9), black: parseCoords('D4', 9) })
  const r = think(pos(g), { maxPlayouts: 300, timeMs: 5000, seed: 2 })
  check('does not pass while behind with points left', r.move !== null)
}
{
  // ahead and the opponent just passed: pass to end the game
  const g = new Game(9)
  for (const c of parseCoords('A1 A2 A3 A4 A5 A6 A7 A8 A9 B1 B2 B3 B4 B5 B6 B7 B8 B9 C1 C2 C3 C4 C5 C6 C7 C8 C9 D1 D2 D3 D4 D5 D6 D7 D8 D9 E5 E6', 9)) g.board[c] = BLACK
  for (const c of parseCoords('G1 G2 G3 G4 G5 G6 G7 G8 G9 H5', 9)) g.board[c] = WHITE
  g.turn = BLACK; g.passes = 1
  const r = think(pos(g), { maxPlayouts: 300, timeMs: 5000, seed: 4 })
  check('passes to end the game when ahead after a pass', r.move === null, `played ${coordName(r.move, 9)}`)
}
{
  // beats a random player
  let wins = 0
  const N = 8
  for (let gi = 0; gi < N; gi++) {
    const botColor = gi % 2 ? WHITE : BLACK
    const g = new Game(9), rand = rng(100 + gi)
    while (!g.over && g.history.length < 250) {
      const mv = g.turn === botColor ? think(pos(g), { maxPlayouts: 250, timeMs: 5000, seed: gi * 1000 + g.history.length }).move : randomMove(pos(g), rand)
      g.play(mv)
    }
    const s = g.score()
    if (s.winner === botColor) wins++
  }
  check('beats a random player', wins >= N - 1, `${wins}/${N}`)
}

// --- 5. speed --------------------------------------------------------------------------------
{
  const r = think(pos(new Game(9)), { timeMs: 1000, maxPlayouts: 1e9, seed: 1 })
  console.log(`speed: ${r.playouts} playouts in ${r.ms | 0} ms on an empty 9×9 (${(r.playouts / r.ms * 1000) | 0}/s), first move ${coordName(r.move, 9)}`)
}

console.log(failed ? `${failed} bot check(s) FAILED, ${passed} passed` : `all ${passed} bot checks passed`)
process.exit(failed ? 1 : 0)
