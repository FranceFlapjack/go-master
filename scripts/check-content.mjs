#!/usr/bin/env node
// Content checker: every ready lesson exists, has sources, and every board / try / sgf fence is a legal position
// with a legal solution tree. Run before every commit. Exit code 1 on any failure.
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseFrontmatter, parseParams } from '../js/frontmatter.js'
import { positionFrom } from '../js/position.js'
import { parseSolution, loadSgf } from '../js/sgf.js'
import { Game, coordName, parseCoords, parseCoord } from '../js/rules/go.js'
import { canCapture, canEscape } from '../js/rules/capture-search.js'
import { lifeStatus } from '../js/rules/life-search.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const curriculum = JSON.parse(readFileSync(join(root, 'content/curriculum.json'), 'utf8'))
let problems = 0, lessons = 0, fences = 0, tries = 0
const fail = (where, msg) => { problems++; console.log(`FAIL ${where}: ${msg}`) }

for (const t of curriculum.tracks) for (const l of t.lessons) {
  const where = `${t.id}/${l.slug}`
  const file = join(root, 'content/lessons', t.id, l.slug + '.md')
  if (!l.ready) { if (existsSync(file)) console.log(`note ${where}: file exists but lesson is not ready`); continue }
  if (!existsSync(file)) { fail(where, 'ready but the file is missing'); continue }
  lessons++
  const md = readFileSync(file, 'utf8')
  const { meta, body } = parseFrontmatter(md)
  if (meta.id !== where) fail(where, `frontmatter id is "${meta.id}"`)
  if (!Array.isArray(meta.sources) || !meta.sources.length) fail(where, 'no sources')
  if (!meta.title) fail(where, 'no title')
  const re = /^```(board|try|sgf)\n([\s\S]*?)^```/gm
  let m, n = 0
  while ((m = re.exec(body))) {
    fences++; n++
    const kind = m[1], p = parseParams(m[2]), tag = `${where} ${kind}#${n}`
    try {
      if (kind === 'board' || kind === 'try') {
        const pos = positionFrom(p)
        const g = new Game(pos.size)
        g.setup({ black: pos.black, white: pos.white })
        if (pos.ko != null) { g.ko = pos.ko; if (g.board[pos.ko]) fail(tag, 'ko point is occupied') }
        const both = pos.black.filter(x => pos.white.includes(x))
        if (both.length) fail(tag, `point ${coordName(both[0], pos.size)} is both black and white`)
        if (p.score) {
          // `score: B+3.5` / `W+6.5` / `jigo` (area count, komi 7.5, no dead stones): the caption's arithmetic, checked by our scorer
          const s = g.score(p.dead ? parseCoords(p.dead, pos.size) : []), got = s.winner === 1 ? `B+${s.margin}` : s.winner === 2 ? `W+${-s.margin}` : 'jigo'
          if (got !== p.score) fail(tag, `score: ${p.score} but the scorer says ${got} (black ${s.black}, white ${s.white})`)
        }
        if (p.life) {
          // `life: A3 alive` — the group at A3 lives even if the attacker moves first; `life: A3 dead` — dead even if the
          // defender moves first; `life: A3 vital B1` — whoever plays B1 first decides it, and no other point does.
          const [stone, claim, vital] = p.life.split(/\s+/)
          const t = parseCoord(stone, pos.size)
          if (!g.board[t]) fail(tag, `life: ${stone} is empty`)
          else {
            const defender = g.board[t], attacker = 3 - defender
            const name = m => m === null ? 'pass' : coordName(m, pos.size)
            const st = (game, turn) => { const r = lifeStatus(game, t, turn); if (r.status === 'unknown') fail(tag, `life: search unknown (${r.reason || 'a ko?'})`); return r }
            if (claim === 'alive') { const r = st(g, attacker); if (r.status !== 'alive') fail(tag, `life: ${stone} alive, but the attacker kills it (${r.line.map(name).join(' ')})`) }
            else if (claim === 'dead') { const r = st(g, defender); if (r.status !== 'dead') fail(tag, `life: ${stone} dead, but the defender lives (${r.line.map(name).join(' ')})`) }
            else if (claim === 'first') {
              const r1 = st(g, attacker), r2 = st(g, defender)
              if (r1.status !== 'dead') fail(tag, `life: ${stone} first, but the attacker moving first does not kill (${r1.status})`)
              if (r2.status !== 'alive') fail(tag, `life: ${stone} first, but the defender moving first does not live (${r2.status})`)
            }
            else if (claim === 'vital' && vital) {
              const v = parseCoord(vital, pos.size)
              const region = lifeStatus(g, t, attacker).region || []
              for (const [who, want] of [[attacker, 'dead'], [defender, 'alive']]) {
                const works = []
                for (const m of region) { if (g.board[m] || !g.check(m, who).ok) continue; const gg = g.clone(); gg.turn = who; gg.play(m); if (gg.board[t] !== defender) { if (want === 'dead') works.push(m); continue } const r = lifeStatus(gg, t, 3 - who); if (r.status === 'unknown') fail(tag, `life: unknown after ${name(m)}`); if (r.status === want) works.push(m) }
                if (!works.includes(v)) fail(tag, `life: vital ${vital}, but ${who === attacker ? 'the attacker' : 'the defender'} playing there does not ${want === 'dead' ? 'kill' : 'live'}`)
                const others = works.filter(m => m !== v)
                if (others.length) fail(tag, `life: vital ${vital}, but ${others.map(name).join(' ')} also ${want === 'dead' ? 'kill(s)' : 'live(s)'} for ${who === attacker ? 'the attacker' : 'the defender'}`)
              }
            } else fail(tag, `life: expected "<stone> alive|dead|first|vital <point>", got "${p.life}"`)
          }
        }
        if (kind === 'try') {
          tries++
          if (!p.solution) { fail(tag, 'no solution'); continue }
          const tree = parseSolution(p.solution, pos.size)
          if (!tree.children.length) { fail(tag, 'empty solution'); continue }
          // walk every line: alternate reader / opponent, every move legal, every line ends on a reader move
          const walk = (node, game, depth) => {
            if (!node.children.length) {
              if (depth % 2 === 0) fail(tag, `line ends on an opponent move (${depth} plies)`)
              if (p.expect === 'capture' && !game.history[game.history.length - 1].captured.length) fail(tag, 'expect: capture, but the last reader move captures nothing')
              return
            }
            for (const c of node.children) {
              const gg = game.clone()
              const r = gg.check(c.point)
              if (!r.ok) { fail(tag, `illegal ${depth % 2 === 0 ? 'reader' : 'opponent'} move ${coordName(c.point, pos.size)} at ply ${depth + 1}: ${r.reason}`); continue }
              gg.play(c.point)
              walk(c, gg, depth + 1)
            }
          }
          g.turn = pos.turn
          walk(tree, g, 0)
          if (p.expect === 'kill' || p.expect === 'escape') {
            // the capture-search oracle: after the reader's first move the target chain cannot escape (kill) / cannot be caught (escape);
            // for `kill`, every other first move must fail (uniqueness); for `escape`, only when `unique: true`
            if (!p.target) { fail(tag, `expect: ${p.expect} needs target: <a stone of the chain>`); continue }
            // `target: move` means the stone the reader just played (cutting problems)
            const fixed = p.target === 'move' ? null : parseCoord(p.target, pos.size)
            if (fixed != null && !g.board[fixed]) fail(tag, `target ${p.target} is empty`)
            const so = p.quiet != null ? { quiet: +p.quiet } : {} // `quiet: 0` — the attacker may only atari (no net move), for problems whose answer is a direct atari
            const works = m => { const target = fixed ?? m; const h = g.clone(); h.play(m); if (!h.group(target)) return p.expect === 'kill'; return p.expect === 'kill' ? !canEscape(h, target, so).escaped : !canCapture(h, target, so).captured }
            const answers = new Set(tree.children.map(c => c.point))
            for (const a of answers) if (!works(a)) fail(tag, `expect: ${p.expect}, but after ${coordName(a, pos.size)} the chain at ${p.target} ${p.expect === 'kill' ? 'can escape' : 'can be captured'}`)
            if (p.expect === 'kill' || p.unique === 'true') {
              const others = g.legalMoves().filter(m => !answers.has(m) && works(m))
              if (others.length) fail(tag, `expect: ${p.expect}, but ${others.map(m => coordName(m, pos.size)).join(' ')} also work(s)`)
            }
          }
          if (p.refute && p.expect !== 'seki') {
            // `refute: A1 C4` — moves the prose says fail must fail: no immediate capture, and (with a target) the chain escapes / is caught
            if (!p.target || p.target === 'move') fail(tag, 'refute: needs target: <a stone>')
            else {
              const target = parseCoord(p.target, pos.size)
              for (const m of parseCoords(p.refute, pos.size)) {
                const h = g.clone(); const r = h.check(m)
                if (!r.ok) { fail(tag, `refute: ${coordName(m, pos.size)} is not even legal (${r.reason})`); continue }
                h.play(m)
                if (r.captures.length && r.captures.includes(target)) { fail(tag, `refute: ${coordName(m, pos.size)} captures the target outright`); continue }
                const stillThere = !!h.group(target)
                const so = p.quiet != null ? { quiet: +p.quiet } : {}
                const bad = p.expect === 'escape' ? (stillThere && !canCapture(h, target, so).captured) : (stillThere && !canEscape(h, target, so).escaped)
                if (bad) fail(tag, `refute: ${coordName(m, pos.size)} works too (the chain at ${p.target} ${p.expect === 'escape' ? 'is safe' : 'cannot escape'})`)
              }
            }
          }
          if (p.safe) {
            // `safe: A2` — after every reader move of every line, the reader's chain at A2 must not be capturable (the oracle aimed at our own stones)
            const safePt = parseCoord(p.safe, pos.size)
            if (!g.board[safePt]) fail(tag, `safe: ${p.safe} is empty`)
            const walk = (node, game, depth) => {
              for (const c of node.children) {
                const gg = game.clone(); if (!gg.check(c.point).ok) continue; gg.play(c.point)
                if (depth % 2 === 0 && gg.group(safePt) && canCapture(gg, safePt).captured) fail(tag, `safe: after ${coordName(c.point, pos.size)} the chain at ${p.safe} can be captured`)
                if (depth % 2 === 0 && !gg.group(safePt)) fail(tag, `safe: ${p.safe} is gone after ${coordName(c.point, pos.size)}`)
                walk(c, gg, depth + 1)
              }
            }
            const g2 = g.clone(); g2.turn = pos.turn; walk(tree, g2, 0)
          }
          if (p.expect === 'live' || p.expect === 'dead') {
            // the life-and-death oracle (js/rules/life-search.js): reads the target's eye space to the end.
            // `dead`: the reader attacks — before the move the group would live if it moved first; after every reader
            // move in the tree it is dead; no other first move kills. `live`: the mirror image. `unique: false` waives
            // the uniqueness check. An `unknown` (ko, or too big a region) is a failure: problems must read out.
            if (!p.target) { fail(tag, `expect: ${p.expect} needs target: <a stone of the group>`); continue }
            const target = parseCoord(p.target, pos.size)
            if (!g.board[target]) { fail(tag, `target: ${p.target} is empty`); continue }
            const defender = g.board[target], attacker = 3 - defender
            const reader = p.expect === 'dead' ? attacker : defender
            if (pos.turn !== reader) fail(tag, `expect: ${p.expect}, but it is ${reader === attacker ? 'the defender' : 'the attacker'} to move`)
            const name = m => m === null ? 'pass' : coordName(m, pos.size)
            const st = (game, turn) => { const r = lifeStatus(game, target, turn); if (r.status === 'unknown') fail(tag, `life search: unknown (${r.reason || (r.complete ? 'too deep, a ko?' : 'node limit')}) with ${turn === attacker ? 'the attacker' : 'the defender'} to move`); return r }
            // it must be a problem: the side not to move would get the opposite result
            const before = st(g, 3 - reader)
            if (before.status !== (p.expect === 'dead' ? 'alive' : 'dead')) fail(tag, `expect: ${p.expect}, but if the opponent moved first the group would already be ${before.status} (not a problem)`)
            // after every reader move in the tree, the status the prose claims
            const walk = (node, game, depth) => {
              for (const c of node.children) {
                const gg = game.clone(); if (!gg.check(c.point).ok) continue; gg.play(c.point)
                if (depth % 2 === 0 && gg.board[target] === defender) {
                  const r = st(gg, 3 - reader)
                  if (r.status !== p.expect.replace('live', 'alive')) fail(tag, `expect: ${p.expect}, but after ${name(c.point)} the group is ${r.status}${r.line.length ? ' (' + r.line.map(name).join(' ') + ')' : ''}`)
                } else if (depth % 2 === 0 && p.expect === 'live') fail(tag, `expect: live, but after ${name(c.point)} the target stone is gone`)
                walk(c, gg, depth + 1)
              }
            }
            const g2 = g.clone(); g2.turn = pos.turn; walk(tree, g2, 0)
            if (p.unique !== 'false') {
              const answers = new Set(tree.children.map(c => c.point))
              const region = before.region || []
              const others = []
              for (const m of [...region.filter(q => !g.board[q]), null]) {
                if (answers.has(m) || (m !== null && !g.check(m).ok)) continue
                const gg = g.clone(); gg.play(m)
                if (m !== null && gg.board[target] !== defender) { if (p.expect === 'dead') others.push(m); continue }
                const r = lifeStatus(gg, target, 3 - reader)
                if (r.status === p.expect.replace('live', 'alive')) others.push(m)
                else if (r.status === 'unknown') fail(tag, `life search: unknown after the alternative ${name(m)} (a ko?)`)
              }
              if (others.length) fail(tag, `expect: ${p.expect}, but ${others.map(name).join(' ')} also work(s)`)
            }
          }
          if (p.expect === 'seki') {
            // `expect: seki` with `target: A2 B1` (one stone of each side): neither chain can be killed whoever moves first;
            // after every reader move in the tree that is still true; `refute:` moves (the reader filling a liberty) leave the
            // reader's own chain dead. The solution is usually `pass`.
            const ts = parseCoords(p.target || '', pos.size)
            if (ts.length !== 2 || !g.board[ts[0]] || !g.board[ts[1]] || g.board[ts[0]] === g.board[ts[1]]) { fail(tag, 'expect: seki needs target: <a stone of each colour>'); continue }
            const name = m => m === null ? 'pass' : coordName(m, pos.size)
            const alive = (game, t) => { const r = lifeStatus(game, t, 3 - game.board[t]); if (r.status === 'unknown') fail(tag, `seki: search unknown for ${name(t)}`); return r }
            for (const t of ts) { const r = alive(g, t); if (r.status !== 'alive') fail(tag, `expect: seki, but the chain at ${name(t)} is ${r.status} (${r.line.map(name).join(' ')})`) }
            const walk = (node, game, depth) => {
              for (const c of node.children) {
                const gg = game.clone(); if (!gg.check(c.point).ok) continue; gg.play(c.point)
                if (depth % 2 === 0) for (const t of ts) { if (gg.board[t] !== g.board[t]) fail(tag, `seki: after ${name(c.point)} the chain at ${name(t)} is gone`); else if (alive(gg, t).status !== 'alive') fail(tag, `seki: after ${name(c.point)} the chain at ${name(t)} can be killed`) }
                walk(c, gg, depth + 1)
              }
            }
            const g2 = g.clone(); g2.turn = pos.turn; walk(tree, g2, 0)
            // `refute: A1 E1 A2/pass/E1` — each entry is a reader move, or a line reader/opponent/reader… separated by "/",
            // after which the reader's own chain must be dead
            const mine = ts.find(t => g.board[t] === pos.turn)
            for (const entry of String(p.refute || '').split(/\s+/).filter(Boolean)) {
              const line = entry.split('/').map(c => c.toLowerCase() === 'pass' ? null : parseCoord(c, pos.size))
              const gg = g.clone(); gg.turn = pos.turn
              let bad = false
              for (const m of line) { const r = gg.check(m); if (!r.ok) { fail(tag, `refute: ${entry}: ${name(m)} is not legal (${r.reason})`); bad = true; break } gg.play(m) }
              if (bad) continue
              if (line.length % 2 === 0) { fail(tag, `refute: ${entry} must end on a reader move`); continue }
              if (gg.board[mine] !== pos.turn) continue   // already captured: refuted
              const st = lifeStatus(gg, mine, 3 - pos.turn)
              if (st.status !== 'dead') fail(tag, `refute: after ${entry} the reader's chain is ${st.status}, not dead`)
            }
          }
          if (p.expect === 'capture') {
            // the capturing move must be unique: any other legal capture is an ambiguous problem
            const answers = new Set(tree.children.map(c => c.point))
            const others = g.legalMoves().filter(m => !answers.has(m) && g.check(m).captures.length)
            if (others.length) fail(tag, `expect: capture, but ${others.map(m => coordName(m, pos.size)).join(' ')} also capture(s)`)
          }
        }
      } else if (kind === 'sgf') {
        const text = p.file ? readFileSync(join(root, 'content/games', p.file), 'utf8') : p.rest
        const game = loadSgf(text)
        if (!game.moves.some(x => x.color)) fail(tag, 'SGF has no moves')
      }
    } catch (e) { fail(tag, e.message) }
  }
}
let sgfs = 0
for (const f of readdirSync(join(root, 'content/games')).filter(f => f.endsWith('.sgf'))) {
  sgfs++
  try { const g = loadSgf(readFileSync(join(root, 'content/games', f), 'utf8')); if (!g.moves.some(x => x.color)) fail(f, 'no moves') } catch (e) { fail(f, e.message) }
}
console.log(`${sgfs} game records; ${lessons} lessons, ${fences} fences, ${tries} problems checked; ${problems} problem(s)`)
process.exit(problems ? 1 : 0)
