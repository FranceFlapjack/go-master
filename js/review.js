// Daily review: the problems you have already solved, brought back on a Leitner ladder so they stick.
//
// The ladder, and nothing cleverer: five boxes with intervals 1, 3, 7, 16, 35 days. Solve a problem on review
// and it moves up a box; miss it and it drops to box 1. A problem joins when it is first solved — first try
// starts in box 2, solved after a miss starts in box 1. These intervals are the standard Leitner spread,
// chosen because they are explainable; they are not claimed to be optimal for anything.
//
// The problems themselves are never copied: an id is `<track>/<slug>#<n>`, so the page fetches the lesson and
// takes its nth `try` fence (js/tries.js). Edit a lesson and the review follows; delete a fence and the entry
// is dropped. State lives inside the progress object (`review`), so export/import already carries it.
import { progress, dayKey, today, addDays } from './progress.js'

export const BOXES = [1, 3, 7, 16, 35]   // days until the next sight, by box (box 1 is BOXES[0])
export const DAILY_CAP = 15              // most problems in one day's queue, oldest due first
const SEED_DAYS = 14                     // problems solved before the review existed are spread over this many days

const state = () => { const s = progress.state; if (!s.review) s.review = {}; return s.review }

/** one entry: {box, due: 'YYYY-MM-DD', seen, misses} */
export function grade(entry, ok, day = today()) {
  const box = ok ? Math.min(BOXES.length, (entry.box || 1) + 1) : 1
  return { box, due: dayKey(addDays(new Date(day + 'T12:00:00'), BOXES[box - 1])), seen: (entry.seen || 0) + 1, misses: (entry.misses || 0) + (ok ? 0 : 1) }
}
/** a newly solved problem joins the ladder: first try starts a box higher */
export function entryFor(firstTry, day = today()) {
  const box = firstTry ? 2 : 1
  return { box, due: dayKey(addDays(new Date(day + 'T12:00:00'), BOXES[box - 1])), seen: 1, misses: firstTry ? 0 : 1 }
}
/** ids due on or before `day`, oldest due first, capped */
export function due(table, day = today(), cap = DAILY_CAP) {
  return Object.entries(table).filter(([, e]) => e.due <= day).sort((a, b) => (a[1].due < b[1].due ? -1 : a[1].due > b[1].due ? 1 : 0)).slice(0, cap).map(([id]) => id)
}
export function dueCount(table, day = today(), cap = DAILY_CAP) { return due(table, day, cap).length }
/** the next day anything falls due, or null */
export function nextDue(table) {
  const days = Object.values(table).map(e => e.due).sort()
  return days.length ? days[0] : null
}
/**
 * Problems solved before this feature existed join the ladder spread over SEED_DAYS days (oldest solve first),
 * so the first day is a normal session rather than everything at once. Runs once per unseeded problem.
 */
export function seed(tries, table, day = today(), days = SEED_DAYS) {
  const fresh = Object.entries(tries).filter(([id]) => !table[id]).sort((a, b) => (a[1].solved || 0) - (b[1].solved || 0))
  // what already fits in one session is not worth delaying; more than that is spread over `days`
  const per = fresh.length <= DAILY_CAP ? fresh.length : Math.max(1, Math.ceil(fresh.length / days))
  fresh.forEach(([id, t], i) => {
    table[id] = { box: t.first ? 2 : 1, due: dayKey(addDays(new Date(day + 'T12:00:00'), Math.floor(i / per))), seen: 1, misses: t.first ? 0 : 1 }
  })
  return table
}

// --- the store (localStorage, through progress) ---------------------------------------------------
export const review = {
  get table() { return state() },
  /** put every problem solved so far on the ladder (once), so the badge and the queue are right everywhere */
  ensureSeeded(day = today()) { const t = state(); const before = Object.keys(t).length; seed(progress.state.tries, t, day); if (Object.keys(t).length !== before) progress._save() },
  /** today's queue */
  start(day = today()) { this.ensureSeeded(day); return due(state(), day) },
  count(day = today()) { return dueCount(state(), day) },
  next(table = state()) { return nextDue(table) },
  record(id, ok, day = today()) {
    const t = state()
    t[id] = grade(t[id] || { box: 1 }, ok, day)
    progress.addPoints(ok ? 2 : 1, day)   // _save() happens inside addPoints
    return t[id]
  },
  add(id, firstTry, day = today()) { const t = state(); if (!t[id]) { t[id] = entryFor(firstTry, day); progress._save() } },
  drop(id) { const t = state(); if (t[id]) { delete t[id]; progress._save() } },
}
