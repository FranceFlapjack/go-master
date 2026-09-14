// The position a lesson fence describes: size, stones, side to move, marks and labels.
import { MARK } from './goban.js'
import { parseCoords, parseCoord, handicapPoints, BLACK, WHITE } from './rules/go.js'

/** the position described by a fence: size, stones, side to move, marks and labels */
export function positionFrom(p) {
  const size = +p.size || 9
  const pos = {
    size,
    black: parseCoords(p.black, size), white: parseCoords(p.white, size),
    turn: p.turn ? (p.turn[0].toLowerCase() === 'w' ? WHITE : BLACK) : (+p.handicap >= 2 ? WHITE : BLACK), // handicap: White moves first
    marks: {}, labels: {},
    ko: p.ko ? parseCoord(p.ko, size) : null, // a pending ko point, for problems posed mid-ko
  }
  if (+p.handicap >= 2) pos.black = [...new Set([...handicapPoints(size, +p.handicap), ...pos.black])] // `handicap: 4` places the stones
  for (const t of ['last', 'tri', 'sq', 'x']) if (p[t]) pos.marks[MARK[t]] = parseCoords(p[t], size)
  if (p.highlight) pos.marks[MARK.hint] = parseCoords(p.highlight, size) // `hint:` is the puzzle's text hint
  if (p.labels) for (const part of p.labels.split(',')) { const [c, l] = part.split('='); if (c && l) pos.labels[parseCoord(c.trim(), size)] = l.trim() }
  return pos
}

