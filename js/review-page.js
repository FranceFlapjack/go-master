// The review page: today's queue, one problem at a time. The ladder and the store are in js/review.js;
// this module is kept separate so js/exercise.js can join a newly solved problem to the ladder without
// importing the page (and creating an import cycle).
import { review } from './review.js'
import { today, dayKey, addDays } from './progress.js'
import { tryFence } from './tries.js'
import { mountExercise } from './exercise.js'

const lessonCache = new Map()
async function fenceFor(id, contentBase = 'content/') {
  const [lesson, n] = id.split('#')
  if (!lessonCache.has(lesson)) {
    lessonCache.set(lesson, fetch(`${contentBase}lessons/${lesson}.md`).then(r => (r.ok ? r.text() : null)).catch(() => null))
  }
  const md = await lessonCache.get(lesson)
  return md ? tryFence(md, +n) : null
}

export function mountReview(container, { contentBase = 'content/' } = {}) {
  const day = today()
  const queue = review.start(day)
  let i = 0, mounted = null
  container.innerHTML = `<div class="page review-page">
    <section class="hero">
      <span class="eyebrow">Review</span>
      <h1>Today's problems</h1>
      <p>Problems you have solved before, brought back on a ladder: get one right and it comes back later, miss it and it comes back tomorrow.</p>
    </section>
    <div class="review-bar"><span class="review-count"></span><div class="review-progress"><i></i></div></div>
    <div class="review-slot"></div>
  </div>`
  const slot = container.querySelector('.review-slot')
  const countEl = container.querySelector('.review-count')
  const barEl = container.querySelector('.review-progress i')

  function paintBar() {
    countEl.textContent = queue.length ? `${Math.min(i + 1, queue.length)} of ${queue.length}` : ''
    barEl.style.width = queue.length ? `${Math.round(100 * i / queue.length)}%` : '0%'
  }
  function done() {
    const next = review.next()
    const days = !next ? 0 : Math.round((new Date(next + 'T12:00:00') - new Date(day + 'T12:00:00')) / 86400000)
    const when = !next ? '' : days <= 0 ? 'More are due now — reload to take another batch.' : days === 1 ? 'The next batch is due tomorrow.' : `The next batch is due in ${days} days.`
    slot.innerHTML = `<div class="card review-done"><div><span class="eyebrow">Done</span><h3>${queue.length ? 'That is today\'s review.' : 'Nothing due today.'}</h3><div class="small">${when || 'Solve a problem in a lesson and it joins the review.'}</div></div><a class="btn" href="#/">Home</a></div>`
    container.querySelector('.review-bar').hidden = true
  }
  async function show() {
    if (i >= queue.length) return done()
    paintBar()
    const id = queue[i]
    const p = await fenceFor(id, contentBase)
    if (!p) { review.drop(id); queue.splice(i, 1); return show() }   // the fence is gone: forget it
    const [lesson] = id.split('#')
    slot.innerHTML = `<div class="review-item"><div class="review-from"><span class="eyebrow">From</span> <a href="#/lesson/${lesson}">${lesson.split('/')[1].replace(/-/g, ' ')}</a></div><figure class="review-ex"></figure><div class="review-next" hidden><button class="btn primary" data-act="next">Next</button></div></div>`
    const fig = slot.querySelector('.review-ex')
    let missed = false
    mounted = mountExercise(fig, p, {
      lessonId: lesson, index: +id.split('#')[1], review: true,
      onMiss: () => { missed = true },
      onSolved: () => {
        review.record(id, !missed, day)
        const nx = slot.querySelector('.review-next'); nx.hidden = false
        nx.querySelector('[data-act=next]').focus()
      },
    })
    slot.querySelector('[data-act=next]').addEventListener('click', () => { i++; show() })
  }
  show()
  return () => { mounted = null }
}
