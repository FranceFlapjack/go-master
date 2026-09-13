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
            const works = m => { const target = fixed ?? m; const h = g.clone(); h.play(m); if (!h.group(target)) return p.expect === 'kill'; return p.expect === 'kill' ? !canEscape(h, target).escaped : !canCapture(h, target).captured }
            const answers = new Set(tree.children.map(c => c.point))
            for (const a of answers) if (!works(a)) fail(tag, `expect: ${p.expect}, but after ${coordName(a, pos.size)} the chain at ${p.target} ${p.expect === 'kill' ? 'can escape' : 'can be captured'}`)
            if (p.expect === 'kill' || p.unique === 'true') {
              const others = g.legalMoves().filter(m => !answers.has(m) && works(m))
              if (others.length) fail(tag, `expect: ${p.expect}, but ${others.map(m => coordName(m, pos.size)).join(' ')} also work(s)`)
            }
          }
          if (p.refute) {
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
                const bad = p.expect === 'escape' ? (stillThere && !canCapture(h, target).captured) : (stillThere && !canEscape(h, target).escaped)
                if (bad) fail(tag, `refute: ${coordName(m, pos.size)} works too (the chain at ${p.target} ${p.expect === 'escape' ? 'is safe' : 'cannot escape'})`)
              }
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
