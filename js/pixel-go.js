// Go Master's welcome background, in 16-bit pixels: a 19×19 goban drawn one pixel per unit, on which the
// ear-reddening game (Gennan Inseki – Shusaku, 1846, content/games/) is replayed stone by stone up to
// move 127, Shusaku's K11, with a blinking cursor on the last stone (the cursor, blinking, is the one bit of
// motion; the board itself steps at 10 fps, as a 16-bit screen would). 24 s placing, 4 s held, 2 s fading,
// then again; the position after move 127, still, under reduced motion.
//
// Go only, and mounted from js/app.js into the welcome's root (as Chess's knight's tour and Poker's card),
// so js/welcome.js and css/welcome.css stay identical across the Master series.
import { loadSgf } from './sgf.js'
import { BLACK } from './rules/go.js'

const GAME = 'content/games/gennan-shusaku-1846.sgf', UPTO = 127
const DRAW = 24000, HOLD = 4000, FADE = 2000, CYCLE = DRAW + HOLD + FADE
const S = 8, N = 19, W = (N - 1) * S + 7          // 8 px between lines; a stone is 7×7 px; board W×W px
const SVG = 'http://www.w3.org/2000/svg'
// a 7×7 stone: x body; for black, h is its one highlight pixel; for white, h is its shaded edge
const DISC = ['..xxx..', '.xxxxx.', 'xxxxxxx', 'xxxxxxx', 'xxxxxxh', '.xxxxh.', '..hhh..']
const BLACK_HL = ['..xxx..', '.xxxxx.', 'xxhxxxx', 'xxxxxxx', 'xxxxxxx', '.xxxxx.', '..xxx..']

/** pixel rows → one path of 1×1 squares, offset to (x0, y0) */
function pixels(rows, ch, x0, y0) {
  let d = ''
  rows.forEach((r, y) => [...r].forEach((c, x) => { if (ch.includes(c)) d += `M${x0 + x} ${y0 + y}h1v1h-1z` }))
  return d
}

export async function mountPixelGo(root) {
  let text
  try { text = await (await fetch(GAME)).text() } catch { return }   // no background is better than a broken one
  const game = loadSgf(text)
  const plies = game.positions.filter((_, k) => game.moves[k].color).slice(0, UPTO)
  const at = i => i * S                                              // the 7-px stone's top-left for line i
  const svg = document.createElementNS(SVG, 'svg')
  svg.setAttribute('class', 'wl-pixel')
  svg.setAttribute('viewBox', `-4 -4 ${W + 8} ${W + 8}`)
  svg.setAttribute('shape-rendering', 'crispEdges')
  svg.setAttribute('aria-hidden', 'true')
  let grid = ''
  for (let i = 0; i < N; i++) grid += `M${at(i) + 3} 3h1v${W - 6}h-1zM3 ${at(i) + 3}v1h${W - 6}v-1z`
  for (const x of [3, 9, 15]) for (const y of [3, 9, 15]) grid += `M${at(x) + 2} ${at(y) + 2}h3v3h-3z`
  svg.innerHTML = `<path class="wl-pixel-grid" d="${grid}"/><g class="wl-pixel-run"><g class="wl-pixel-stones"></g><path class="wl-pixel-cursor"/></g>`
  root.prepend(svg)

  const run = svg.querySelector('.wl-pixel-run'), stones = svg.querySelector('.wl-pixel-stones'), cursor = svg.querySelector('.wl-pixel-cursor')
  let shown = -1
  const place = n => {                                               // the board after n moves (1 … UPTO)
    if (n === shown) return
    shown = n
    const board = plies[n - 1].board
    let b = '', bh = '', w = '', wh = ''
    board.forEach((v, p) => {
      if (!v) return
      const x = at(p % N), y = at(Math.floor(p / N))
      if (v === BLACK) { b += pixels(BLACK_HL, 'x', x, y); bh += pixels(BLACK_HL, 'h', x, y) }
      else { w += pixels(DISC, 'x', x, y); wh += pixels(DISC, 'h', x, y) }
    })
    stones.innerHTML = `<path class="b" d="${b}"/><path class="bh" d="${bh}"/><path class="w" d="${w}"/><path class="wh" d="${wh}"/>`
    const last = game.moves[game.positions.indexOf(plies[n - 1])].point
    const cx = at(last % N), cy = at(Math.floor(last / N))
    // four corner brackets around the last stone, the old game cursor
    cursor.setAttribute('d', `M${cx - 2} ${cy - 2}h3v1h-2v2h-1zM${cx + 6} ${cy - 2}h3v3h-1v-2h-2zM${cx - 2} ${cy + 6}h1v2h2v1h-3zM${cx + 8} ${cy + 6}h1v3h-3v-1h2z`)
  }
  const paint = t => {                                               // t: ms into the cycle
    place(Math.max(1, Math.min(UPTO, Math.ceil(t / DRAW * UPTO))))
    cursor.style.opacity = t < DRAW || Math.floor(t / 400) % 2 ? 1 : 0   // blinks once the game reaches K11
    run.style.opacity = t < DRAW + HOLD ? 1 : Math.max(0, 1 - (t - DRAW - HOLD) / FADE)
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { paint(DRAW); cursor.style.opacity = 1; return }
  // a timer, not requestAnimationFrame (this app's rule, so it runs in hidden tabs); 10 fps suits 16-bit
  const start = performance.now()
  const tick = setInterval(() => { if (!svg.isConnected) return clearInterval(tick); paint((performance.now() - start) % CYCLE) }, 100)
  paint(0)
}
