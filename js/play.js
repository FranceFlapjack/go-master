// Play page: two players on one screen. Board size and komi, pass, undo, resign; after two passes,
// mark dead stones by clicking them and the page counts the area score. A computer opponent comes later (ROADMAP).
import { Goban, MARK } from './goban.js'
import { sound } from './sound.js'
import { progress } from './progress.js'
import { BLACK, WHITE, colorName, coordName } from './rules/go.js'

const SIZES = [9, 13, 19]

export function mountPlay(main) {
  let size = +localStorage.getItem('go-master.play.size') || 9
  let komi = 7.5
  main.innerHTML = `
    <div class="page">
      <header class="lesson-head"><span class="eyebrow">Play</span><h1>Two players, one screen</h1><p class="lede">Black plays first. Two passes in a row end the game; then click any dead stones and read the count.</p></header>
      <div class="play">
        <div class="play-left"><div class="board-wrap" style="--board-size:${size}"><div class="board"></div></div>
          <div class="game-controls">
            <button class="btn quiet" data-act="pass">Pass</button>
            <button class="btn quiet" data-act="undo">Undo</button>
            <button class="btn quiet" data-act="resign">Resign</button>
            <span class="spacer"></span>
            <button class="btn" data-act="new">New game</button>
          </div>
        </div>
        <div class="play-side">
          <div class="field"><label>Board</label><div class="seg">${SIZES.map(s => `<button class="btn${s === size ? ' on' : ''}" data-size="${s}">${s}×${s}</button>`).join('')}</div></div>
          <div class="turn"><span class="turn-dot b"></span><span class="turn-text">Black to play</span></div>
          <div class="status" aria-live="polite"></div>
          <div class="caps small">Captures — <span class="turn-dot b"></span> <b class="cap-b">0</b> &nbsp; <span class="turn-dot w"></span> <b class="cap-w">0</b> &nbsp;·&nbsp; komi ${komi}</div>
          <div class="score" hidden></div>
          <div class="moves play-moves"></div>
        </div>
      </div>
    </div>`
  const $ = s => main.querySelector(s)
  const wrap = $('.board-wrap'), statusEl = $('.status'), turnEl = $('.turn-text'), turnDot = $('.turn .turn-dot'), scoreEl = $('.score'), movesEl = $('.play-moves')
  let board, dead = new Set(), scoring = false, over = false

  function newGame() {
    dead = new Set(); scoring = false; over = false
    wrap.style.setProperty('--board-size', size)
    board = new Goban($('.board'), { size, komi })
    board.enableInput('turn', afterMove)
    scoreEl.hidden = true; scoreEl.innerHTML = ''
    setStatus(''); paint()
  }
  function setStatus(t, cls = '') { statusEl.textContent = t; statusEl.className = 'status ' + cls }
  function paint() {
    const g = board.game
    turnEl.textContent = over ? 'Game over' : `${colorName(g.turn)} to play`
    turnDot.className = 'turn-dot ' + (g.turn === BLACK ? 'b' : 'w')
    $('.cap-b').textContent = g.captures[BLACK]; $('.cap-w').textContent = g.captures[WHITE]
    movesEl.innerHTML = g.history.map((m, i) => `<span class="mv ${m.color === BLACK ? 'b' : 'w'}"><span class="mvdot"></span>${i + 1} ${m.point === null ? 'pass' : coordName(m.point, size)}</span>`).join('')
    movesEl.scrollTop = movesEl.scrollHeight
  }
  function afterMove(rec) {
    paint()
    if (board.game.over) endGame('Two passes: the game is over.')
  }
  function endGame(msg) {
    over = true; scoring = true
    board.disableInput()
    setStatus(msg + ' Click stones that are dead, then read the count.', 'good')
    board.svg.classList.add('interactive')
    board.hit.onpointerdown = e => { const p = board._pointAt(e); if (p == null || !board.game.board[p]) return; toggleDead(p) }
    showScore()
  }
  function toggleDead(p) {
    // a whole chain lives or dies together
    const g = board.game.group(p)
    const kill = !dead.has(p)
    for (const s of g.stones) { if (kill) dead.add(s); else dead.delete(s) }
    board.clearMarks(MARK.x)
    for (const s of dead) board.mark(s, MARK.x)
    sound.play('tick')
    showScore()
  }
  function showScore() {
    const s = board.game.score([...dead])
    scoreEl.hidden = false
    const w = s.winner === BLACK ? `Black wins by ${s.margin}` : s.winner === WHITE ? `White wins by ${-s.margin}` : 'Jigo (a tie)'
    scoreEl.innerHTML = `<span class="eyebrow">Area count</span><div class="score-row"><span class="turn-dot b"></span> Black <b>${s.black}</b></div><div class="score-row"><span class="turn-dot w"></span> White <b>${s.white}</b> <span class="small">(${s.white - s.komi} + ${s.komi} komi)</span></div><div class="score-win">${w}</div>`
  }

  main.querySelector('.play').addEventListener('click', async e => {
    const b = e.target.closest('[data-act], [data-size]'); if (!b) return
    sound.unlock()
    if (b.dataset.size) { size = +b.dataset.size; localStorage.setItem('go-master.play.size', size); main.querySelectorAll('[data-size]').forEach(x => x.classList.toggle('on', +x.dataset.size === size)); newGame(); return }
    const act = b.dataset.act
    if (act === 'new') newGame()
    if (over && act !== 'new' && act !== 'undo') return
    if (act === 'pass') { await board.play(null); progress.recordMove(); afterMove() }
    if (act === 'undo') { if (over) { over = false; scoring = false; dead.clear(); board.clearMarks(MARK.x); scoreEl.hidden = true; board.hit.onpointerdown = null; board.enableInput('turn', afterMove) } await board.undo(); setStatus(''); paint() }
    if (act === 'resign') { const loser = board.game.turn; over = true; board.disableInput(); setStatus(`${colorName(loser)} resigns. ${colorName(3 - loser)} wins.`, 'good'); paint() }
  })
  newGame()
  return () => { board.destroy() }
}
