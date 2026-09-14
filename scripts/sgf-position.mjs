#!/usr/bin/env node
// Authoring helper: print the position after move N of an SGF file (node 0 is the root, so N = the move number) as fence lines.
//   node scripts/sgf-position.mjs content/games/x.sgf 12
import { readFileSync } from 'node:fs'
import { loadSgf } from '../js/sgf.js'
import { coordName, BLACK, WHITE } from '../js/rules/go.js'
const [file, n] = process.argv.slice(2)
const g = loadSgf(readFileSync(file, 'utf8'))
const pos = g.positions[+n]
const size = g.size
const list = c => { const out = []; for (let i = 0; i < pos.board.length; i++) if (pos.board[i] === c) out.push(coordName(i, size)); return out.join(' ') }
console.log(`size: ${size}\nblack: ${list(BLACK)}\nwhite: ${list(WHITE)}\nturn: ${pos.turn === BLACK ? 'b' : 'w'}\nlast: ${g.moves[+n] && g.moves[+n].color ? coordName(g.moves[+n].point, size) : '-'}\nnext: ${g.moves[+n + 1] ? coordName(g.moves[+n + 1].point, size) : '-'}`)
