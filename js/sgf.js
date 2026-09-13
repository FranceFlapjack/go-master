// SGF (Smart Game Format) parser. SGF is a tree: every node may branch, and tsumego are trees,
// so the parser keeps the whole tree; `mainLine` walks the first child at every branch.
// Also parses the lesson "solution tree" syntax used by `try` fences: "E3 (D2 E2) (C2 D1)".
import { Game, BLACK, WHITE, parseSgfCoord, parseCoord } from './rules/go.js'

/** parse an SGF collection; returns the first game tree as {props, children:[…]} nodes */
export function parseSgf(text) {
  let i = 0
  const n = text.length
  const skipWs = () => { while (i < n && /\s/.test(text[i])) i++ }
  function parseTree() {
    skipWs()
    if (text[i] !== '(') throw new Error(`SGF: expected "(" at ${i}`)
    i++
    const nodes = []
    skipWs()
    while (text[i] === ';') { i++; nodes.push(parseNode()); skipWs() }
    if (!nodes.length) throw new Error(`SGF: empty variation at ${i}`)
    const children = []
    while (text[i] === '(') { children.push(parseTree()); skipWs() }
    if (text[i] !== ')') throw new Error(`SGF: expected ")" at ${i}`)
    i++
    // chain the sequence: each node's only child is the next; the last takes the variations
    for (let k = 0; k < nodes.length - 1; k++) nodes[k].children = [nodes[k + 1]]
    nodes[nodes.length - 1].children = children
    return nodes[0]
  }
  function parseNode() {
    const props = {}
    skipWs()
    while (i < n && /[A-Za-z]/.test(text[i])) {
      let id = ''
      while (/[A-Za-z]/.test(text[i])) id += text[i++]
      id = id.replace(/[a-z]/g, '') // old-style lowercase letters are ignored
      const vals = []
      skipWs()
      while (text[i] === '[') {
        i++; let v = ''
        while (i < n && text[i] !== ']') { if (text[i] === '\\') { i++ } v += text[i++] }
        i++; vals.push(v); skipWs()
      }
      props[id] = (props[id] || []).concat(vals)
    }
    return { props, children: [] }
  }
  const root = parseTree()
  return root
}

/** the first child at every branch, as an array of nodes */
export function mainLine(root) { const out = []; let n = root; while (n) { out.push(n); n = n.children[0] } return out }

/** Turn an SGF tree into what the viewer needs: headers, size, and the main line as
 *  [{color, point, comment, setup}] with a Game position after each node. */
export function loadSgf(text) {
  const root = parseSgf(text)
  const p = root.props
  const size = +(p.SZ && p.SZ[0]) || 19
  const komi = p.KM ? parseFloat(p.KM[0]) : 7.5
  const headers = { black: one(p.PB), white: one(p.PW), blackRank: one(p.BR), whiteRank: one(p.WR), event: one(p.EV), date: one(p.DT), result: one(p.RE), place: one(p.PC), komi: one(p.KM), handicap: one(p.HA), name: one(p.GN), source: one(p.SO) }
  const game = new Game(size, { komi })
  const nodes = mainLine(root)
  const positions = [] // one per node: the board *after* the node
  const moves = []
  for (const node of nodes) {
    const q = node.props
    const setup = { black: (q.AB || []).flatMap(v => expand(v, size)), white: (q.AW || []).flatMap(v => expand(v, size)) }
    if (setup.black.length || setup.white.length) game.setup(setup)
    let color = null, point = null
    if (q.B) { color = BLACK; point = parseSgfCoord(q.B[0], size) }
    else if (q.W) { color = WHITE; point = parseSgfCoord(q.W[0], size) }
    if (color) game.play(point, color)
    if (q.PL) game.turn = q.PL[0].toUpperCase() === 'W' ? WHITE : BLACK
    moves.push({ color, point, comment: one(q.C), setup, captured: color ? game.history[game.history.length - 1].captured : [] })
    positions.push(game.clone())
  }
  return { root, headers, size, komi, moves, positions }
}
const one = v => (v && v[0]) || ''
/** SGF point lists may be compressed rectangles "aa:cc" */
function expand(v, size) {
  const m = v.match(/^(\w\w):(\w\w)$/)
  if (!m) return [parseSgfCoord(v, size)]
  const a = parseSgfCoord(m[1], size), b = parseSgfCoord(m[2], size)
  const x0 = a % size, y0 = Math.floor(a / size), x1 = b % size, y1 = Math.floor(b / size)
  const out = []
  for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) out.push(y * size + x)
  return out
}

// --- solution trees for puzzles --------------------------------------------------
// "E3 (D2 E2) (C2 D1)" → reader E3; then the opponent answers D2 (reader E2) or C2 (reader D1).
// Moves alternate reader / opponent from the root. Several branches at a reader node are all
// accepted as correct; at an opponent node the first branch is the reply that gets played.
// "pass" is a move. Returns {children:[{point, children}]} with points as indexes.
export function parseSolution(text, size) {
  const toks = String(text).replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').split(/\s+/).filter(Boolean)
  let i = 0
  function seq() {
    const first = { children: [] }
    let cur = first
    while (i < toks.length && toks[i] !== ')' && toks[i] !== '(') {
      const node = { point: parseCoord(toks[i++], size), children: [] }
      cur.children.push(node); cur = node
    }
    while (i < toks.length && toks[i] === '(') {
      i++
      const branch = seq()
      cur.children.push(...branch.children)
      if (toks[i] !== ')') throw new Error('Solution: missing ")"')
      i++
    }
    return first
  }
  const root = seq()
  if (i < toks.length) throw new Error('Solution: unexpected ")"')
  return root
}
/** all root-to-leaf lines of a solution tree, as arrays of points (for checkers and "show solution") */
export function solutionLines(root) {
  const out = []
  const walk = (node, path) => { if (!node.children.length) { if (path.length) out.push(path) } else for (const c of node.children) walk(c, path.concat([c.point])) }
  walk(root, [])
  return out
}
