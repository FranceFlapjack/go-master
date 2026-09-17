// The one board component: SVG goban + rules (js/rules/go.js) + sounds. Every board in the app goes through it.
import { Game, BLACK, WHITE, EMPTY, other, starPoints, coordName, LETTERS } from './rules/go.js'
import { sound } from './sound.js'
import { progress } from './progress.js'

export const MARK = { last: 'last', good: 'good', bad: 'bad', hint: 'hint', tri: 'tri', sq: 'sq', x: 'x' }
const NS = 'http://www.w3.org/2000/svg'
const U = 30 // one grid unit in viewBox units

function el(tag, attrs = {}, parent = null) {
  const e = document.createElementNS(NS, tag)
  for (const [k, v] of Object.entries(attrs)) if (v != null) e.setAttribute(k, v)
  if (parent) parent.appendChild(e)
  return e
}
const anim = () => { const v = getComputedStyle(document.documentElement).getPropertyValue('--board-anim').trim(); return parseInt(v) || 0 }
const wait = ms => new Promise(r => setTimeout(r, ms))

export class Goban {
  constructor(container, o = {}) {
    this.el = container
    this.o = o
    this.inputWho = null
    this.onMove = null
    this.judge = null      // optional fn(point) → bool; false plays the "fail" sound instead of the stone sound
    this.onIllegal = null  // optional fn(reason, point) after a refused click ('occupied' | 'ko' | 'superko' | 'suicide')
    this.labels = {}
    this.marks = new Map() // point → Set(type)
    this._build(o)
  }

  _build(o) {
    this.size = o.size || 9
    this.game = new Game(this.size, { komi: o.komi ?? 7.5, handicap: o.handicap || 0 })
    this.game.setup({ black: o.black || [], white: o.white || [] })
    if (o.turn) this.game.turn = o.turn
    if (o.ko != null) this.game.ko = o.ko
    this.coordinates = o.coordinates !== false
    const n = this.size, m = this.coordinates ? U * 1.1 : U * 0.6
    this.margin = m
    const W = (n - 1) * U + 2 * m
    this.el.innerHTML = ''
    const svg = el('svg', { viewBox: `0 0 ${W} ${W}`, class: 'goban', role: 'img', 'aria-label': `${n}×${n} go board` }, this.el)
    this.svg = svg
    el('rect', { class: 'wood', x: 0, y: 0, width: W, height: W }, svg)
    const grid = el('g', { class: 'grid' }, svg)
    for (let k = 0; k < n; k++) {
      const p = m + k * U
      el('line', { x1: m, y1: p, x2: m + (n - 1) * U, y2: p }, grid)
      el('line', { x1: p, y1: m, x2: p, y2: m + (n - 1) * U }, grid)
    }
    for (const s of starPoints(n)) { const { x, y } = this._xy(s); el('circle', { class: 'star', cx: x, cy: y, r: U * 0.11 }, grid) }
    if (this.coordinates) {
      const c = el('g', { class: 'coords' }, svg)
      for (let k = 0; k < n; k++) {
        const p = m + k * U
        el('text', { x: p, y: W - m * 0.32, 'text-anchor': 'middle' }, c).textContent = LETTERS[k]
        el('text', { x: m * 0.32, y: m + (n - 1 - k) * U + U * 0.13, 'text-anchor': 'middle' }, c).textContent = String(k + 1)
      }
    }
    this.hintLayer = el('g', { class: 'hints' }, svg)
    this.stoneLayer = el('g', { class: 'stones' }, svg)
    this.markLayer = el('g', { class: 'marks' }, svg)
    this.ghost = el('circle', { class: 'ghost', r: U * 0.47, visibility: 'hidden' }, svg)
    this.hit = el('rect', { class: 'hit', x: 0, y: 0, width: W, height: W, fill: 'transparent' }, svg)
    this.hit.addEventListener('pointermove', e => this._hover(e))
    this.hit.addEventListener('pointerleave', () => this.ghost.setAttribute('visibility', 'hidden'))
    this.hit.addEventListener('pointerdown', e => this._input(e))
    this.stones = new Map() // point → circle
    this.render()
    if (o.marks) for (const [type, pts] of Object.entries(o.marks)) for (const p of pts) this.mark(p, type)
    if (o.labels) this.setLabels(o.labels)
    if (o.interactive) this.enableInput(o.interactive === true ? 'turn' : o.interactive, o.onMove)
  }

  _xy(i) { return { x: this.margin + (i % this.size) * U, y: this.margin + Math.floor(i / this.size) * U } }
  _pointAt(e) {
    const r = this.svg.getBoundingClientRect()
    const W = (this.size - 1) * U + 2 * this.margin
    const x = (e.clientX - r.left) / r.width * W, y = (e.clientY - r.top) / r.height * W
    const cx = Math.round((x - this.margin) / U), cy = Math.round((y - this.margin) / U)
    if (cx < 0 || cy < 0 || cx >= this.size || cy >= this.size) return null
    if (Math.abs(x - (this.margin + cx * U)) > U * 0.5 || Math.abs(y - (this.margin + cy * U)) > U * 0.5) return null
    return cy * this.size + cx
  }

  // --- position ---
  turn() { return this.game.turn }
  /** repaint every stone from the game state (no animation) */
  render() {
    this.stoneLayer.innerHTML = ''; this.stones.clear()
    for (let i = 0; i < this.game.board.length; i++) if (this.game.board[i]) this._addStone(i, this.game.board[i], false)
    this._paintLast()
  }
  _addStone(i, color, animate = true) {
    const { x, y } = this._xy(i)
    const c = el('circle', { class: `stone ${color === BLACK ? 'black' : 'white'}${animate ? ' appear' : ''}`, cx: x, cy: y, r: U * 0.47 }, this.stoneLayer)
    this.stones.set(i, c)
    return c
  }
  async showPosition({ black = [], white = [], turn = null, size = null, marks = null, labels = null, ko = null } = {}) {
    if (size && size !== this.size) { this._build({ ...this.o, size, black, white, turn, marks, labels, ko }); return }
    this.game = new Game(this.size, { komi: this.o.komi ?? 7.5 }).setup({ black, white })
    if (turn) this.game.turn = turn
    if (ko != null) this.game.ko = ko
    this.clearTerritory()
    this.clearMarks(); this.setLabels({})
    this.render()
    if (marks) for (const [type, pts] of Object.entries(marks)) for (const p of pts) this.mark(p, type)
    if (labels) this.setLabels(labels)
  }

  /** play a stone (index) or a pass (null) for the side to move; animates and sounds */
  async play(point, { silent = false, color = null } = {}) {
    const rec = this.game.play(point, color || this.game.turn)
    if (point !== null) {
      this._addStone(point, rec.color, true)
      if (!silent) sound.play(rec.captured.length ? 'capture' : 'stone')
      if (rec.captured.length) await this._removeStones(rec.captured)
      else await wait(anim())
    } else if (!silent) sound.play('pass')
    this._paintLast()
    return rec
  }
  async _removeStones(points) {
    for (const p of points) { const c = this.stones.get(p); if (c) { c.classList.add('captured'); this.stones.delete(p) } }
    await wait(anim() * 1.4)
    for (const p of points) this.stoneLayer.querySelectorAll('.captured').forEach(c => c.remove())
  }
  async undo({ silent = false } = {}) {
    const rec = this.game.undo()
    if (!rec) return null
    if (rec.point !== null) {
      const c = this.stones.get(rec.point); if (c) { c.remove(); this.stones.delete(rec.point) }
      for (const p of rec.captured) this._addStone(p, other(rec.color), false)
      if (!silent) sound.play('stone')
    }
    this._paintLast()
    return rec
  }
  _paintLast() {
    this.clearMarks(MARK.last)
    const last = this.game.history[this.game.history.length - 1]
    if (last && last.point !== null) this.mark(last.point, MARK.last)
  }

  // --- marks & labels ---
  mark(point, type = MARK.good) {
    if (!this.marks.has(point)) this.marks.set(point, new Set())
    this.marks.get(point).add(type)
    this._paintMarks(point)
  }
  clearMarks(type = null) {
    for (const [p, set] of this.marks) { if (type) set.delete(type); else set.clear(); this._paintMarks(p) }
  }
  setLabels(labels = {}) { const old = Object.keys(this.labels); this.labels = labels; for (const p of new Set([...old, ...Object.keys(labels)].map(Number))) this._paintMarks(p) }
  _paintMarks(point) {
    this.markLayer.querySelectorAll(`[data-p="${point}"]`).forEach(e => e.remove())
    this.hintLayer.querySelectorAll(`[data-p="${point}"]`).forEach(e => e.remove())
    const { x, y } = this._xy(point)
    const on = this.game.board[point], cls = on === BLACK ? ' on-black' : on === WHITE ? ' on-white' : ' on-empty'
    const set = this.marks.get(point) || new Set()
    for (const t of set) {
      if (t === MARK.hint) { el('circle', { class: 'mk-hint', 'data-p': point, cx: x, cy: y, r: U * 0.47 }, this.hintLayer); continue }
      if (t === MARK.last) { el('circle', { class: 'mk-last' + cls, 'data-p': point, cx: x, cy: y, r: U * 0.2 }, this.markLayer); continue }
      if (t === MARK.good || t === MARK.bad) { el('circle', { class: `mk-${t}` + cls, 'data-p': point, cx: x, cy: y, r: U * 0.47 }, this.markLayer); continue }
      if (t === MARK.tri) { const r = U * 0.26; el('path', { class: 'mk-tri' + cls, 'data-p': point, d: `M${x} ${y - r} L${x + r * 0.87} ${y + r * 0.5} L${x - r * 0.87} ${y + r * 0.5} Z` }, this.markLayer); continue }
      if (t === MARK.sq) { const r = U * 0.22; el('rect', { class: 'mk-sq' + cls, 'data-p': point, x: x - r, y: y - r, width: 2 * r, height: 2 * r }, this.markLayer); continue }
      if (t === MARK.x) { const r = U * 0.22; el('path', { class: 'mk-x' + cls, 'data-p': point, d: `M${x - r} ${y - r} L${x + r} ${y + r} M${x + r} ${y - r} L${x - r} ${y + r}` }, this.markLayer); continue }
    }
    const label = this.labels[point]
    if (label) {
      if (!on) el('circle', { class: 'label-bg', 'data-p': point, cx: x, cy: y, r: U * 0.36 }, this.markLayer)
      el('text', { class: 'label' + cls, 'data-p': point, x, y: y + U * 0.14, 'text-anchor': 'middle' }, this.markLayer).textContent = label
    }
  }

  // --- territory (the counted areas, from Game.score().owner) ---
  paintTerritory(owner) {
    this.clearTerritory()
    const r = U * 0.17
    for (let i = 0; i < owner.length; i++) {
      if (!owner[i] || this.game.board[i]) continue
      const { x, y } = this._xy(i)
      el('rect', { class: `terr ${owner[i] === BLACK ? 'black' : 'white'}`, x: x - r, y: y - r, width: 2 * r, height: 2 * r }, this.hintLayer)
    }
  }
  clearTerritory() { this.hintLayer.querySelectorAll('.terr').forEach(e => e.remove()) }

  // --- input ---
  /** who: 'turn' (whoever is to move), BLACK or WHITE. onMove(rec) is called after the stone is placed. */
  enableInput(who = 'turn', onMove) {
    this.inputWho = who; this.onMove = onMove
    this.svg.classList.add('interactive')
  }
  disableInput() { this.inputWho = null; this.svg.classList.remove('interactive'); this.ghost.setAttribute('visibility', 'hidden') }
  _mayMove() { return this.inputWho && (this.inputWho === 'turn' || this.inputWho === this.game.turn) && !this.game.over }
  _hover(e) {
    if (!this._mayMove()) return
    const p = this._pointAt(e)
    if (p == null || !this.game.check(p).ok) { this.ghost.setAttribute('visibility', 'hidden'); return }
    const { x, y } = this._xy(p)
    this.ghost.setAttribute('cx', x); this.ghost.setAttribute('cy', y)
    this.ghost.setAttribute('class', `ghost ${this.game.turn === BLACK ? 'black' : 'white'}`)
    this.ghost.setAttribute('visibility', 'visible')
  }
  async _input(e) {
    if (!this._mayMove()) return
    const p = this._pointAt(e)
    if (p == null) return
    sound.unlock()
    const r = this.game.check(p)
    if (!r.ok) { sound.play('illegal'); this._flashIllegal(p); if (this.onIllegal) this.onIllegal(r.reason, p); return }
    this.ghost.setAttribute('visibility', 'hidden')
    const verdict = this.judge ? this.judge(p) : true
    const rec = await this.play(p, { silent: !verdict })
    if (!verdict) sound.play('fail')
    progress.recordMove()
    if (this.onMove) this.onMove(rec)
  }
  _flashIllegal(p) {
    const { x, y } = this._xy(p)
    const c = el('circle', { class: 'illegal', cx: x, cy: y, r: U * 0.47 }, this.markLayer)
    setTimeout(() => c.remove(), 420)
  }
  /** shake a stone (wrong answer) */
  shakeStone(point) {
    const c = this.stones.get(point); if (!c) return
    c.classList.remove('shake'); void c.getBBox(); c.classList.add('shake')
    setTimeout(() => c.classList.remove('shake'), 400)
  }
  destroy() { this.el.innerHTML = '' }
}

export { BLACK, WHITE, EMPTY, coordName }
