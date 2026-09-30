// Lesson renderer: Markdown (+ frontmatter) → HTML, with `board`, `sgf`, `try` and `tip` fences mounted as components.
import { marked } from '../vendor/marked/marked.esm.js'
import { Goban } from './goban.js'
import { mountSgfViewer } from './sgf-viewer.js'
import { mountExercise } from './exercise.js'
import { progress } from './progress.js'
import { positionFrom } from './position.js'
import { parseCoords } from './rules/go.js'
import { parseFrontmatter, parseParams } from './frontmatter.js'
import { mascot, catHeadHTML } from './mascot.js'
export { parseFrontmatter, parseParams }

const BLOCKS = new Set(['board', 'sgf', 'try', 'tip'])
marked.use({
  renderer: {
    code({ text, lang }) {
      if (BLOCKS.has(lang)) return `<div class="blk" data-kind="${lang}" data-src="${encodeURIComponent(text)}"></div>`
      return false
    },
  },
})

/** `+++ Title` opens a collapsible "read more" section, a bare `+++` closes it. */
function expandSections(md) {
  return md.replace(/^\+\+\+[ \t]+(.+)$/gm, (_, t) => `<details class="more"><summary>${esc(t.trim())}</summary><div class="more-body">\n\n`)
           .replace(/^\+\+\+[ \t]*$/gm, '\n\n</div></details>')
}

export async function renderLesson(container, md, { lessonId, contentBase = 'content/', onSolved = null } = {}) {
  const { meta, body } = parseFrontmatter(md)
  const html = marked.parse(expandSections(body))
  const sources = Array.isArray(meta.sources) ? meta.sources : []
  container.innerHTML = `
    <article class="lesson">
      <header class="lesson-head">
        <span class="eyebrow">${esc(meta.track || '')}${meta.level ? ' · level ' + esc(meta.level) : ''}</span>
        <h1>${esc(meta.title || lessonId)}</h1>
        ${meta.lede ? `<p class="lede">${esc(meta.lede)}</p>` : ''}
      </header>
      <div class="prose lesson-body">${html}</div>
      ${sources.length ? `<section class="sources"><span class="eyebrow">Sources</span><ul>${sources.map(s => `<li>${linkify(esc(s))}</li>`).join('')}</ul></section>` : ''}
    </article>`

  const mounted = []
  const tryIds = []
  let tryIndex = 0
  for (const blk of container.querySelectorAll('.blk')) {
    const kind = blk.dataset.kind
    const src = decodeURIComponent(blk.dataset.src)
    const p = parseParams(src)
    if (kind === 'board') {
      const fig = document.createElement('figure'); fig.className = 'board-figure' + (p.image ? ' with-aside' : '')
      const aside = p.image ? `<div class="board-aside"><div class="photo${p.tone ? ' ' + esc(p.tone) : ''}"><img src="${esc(contentBase + 'images/' + p.image)}" alt="${esc(p.alt || '')}"${p.focus ? ` style="object-position: ${esc(p.focus)}"` : ''}></div>${p.credit ? `<div class="credit">${esc(p.credit)}</div>` : ''}</div>` : ''
      fig.innerHTML = `<div class="board-wrap"><div class="board"></div></div>${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}${aside}`
      blk.replaceWith(fig)
      const pos = positionFrom(p)
      fig.querySelector('.board-wrap').style.setProperty('--board-size', pos.size)
      const gb = new Goban(fig.querySelector('.board'), { ...pos, coordinates: p.coordinates !== 'false', interactive: p.interactive === 'true' ? 'turn' : false })
      if (p.territory === 'true') gb.paintTerritory(gb.game.score(p.dead ? parseCoords(p.dead, pos.size) : []).owner) // the counted areas, dead stones removed first
      mounted.push(gb)
    } else if (kind === 'sgf') {
      let sgf = p.rest
      if (p.file) sgf = await (await fetch(contentBase + 'games/' + p.file)).text()
      const fig = document.createElement('figure'); blk.replaceWith(fig)
      const gameId = p.file || `${lessonId}#game`
      mounted.push(mountSgfViewer(fig, sgf, { start: +p.start || 0, id: gameId, onEnd: id => progress.recordGame(id) }))
    } else if (kind === 'try') {
      const fig = document.createElement('figure'); blk.replaceWith(fig)
      const ex = mountExercise(fig, p, { lessonId, index: tryIndex++, onSolved })
      tryIds.push(ex.id)
      mounted.push(ex)
    } else if (kind === 'tip') {
      mounted.push(mountTip(blk, src))
    }
  }
  return { meta, mounted, tryIds }
}

/**
 * A tip tucked into a lesson: ```tip fences (the same as Chess and Poker Master). In the text it is only a
 * small cat and a label. The first time the tip scrolls fully into view the cat in the corner meows that
 * it has one; clicking the cat, or the label, opens it. With the cat switched off, the label opens it inline.
 *
 * The body is plain text, **bold** allowed. An optional first line `title: …` replaces "Meow tip".
 */
function mountTip(blk, raw) {
  const lines = raw.trim().split('\n')
  let title = null
  if (/^title:/i.test(lines[0])) title = lines.shift().replace(/^title:\s*/i, '').trim()
  const text = lines.join(' ').replace(/\s+/g, ' ').trim()

  const el = document.createElement('div')
  el.className = 'tip'
  el.innerHTML = `<button class="tip-cue" type="button">${catHeadHTML(26)}<span>${esc(title || 'Meow tip')}</span></button><p class="tip-text" hidden></p>`
  el.querySelector('.tip-text').innerHTML = esc(text).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  blk.replaceWith(el)

  const msg = { kind: 'tip', text, title: title || 'Meow tip', owner: el }
  let io = null, dead = false, seen = false
  // clicking the label in the text is asking, so the bubble opens; with the cat off, it opens inline
  el.querySelector('.tip-cue').addEventListener('click', () => {
    seen = true                     // read now: it should not meow about itself afterwards
    if (io) { io.disconnect(); io = null }
    if (!mascot.say(msg)) { const t = el.querySelector('.tip-text'); t.hidden = !t.hidden }
  })
  // Meow once, the first time the whole cue is on screen and clear of the bottom fifth (where the cat
  // sits). Armed only after the page has settled, so a cue the reader never scrolled to is not spent.
  const arm = setTimeout(() => {
    if (dead || seen || !el.isConnected || typeof IntersectionObserver !== 'function') return
    io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting) && el.isConnected) { io.disconnect(); io = null; mascot.notify(msg) }
    }, { threshold: 1, rootMargin: '0px 0px -20% 0px' })
    io.observe(el.querySelector('.tip-cue'))
  }, 700)
  return { destroy() { dead = true; clearTimeout(arm); if (io) io.disconnect(); mascot.hide(el) } }
}

function linkify(s) { return s.replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>') }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])) }
