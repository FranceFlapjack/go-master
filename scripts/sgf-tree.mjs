#!/usr/bin/env node
// Authoring helper: walk an SGF tree by a move path and list the children of the node reached.
//   node scripts/sgf-tree.mjs file.sgf "Q16 O17 Q14"   (coordinates on the file's board; passes as "pass")
// Prints each child's move, its number of descendants, and the first 160 characters of its comment (for reading, not copying).
import { readFileSync } from 'node:fs'
import { parseSgf } from '../js/sgf.js'
import { coordName, parseCoord, sgfCoord, parseSgfCoord } from '../js/rules/go.js'
const [file, path = ''] = process.argv.slice(2)
const root = parseSgf(readFileSync(file, 'utf8'))
const size = +(root.props.SZ && root.props.SZ[0]) || 19
const moveOf = n => n.props.B ? ['B', n.props.B[0]] : n.props.W ? ['W', n.props.W[0]] : null
const count = n => 1 + n.children.reduce((a, c) => a + count(c), 0)
let node = root
for (const c of path.split(/\s+/).filter(Boolean)) {
  const want = c.toLowerCase() === 'pass' ? '' : sgfCoord(parseCoord(c, size), size)
  const next = node.children.find(ch => { const m = moveOf(ch); return m && m[1] === want })
  if (!next) { console.log(`no child ${c} at this node; children: ${node.children.map(ch => { const m = moveOf(ch); return m ? m[0] + coordName(parseSgfCoord(m[1], size), size) : '(setup)' }).join(' ')}`); process.exit(1) }
  node = next
}
const own = node.props.C ? node.props.C[0].replace(/\s+/g, ' ').slice(0, 300) : ''
if (own) console.log('this node:', own)
for (const ch of node.children) {
  const m = moveOf(ch)
  const label = m ? m[0] + ' ' + coordName(parseSgfCoord(m[1], size), size) : '(no move)'
  const c = ch.props.C ? ch.props.C[0].replace(/\s+/g, ' ').slice(0, 160) : ''
  console.log(`${label}  [${count(ch)} nodes]  ${c}`)
}
