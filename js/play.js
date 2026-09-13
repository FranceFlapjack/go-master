// Play page: two players on one screen, or one player against the computer (9×9 only; see js/bot/).
// Board size, pass, undo, resign; after two passes, mark dead stones by clicking them and the page counts
// the area score. With the computer on, it marks the stones it thinks are dead first; clicks still override.
import { Goban, MARK } from './goban.js'
import { sound } from './sound.js'
import { progress } from './progress.js'
import { BLACK, WHITE, colorName, coordName } from './rules/go.js'
import { Bot, LEVELS } from './bot/client.js'

const SIZES = [9, 13, 19]
const OPPONENTS = [
  { id: 'none', label: 'Two players' },
  { id: 'white', label: 'Computer is White' },
  { id: 'black', label: 'Computer is Black' },
]
const BOT_SIZE = 9
const RESIGN_BELOW = 0.06   // the computer resigns when its win rate falls this low (after some moves)
const RESIGN_AFTER = 30     // … but never before this many moves: early estimates are noise

export function mountPlay(main) {
  let size = +localStorage.getItem('go-master.play.size') || 9
  let komi = 7.5
  let opponent = localStorage.getItem('go-master.play.opponent') || 'none'
  let level = localStorage.getItem('go-master.play.level') || 'normal'
  if (!OPPONENTS.some(o => o.id === opponent)) opponent = 'none'
  if (!LEVELS.some(l => l.id === level)) level = 'normal'
  if (size !== BOT_SIZE) opponent = 'none'
  main.innerHTML = `
    <div class="page">
      <header class="lesson-head"><span class="eyebrow">Play</span><h1>Play a game</h1><p class="lede">Black plays first. Two passes in a row end the game; then click any dead stones and read the count. The computer is a weak opponent for practice, on the 9×9 board only.</p></header>
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
          <div class="field"><label>Opponent</label><div class="seg seg-wrap">${OPPONENTS.map(o => `<button class="btn${o.id === opponent ? ' on' : ''}" data-opp="${o.id}">${o.label}</button>`).join('')}</div><div class="small opp-note"></div></div>
          <div class="field level-field"><label>Computer's thinking time</label><div class="seg">${LEVELS.map(l => `<button class="btn${l.id === level ? ' on' : ''}" data-level="${l.id}">${l.label} · ${l.timeMs / 1000}s</button>`).join('')}</div></div>
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
  let board, dead = new Set(), over = false
  let bot = null, thinking = false, gen = 0   // gen changes whenever the board changes under a running search
  let recorded = false                          // one progress entry per game against the computer
  function recordResult(winner) {
    if (!botColor() || recorded) return
    recorded = true
    progress.recordPlay({ level, color: colorName(humanColor()).toLowerCase(), result: winner === 0 ? 'draw' : winner === humanColor() ? 'win' : 'loss' })
  }
  const botColor = () => opponent === 'white' ? WHITE : opponent === 'black' ? BLACK : 0
  const humanColor = () => opponent === 'white' ? BLACK : opponent === 'black' ? WHITE : 'turn'
  const levelMs = () => LEVELS.find(l => l.id === level).timeMs

  function paintSettings() {
    main.querySelectorAll('[data-size]').forEach(x => x.classList.toggle('on', +x.dataset.size === size))
    main.querySelectorAll('[data-opp]').forEach(x => { x.classList.toggle('on', x.dataset.opp === opponent); x.disabled = x.dataset.opp !== 'none' && size !== BOT_SIZE })
    main.querySelectorAll('[data-level]').forEach(x => x.classList.toggle('on', x.dataset.level === level))
    $('.level-field').hidden = !botColor()
    $('.opp-note').textContent = size !== BOT_SIZE ? `The computer plays ${BOT_SIZE}×${BOT_SIZE} only.` : botColor() ? 'Plain Monte-Carlo search, no patterns: it will lose to anyone who has done the capturing track. Good for practice.' : ''
  }

  function newGame() {
    gen++; if (bot) bot.cancel(); thinking = false
    dead = new Set(); over = false; recorded = false
    wrap.style.setProperty('--board-size', size)
    if (board) board.destroy()
    board = new Goban($('.board'), { size, komi })
    board.enableInput(humanColor(), afterMove)
    scoreEl.hidden = true; scoreEl.innerHTML = ''
    setStatus(''); paint(); paintSettings()
    if (botColor() === BLACK) botMove()
  }
  function setStatus(t, cls = '') { statusEl.textContent = t; statusEl.className = 'status ' + cls }
  function paint() {
    const g = board.game
    turnEl.textContent = over ? 'Game over' : thinking ? 'The computer is thinking…' : `${colorName(g.turn)} to play`
    turnDot.className = 'turn-dot ' + (g.turn === BLACK ? 'b' : 'w')
    $('.cap-b').textContent = g.captures[BLACK]; $('.cap-w').textContent = g.captures[WHITE]
    movesEl.innerHTML = g.history.map((m, i) => `<span class="mv ${m.color === BLACK ? 'b' : 'w'}"><span class="mvdot"></span>${i + 1} ${m.point === null ? 'pass' : coordName(m.point, size)}</span>`).join('')
    movesEl.scrollTop = movesEl.scrollHeight
  }
  function position() {
    const g = board.game
    return { size, board: g.board, turn: g.turn, ko: g.ko, komi, passes: g.passes }
  }
  async function botMove() {
    if (over || board.game.over || board.game.turn !== botColor()) return
    if (!bot) bot = new Bot()
    const myGen = gen
    thinking = true; board.disableInput(); paint()
    let r
    try { r = await bot.think(position(), { timeMs: levelMs() }) } catch { return }   // cancelled: the board changed
    if (myGen !== gen) return
    thinking = false
    const g = board.game
    if (g.history.length >= RESIGN_AFTER && r.winrate < RESIGN_BELOW && r.move !== null) {
      over = true; board.disableInput()
      setStatus(`The computer resigns (it puts its chances at ${Math.round(r.winrate * 100)}%). ${colorName(3 - botColor())} wins.`, 'good'); paint()
      recordResult(3 - botColor())
      return
    }
    await board.play(r.move, { color: botColor() })
    if (r.move === null) setStatus('The computer passes.')
    else setStatus('')
    board.enableInput(humanColor(), afterMove)
    paint()
    if (board.game.over) endGame('Two passes: the game is over.', r.ownership)
  }
  function afterMove() {
    paint()
    if (board.game.over) { endGame('Two passes: the game is over.'); return }
    if (botColor()) botMove()
  }
  async function endGame(msg, ownership) {
    over = true; thinking = false
    board.disableInput()
    setStatus(msg + ' Click stones that are dead, then read the count.', 'good')
    board.svg.classList.add('interactive')
    board.hit.onpointerdown = e => { const p = board._pointAt(e); if (p == null || !board.game.board[p]) return; toggleDead(p) }
    showScore()
    if (botColor()) {
      // the computer's opinion of what is dead: stones whose point mostly ends up the other colour's in its playouts
      const myGen = gen
      try {
        if (!ownership) { thinking = true; paint(); ownership = (await bot.think(position(), { timeMs: 800 })).ownership; thinking = false }
      } catch { return }
      if (myGen !== gen) return
      const g = board.game
      for (let p = 0; p < g.board.length; p++) {
        const c = g.board[p]
        if (!c || dead.has(p)) continue
        const own = ownership[p] * (c === BLACK ? 1 : -1)   // +1 = kept by its owner, −1 = taken
        if (own < -0.5) for (const s of g.group(p).stones) dead.add(s)
      }
      for (const s of dead) board.mark(s, MARK.x)
      paint()
      recordResult(board.game.score([...dead]).winner)
      setStatus(msg + (dead.size ? ' The computer thinks the marked stones are dead; click to change that, then read the count.' : ' The computer thinks nothing is dead; click any stones that are, then read the count.'), 'good')
      showScore()
    }
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
    board.paintTerritory(s.owner)
    scoreEl.hidden = false
    const w = s.winner === BLACK ? `Black wins by ${s.margin}` : s.winner === WHITE ? `White wins by ${-s.margin}` : 'Jigo (a tie)'
    scoreEl.innerHTML = `<span class="eyebrow">Area count</span><div class="score-row"><span class="turn-dot b"></span> Black <b>${s.black}</b></div><div class="score-row"><span class="turn-dot w"></span> White <b>${s.white}</b> <span class="small">(${s.white - s.komi} + ${s.komi} komi)</span></div><div class="score-win">${w}</div>`
  }
  function leaveScoring() {
    dead.clear(); board.clearMarks(MARK.x); board.clearTerritory(); scoreEl.hidden = true; board.hit.onpointerdown = null
  }

  main.querySelector('.play').addEventListener('click', async e => {
    const b = e.target.closest('[data-act], [data-size], [data-opp], [data-level]'); if (!b || b.disabled) return
    sound.unlock()
    if (b.dataset.size) { size = +b.dataset.size; localStorage.setItem('go-master.play.size', size); opponent = size === BOT_SIZE ? (localStorage.getItem('go-master.play.opponent') || 'none') : 'none'; if (!OPPONENTS.some(o => o.id === opponent)) opponent = 'none'; newGame(); return }
    if (b.dataset.opp) { opponent = b.dataset.opp; localStorage.setItem('go-master.play.opponent', opponent); newGame(); return }
    if (b.dataset.level) { level = b.dataset.level; localStorage.setItem('go-master.play.level', level); paintSettings(); return }
    const act = b.dataset.act
    if (act === 'new') { newGame(); return }
    if (thinking && act !== 'undo') return
    if (over && act !== 'undo') return
    if (act === 'pass') { await board.play(null); progress.recordMove(); afterMove() }
    if (act === 'undo') {
      gen++; if (bot) bot.cancel(); thinking = false
      if (over) { over = false; leaveScoring() }
      await board.undo()
      // against the computer, take back its reply as well so it is the human's turn again
      if (botColor() && board.game.turn === botColor() && board.game.history.length) await board.undo()
      board.enableInput(humanColor(), afterMove)
      setStatus(''); paint()
      if (botColor() && board.game.turn === botColor()) botMove()   // nothing left to take back: the computer moves first
    }
    if (act === 'resign') { const loser = botColor() ? humanColor() : board.game.turn; over = true; board.disableInput(); setStatus(`${colorName(loser)} resigns. ${colorName(3 - loser)} wins.`, 'good'); paint(); recordResult(3 - loser) }
  })
  newGame()
  return () => { gen++; if (bot) bot.destroy(); board.destroy() }
}
