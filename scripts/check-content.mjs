#!/usr/bin/env node
// Content checker: every ready lesson exists, has sources, and every board / try / sgf fence is a legal position
// with a legal solution tree. Run before every commit. Exit code 1 on any failure.
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseFrontmatter, parseParams } from '../js/frontmatter.js'
import { positionFrom } from '../js/position.js'
import { parseSolution, loadSgf } from '../js/sgf.js'
import { Game, coordName } from '../js/rules/go.js'

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
        const both = pos.black.filter(x => pos.white.includes(x))
        if (both.length) fail(tag, `point ${coordName(both[0], pos.size)} is both black and white`)
        if (p.score) {
          // `score: B+3.5` / `W+6.5` / `jigo` (area count, komi 7.5, no dead stones): the caption's arithmetic, checked by our scorer
          const s = g.score(), got = s.winner === 1 ? `B+${s.margin}` : s.winner === 2 ? `W+${-s.margin}` : 'jigo'
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
