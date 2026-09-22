// Pull `try` fences out of a lesson's Markdown, in the order the lesson shows them — the same order
// `js/lesson.js` mounts them in, so the nth fence here is the problem with id `<track>/<slug>#<n>`.
// Pure (no DOM), shared with scripts/. See js/review.js, which fetches a lesson to re-show one problem.
import { parseParams } from './frontmatter.js'

const FENCE = /^```try[ \t]*\r?\n([\s\S]*?)\r?\n```[ \t]*$/gm

/** every `try` fence of a lesson, parsed, in order */
export function tryFences(md) {
  const out = []
  FENCE.lastIndex = 0
  let m
  while ((m = FENCE.exec(md))) out.push(parseParams(m[1]))
  return out
}
/** the nth `try` fence (0-based), or null */
export function tryFence(md, index) { return tryFences(md)[index] || null }
