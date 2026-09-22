#!/usr/bin/env node
// The review ladder (js/review.js) and the lesson-fence reader (js/tries.js). Both are pure, so both are tested
// here rather than by reading: promotion and demotion, due dates across a month, the seeding spread, the daily
// cap, and that every id the seeder would produce still points at a real `try` fence in the content.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BOXES, DAILY_CAP, grade, entryFor, due, dueCount, nextDue, seed } from '../js/review.js'
import { tryFences, tryFence } from '../js/tries.js'
import { dayKey, addDays } from '../js/progress.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
let passed = 0, failed = 0
const ok = (cond, name) => { if (cond) { passed++; console.log('ok  ', name) } else { failed++; console.log('FAIL', name) } }
const plus = (day, n) => dayKey(addDays(new Date(day + 'T12:00:00'), n))
const DAY = '2026-09-23'

// --- the ladder ---------------------------------------------------------------------------------
ok(BOXES.length === 5 && BOXES[0] === 1 && BOXES[4] === 35, 'five boxes, 1 … 35 days')

{ // a new problem joins one box higher when it was solved first try
  const a = entryFor(true, DAY), b = entryFor(false, DAY)
  ok(a.box === 2 && a.due === plus(DAY, BOXES[1]), 'solved first try: box 2, due in 3 days')
  ok(b.box === 1 && b.due === plus(DAY, BOXES[0]) && b.misses === 1, 'solved after a miss: box 1, due tomorrow')
}
{ // right moves up a box, wrong drops to box 1 whatever the box
  let e = entryFor(false, DAY)
  const days = []
  let d = DAY
  for (let i = 0; i < 5; i++) { d = e.due; e = grade(e, true, d); days.push([e.box, e.due]) }
  ok(days.map(x => x[0]).join(',') === '2,3,4,5,5', 'five right answers walk up the boxes and stop at the top')
  ok(e.seen === 6 && e.misses === 1, 'seen and misses are counted')
  const back = grade(e, false, e.due)
  ok(back.box === 1 && back.due === plus(e.due, 1) && back.misses === 2, 'one miss drops it to box 1, due tomorrow')
}
{ // the dates are the box intervals, from the day it was answered — not from the day it fell due
  const e = grade({ box: 2 }, true, DAY)
  ok(e.box === 3 && e.due === plus(DAY, 7), 'box 3 is due in 7 days')
  const late = grade({ box: 2 }, true, plus(DAY, 10))
  ok(late.due === plus(DAY, 17), 'answered ten days late: the next sight is seven days after *that*')
}

// --- the queue ----------------------------------------------------------------------------------
{
  const table = {
    'a#0': { box: 1, due: plus(DAY, -3) },
    'b#0': { box: 1, due: plus(DAY, -1) },
    'c#0': { box: 2, due: DAY },
    'd#0': { box: 3, due: plus(DAY, 1) },
  }
  ok(due(table, DAY).join(' ') === 'a#0 b#0 c#0', 'due today: everything due on or before today, oldest first')
  ok(!due(table, DAY).includes('d#0'), 'tomorrow is not due today')
  ok(nextDue(table) === plus(DAY, -3), 'nextDue is the earliest due date on the table')
  ok(dueCount(table, DAY) === 3 && dueCount(table, plus(DAY, 1)) === 4, 'dueCount follows the day')
  const many = {}; for (let i = 0; i < 40; i++) many[`x${i}#0`] = { box: 1, due: plus(DAY, -i) }
  ok(due(many, DAY).length === DAILY_CAP, `the day's queue is capped at ${DAILY_CAP}`)
  ok(due(many, DAY)[0] === 'x39#0', 'the cap keeps the oldest due first')
  ok(due({}, DAY).length === 0 && nextDue({}) === null, 'an empty table has nothing due and no next date')
}

// --- seeding ------------------------------------------------------------------------------------
{
  const tries = {}; for (let i = 0; i < 151; i++) tries[`t${i}#0`] = { solved: 1000 + i, first: i % 3 === 0 }
  const table = seed(tries, {}, DAY)
  ok(Object.keys(table).length === 151, 'every solved problem is seeded')
  const spread = new Set(Object.values(table).map(e => e.due))
  ok(spread.size === 14, 'seeded problems are spread over fourteen days')
  ok(dueCount(table, DAY) === 11, 'the first seeded day is one session, not 151 problems')
  ok(table['t0#0'].due === DAY && table['t150#0'].due === plus(DAY, 13), 'the oldest solve comes back first')
  ok(table['t0#0'].box === 2 && table['t1#0'].box === 1, 'a first-try solve is seeded a box higher')
  const again = seed({ ...tries, 'new#0': { solved: 9999, first: true } }, table, plus(DAY, 5))
  ok(again['t0#0'].due === DAY && again['new#0'].due === plus(DAY, 5), 'seeding again leaves existing entries alone and adds the new one')
  const small = seed({ 'a#0': { solved: 1 }, 'b#0': { solved: 2 } }, {}, DAY)
  ok(small['a#0'].due === DAY && small['b#0'].due === DAY, 'a session\'s worth or less is not spread: it all lands today')
  const fifteen = {}; for (let i = 0; i < 15; i++) fifteen[`s${i}#0`] = { solved: i }
  ok(dueCount(seed(fifteen, {}, DAY), DAY) === 15, 'exactly one session\'s worth lands today')
}

// --- the fences the ids point at ------------------------------------------------------------------
{
  const md = '---\ntitle: x\n---\n\n```try\nsize: 9\nsolution: A1\n```\n\ntext\n\n```board\nsize: 9\n```\n\n```try\nsize: 9\nsolution: B2\n```\n'
  const t = tryFences(md)
  ok(t.length === 2 && t[0].solution === 'A1' && t[1].solution === 'B2', 'tryFences reads the try fences in order and skips board fences')
  ok(tryFence(md, 1).solution === 'B2' && tryFence(md, 2) === null, 'tryFence is 0-based and returns null past the end')
}
{ // every id the app can produce resolves to a fence in the content — the review page's one assumption
  const curriculum = JSON.parse(readFileSync(join(root, 'content/curriculum.json'), 'utf8'))
  let ids = 0, missing = 0
  for (const track of curriculum.tracks) for (const l of track.lessons) {
    if (!l.ready) continue
    const file = join(root, 'content/lessons', track.id, l.slug + '.md')
    if (!existsSync(file)) { missing++; continue }
    const fences = tryFences(readFileSync(file, 'utf8'))
    fences.forEach((f, i) => { ids++; if (!f.solution) missing++ })
  }
  ok(missing === 0 && ids > 100, `every problem id in the content resolves to a fence with a solution (${ids} problems)`)
}

console.log(failed ? `\n${failed} review check(s) FAILED, ${passed} passed` : `\nall ${passed} review checks passed`)
process.exit(failed ? 1 : 0)
