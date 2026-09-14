// "Try it" exercise: the reader plays the solution; the opponent's replies are played automatically.
// The solution is a tree ("E3 (D2 E2) (C2 D1)", see js/sgf.js): any branch at a reader node is
// accepted, the first branch at an opponent node is the reply that gets played. A pass is a move on both sides:
// a Pass button appears when some reader node of the tree accepts a pass (seki problems), and a wrong pass counts as a miss.
import { Goban, MARK } from './goban.js'
import { sound } from './sound.js'
import { progress } from './progress.js'
import { setActiveViewer } from './sgf-viewer.js'
import { parseSolution, solutionLines } from './sgf.js'
import { positionFrom } from './position.js'
import { BLACK, WHITE, coordName } from './rules/go.js'

export function mountExercise(container, o, ctx = {}) {
  const pos = positionFrom(o)
  const tree = parseSolution(o.solution || '', pos.size)
  const id = o.id || `${ctx.lessonId || 'x'}#${ctx.index ?? 0}`
  const side = pos.turn
  const name = side === BLACK ? 'Black' : 'White', oppName = side === BLACK ? 'White' : 'Black'

  container.className = 'exercise'
  container.tabIndex = 0
  container.innerHTML = `
    <div class="exercise-board"><div class="board-wrap" style="--board-size:${pos.size}"><div class="board"></div></div></div>
    <div class="exercise-side">
      <div class="turn"><span class="turn-dot ${side === BLACK ? 'b' : 'w'}"></span><span>${name} to play</span></div>
      <div class="prompt">${esc(o.prompt || 'Find the best move.')}</div>
      <div class="status" aria-live="polite"></div>
      <div class="hint" hidden></div>
      <div class="actions">
        ${hasPass(tree) ? '<button class="btn quiet" data-act="pass" title="Play elsewhere">Pass</button>' : ''}
        <button class="btn quiet" data-act="hint">Hint</button>
        <button class="btn quiet" data-act="reset">Reset</button>
        <button class="btn quiet" data-act="solution">Show solution</button>
      </div>
    </div>`

  const statusEl = container.querySelector('.status')
  const hintEl = container.querySelector('.hint')
  const board = new Goban(container.querySelector('.board'), { ...pos })
  let node = tree, wrong = 0, solved = progress.isTryDone(id), showing = false
  const expected = p => node.children.find(c => c.point === p)
  board.judge = p => !!expected(p)
  board.onIllegal = reason => setStatus(reason === 'ko' ? 'That is the ko: you may not retake it at once.' : reason === 'suicide' ? 'No liberties there, and it captures nothing: not allowed.' : '', 'bad')

  function setStatus(text, cls = '') { statusEl.textContent = text; statusEl.className = 'status ' + cls }
  function arm() { if (!solved && !showing) board.enableInput(side, onMove) }

  async function onMove(rec) {
    board.disableInput()
    const hit = expected(rec.point)
    if (hit) {
      node = hit
      board.mark(rec.point, MARK.good)
      if (!node.children.length) return finish()
      setStatus(`Yes. ${oppName} replies…`)
      await wait(380)
      board.clearMarks(MARK.good)
      node = node.children[0]
      await board.play(node.point)
      if (!node.children.length) return finish()
      setStatus(node.point === null ? `${oppName} passes. Keep going.` : 'Keep going.')
      arm()
    } else {
      wrong++
      if (rec.point !== null) { board.mark(rec.point, MARK.bad); board.shakeStone(rec.point) }
      setStatus(rec.point === null ? (wrong === 1 ? 'Not now: there is a move to make. Try again.' : 'Still not it. The hint may help.') : wrong === 1 ? 'Not that one. Try again.' : 'Still not it. The hint may help.', 'bad')
      await wait(600)
      board.clearMarks(MARK.bad)
      await board.undo({ silent: true })
      if (wrong >= 2) showHint()
      arm()
    }
  }
  function finish() {
    solved = true
    container.classList.add('solved')
    sound.play('success')
    setStatus(o.success || 'Solved.', 'good')
    progress.recordTry(id, wrong === 0)
    board.disableInput()
    if (ctx.onSolved) ctx.onSolved(id)
  }
  function showHint() { if (o.hint) { hintEl.textContent = o.hint; hintEl.hidden = false } }
  async function reset() {
    showing = false; node = tree; solved = false
    board.disableInput()
    container.classList.remove('solved')
    await board.showPosition(pos)
    setStatus('')
    arm()
  }
  async function showSolution() {
    showing = true; board.disableInput()
    await board.showPosition(pos)
    const line = solutionLines(tree)[0] || []
    setStatus('Watch: ' + line.map(p => coordName(p, pos.size)).join(' '))
    for (const p of line) { await wait(600); await board.play(p) }
    showing = false
    setStatus('That was the line. Reset to try it yourself.')
  }

  container.querySelector('.actions').addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return
    sound.unlock()
    if (b.dataset.act === 'pass') { if (solved || showing || !board.inputWho) return; board.disableInput(); board.play(null).then(rec => onMove(rec)) }
    if (b.dataset.act === 'hint') { showHint(); if (!o.hint) setStatus('No hint for this one — count the liberties first.') }
    if (b.dataset.act === 'reset') reset()
    if (b.dataset.act === 'solution') showSolution()
  })
  container.addEventListener('pointerdown', () => { setActiveViewer(null); sound.unlock() })

  if (solved) { container.classList.add('solved'); setStatus('Solved earlier. Reset to play it again.', 'good') }
  arm()
  return { id, board, reset }
}

const wait = ms => new Promise(r => setTimeout(r, ms))
/** does any reader node of the solution tree accept a pass? (depth 0, 2, 4 … from the root) */
function hasPass(node, depth = 0) { return node.children.some(c => (depth % 2 === 0 && c.point === null) || hasPass(c, depth + 1)) }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])) }
