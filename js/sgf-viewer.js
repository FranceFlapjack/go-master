// Annotated game viewer: board + move list + comments + keyboard navigation, over an SGF main line.
// (The SGF tree is kept in `game.root`; branch navigation comes later — see ROADMAP.)
import { loadSgf } from './sgf.js'
import { Goban } from './goban.js'
import { sound } from './sound.js'
import { BLACK, WHITE, coordName } from './rules/go.js'

let activeViewer = null
export function setActiveViewer(v) { activeViewer = v }
document.addEventListener('keydown', e => {
  if (!activeViewer || e.altKey || e.metaKey || e.ctrlKey) return
  const t = e.target
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
  const v = activeViewer
  const map = { ArrowLeft: () => v.goTo(v.ply - 1), ArrowRight: () => v.goTo(v.ply + 1), ArrowUp: () => v.goTo(0), ArrowDown: () => v.goTo(v.last), Home: () => v.goTo(0), End: () => v.goTo(v.last) }
  if (map[e.key]) { e.preventDefault(); map[e.key]() }
})

export const ICONS = {
  start: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4v12M15 4l-7 6 7 6z"/></svg>',
  prev:  '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4l-6 6 6 6"/></svg>',
  next:  '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4l6 6-6 6"/></svg>',
  end:   '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4v12M5 4l7 6-7 6z"/></svg>',
}

export function mountSgfViewer(container, sgfText, { start = 0, onEnd = null, id = null } = {}) {
  const game = loadSgf(sgfText)
  const h = game.headers
  const rank = r => r ? ` (${r})` : ''
  const players = h.white ? `${h.black || 'Black'}${rank(h.blackRank)} – ${h.white}${rank(h.whiteRank)}` : (h.black || 'Black')
  const meta = [h.event, h.place, h.date, h.result ? 'Result ' + h.result : null].filter(Boolean).join(' · ')
  // plies: index 0 is the position before the first move (after any setup); the first node counts only if it holds a move
  const nodes = game.moves
  const firstMove = nodes.findIndex(m => m.color)
  const plies = firstMove < 0 ? [] : nodes.slice(firstMove)
  const last = plies.length

  container.className = 'game'
  container.tabIndex = 0
  container.innerHTML = `
    <div class="game-board">
      <div class="board-wrap" style="--board-size:${game.size}"><div class="board"></div></div>
      <div class="game-controls">
        <button class="icon-btn" data-nav="start" title="Start (↑)">${ICONS.start}</button>
        <button class="icon-btn" data-nav="prev" title="Previous (←)">${ICONS.prev}</button>
        <button class="icon-btn" data-nav="next" title="Next (→)">${ICONS.next}</button>
        <button class="icon-btn" data-nav="end" title="End (↓)">${ICONS.end}</button>
        <span class="spacer"></span>
        <span class="game-caps"><span class="turn-dot b"></span><b class="cap-b">0</b> <span class="turn-dot w"></span><b class="cap-w">0</b></span>
      </div>
    </div>
    <div class="game-side">
      <header class="game-head">
        <div class="game-players">${esc(players)}</div>
        ${meta ? `<div class="game-meta">${esc(meta)}</div>` : ''}
      </header>
      <div class="game-note"></div>
      <div class="moves"></div>
    </div>`

  // the starting position: setup stones from the nodes before the first move
  const setupPos = firstMove < 0 ? game.positions[game.positions.length - 1] : (firstMove > 0 ? game.positions[firstMove - 1] : null)
  const baseBlack = [], baseWhite = []
  if (setupPos) for (let i = 0; i < setupPos.board.length; i++) { if (setupPos.board[i] === BLACK) baseBlack.push(i); else if (setupPos.board[i]) baseWhite.push(i) }
  else for (const m of nodes.slice(0, Math.max(firstMove, 0))) { baseBlack.push(...m.setup.black); baseWhite.push(...m.setup.white) }
  const board = new Goban(container.querySelector('.board'), { size: game.size, black: baseBlack, white: baseWhite, komi: game.komi, turn: plies[0] ? plies[0].color : BLACK })
  const noteEl = container.querySelector('.game-note')
  const movesEl = container.querySelector('.moves')
  const capB = container.querySelector('.cap-b'), capW = container.querySelector('.cap-w')
  const rootComment = firstMove > 0 ? nodes.slice(0, firstMove).map(m => m.comment).filter(Boolean).join(' ') : (firstMove === 0 ? '' : nodes.map(m => m.comment).filter(Boolean).join(' '))

  // move list: every move is a button; comments break the flow underneath the move they belong to
  movesEl.innerHTML = plies.map((m, i) => {
    const n = i + 1
    const btn = `<button class="mv ${m.color === BLACK ? 'b' : 'w'}" data-ply="${n}"><span class="mvdot"></span>${n} ${m.point === null ? 'pass' : coordName(m.point, game.size)}</button>`
    return btn + (m.comment ? `<div class="mv-comment">${esc(m.comment)}</div>` : '')
  }).join('') + (h.result ? `<div class="mv-result">${esc(h.result)}</div>` : '')

  const v = {
    ply: 0, last, board, moves: plies,
    async goTo(n) {
      n = Math.max(0, Math.min(last, n))
      if (n === this.ply) return
      const animate = Math.abs(n - this.ply) === 1
      if (animate && n > this.ply) { await board.play(plies[n - 1].point, { color: plies[n - 1].color }) }
      else if (animate && n < this.ply) { await board.undo() }
      else {
        // jump: rebuild from the base position without animation
        await board.showPosition({ black: baseBlack, white: baseWhite })
        for (let i = 0; i < n; i++) board.game.play(plies[i].point, plies[i].color)
        board.render()
        if (n > 0) sound.play('stone')
      }
      this.ply = n
      paint()
      if (n === last && onEnd && id) onEnd(id)
    },
  }
  function paint() {
    movesEl.querySelectorAll('.mv').forEach(b => b.classList.toggle('current', +b.dataset.ply === v.ply))
    const cur = movesEl.querySelector('.mv.current'); if (cur) cur.scrollIntoView({ block: 'nearest' })
    noteEl.textContent = v.ply === 0 ? rootComment : (plies[v.ply - 1].comment || '')
    capB.textContent = board.game.captures[BLACK]; capW.textContent = board.game.captures[WHITE]
    container.querySelector('[data-nav="prev"]').disabled = v.ply === 0
    container.querySelector('[data-nav="next"]').disabled = v.ply === last
  }
  container.querySelector('.game-controls').addEventListener('click', e => {
    const b = e.target.closest('[data-nav]'); if (!b) return
    sound.unlock(); setActiveViewer(v)
    const nav = { start: 0, prev: v.ply - 1, next: v.ply + 1, end: last }
    v.goTo(nav[b.dataset.nav])
  })
  movesEl.addEventListener('click', e => { const b = e.target.closest('.mv'); if (b) { sound.unlock(); setActiveViewer(v); v.goTo(+b.dataset.ply) } })
  container.addEventListener('pointerdown', () => setActiveViewer(v))
  container.addEventListener('focus', () => setActiveViewer(v))
  paint()
  if (start > 0) v.goTo(start)
  return v
}

function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])) }
