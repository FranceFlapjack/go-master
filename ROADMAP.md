# Roadmap

Status: **Phase 0 scaffold, draft 1, 2026-09-13.** Rules engine (33 checks), SVG board, lesson renderer with `board` / `sgf` / `try` fences, exercises with solution trees, progress + activity grid, two-player play page with area counting, and the first two lessons of the beginner track. Next: the owner's comments on the draft, then the rest of *First steps*.

## Decisions taken in the draft (say so if you want them changed)

- **Scoring: area (Chinese), komi 7.5.** No prisoner bookkeeping, no agreement needed beyond "which stones are dead", so a beginner can count any finished game. Japanese territory counting is explained in the *counting* lesson as what they will meet on some servers; the winner is the same in all but rare cases.
- **Ko: simple ko only.** A stone that captured exactly one stone and now has exactly one liberty may not be retaken at once. Positional superko (no repetition of any earlier whole-board position) is a later addition to `js/rules/go.js`; triple ko is rare enough to wait.
- **SGF, tree-native.** The parser keeps every variation; the viewer walks the main line for now. Puzzles are trees from day one (`solution: E3 (D2 E2) (C2 D1)`), because tsumego are trees.
- **No engine oracle.** Puzzles are authored and read, not engine-verified (see CLAUDE.md). This is the one place where the Chess Master method does not transfer.
- **Coordinates: `A1`…`T19`, no I.** What servers and books use. SGF's `aa` style stays inside SGF files.
- **Board sizes are the beginner's ladder:** *First steps* is 9×9 throughout, then 13×13 appears in the capturing and life-and-death tracks, 19×19 from the opening track on.

## Phase 0 — Scaffold (draft 1 done 2026-09-13)
- Shell, sidebar curriculum with progress, hash router, home page (copied from Chess Master, renamed, storage keys under `go-master.`).
- `js/rules/go.js`: chains, liberties, capture, suicide, simple ko, passes, area scoring with dead stones; `scripts/rules-test.mjs` covers capture in the middle, all four corners and the edge, chains, suicide and the capturing exception, ko set / refused / released / retaken, multi-stone capture never a ko, passes and undo, scoring and neutral regions, dead stones.
- `js/goban.js`: SVG board for any size, star points, coordinates, stones with a small appear/capture animation, last-move mark, triangle/square/X marks, letter labels, highlight, ghost stone on hover, illegal-move flash, shake, synthesised sounds (stone, capture, pass).
- `js/sgf.js` + `js/sgf-viewer.js`: SGF parser (tree), main-line viewer with comments, captures count, keyboard navigation.
- `js/exercise.js`: solution trees, hint after two misses, reset, show solution.
- `js/play.js`: two players on one screen; pass, undo, resign; dead-stone marking and the area count after two passes.
- Two lessons: *The board and the stones*, *Liberties and capture* (7 problems).
- `scripts/check-content.mjs` validates positions and solution trees.

### Still to do in Phase 0
- Paint the counted territory on the play board at game end: `score()` already returns an `owner` array per point; showing it is how a beginner learns to count.
- Variation navigation in the viewer (branches as a small list under the move; keyboard `v`).
- Handicap placement helper (`HA[]` + free placement) in the rules and the play page.
- Mobile polish; a dark mode is not planned until Chess Master has one.

## Phase 1 — Content
Write the tracks in this order, one branch each, running both checkers on every commit:
1. **First steps** (6): board and stones ✔, liberties and capture ✔, ko, two eyes (why a group with two eyes cannot be captured, false eyes very briefly), how a game ends and is counted (area count with a full 9×9 example, dead stones, Japanese counting in one paragraph), reading a game record (the viewer, a short real 9×9 game).
2. **Capturing techniques** (7): ladder (incl. ladder breakers and reading a ladder to the edge), net, snapback, throw-in, shortage of liberties, connecting and cutting, capturing races. 9×9 and 13×13.
3. **Life and death** (6): eye shapes (straight three/four, bent four, the bulky five), false eyes, seki, corner shapes, two problem sets. Classical sources for problems: *Xuanxuan Qijing* (1349) and *Igo Hatsuyōron* (1713) are out of copyright.
4. **The opening** (6): corners → sides → centre, 4-4 and 3-4, enclosures and approaches, extensions, the 9×9 opening, handicap go. Model games needed: professional records whose SGF comes from a checkable source.
5. **Joseki** (5): a small set, why each move, when to leave. Kogo's Joseki Dictionary is freely distributable for non-commercial use — check the exact terms before quoting lines from it.
6. **Direction of play** (7), **The endgame** (4).
7. **Study a whole game** (3): Shusaku's ear-reddening game (Gennan Inseki – Shusaku, 1846), Go Seigen – Honinbo Shusai (1933, the "game of the century"), Lee Sedol – AlphaGo game 4 (2016, move 78). Records are public facts; each SGF must be checked against a published record and its origin written into the file.

Open questions for the owner: which board size they want to start playing on for real (9×9 is the recommendation); whether they have or want an OGS / KGS account (both allow bots and have public game records).

## Phase 2 — Exercises & review
- Daily problem review (spaced repetition over solved/failed problems), same design as planned for Chess Master.
- Problem sets by rank (30k → 10k) once the life-and-death track has enough material.

## Phase 3 — Design drafts
- Draft 1 (2026-09-13): the Chess Master language, kaya board, slate and shell stones. Owner comments next.
- Candidates for the owner to decide: a distinct accent colour for Go (indigo, vermilion) versus the shared green; stone rendering (flat as now, or a subtle radial highlight); whether coordinates show on lesson diagrams by default.

## Play mode & a computer opponent (later, and honestly)

Chess Master could vendor Stockfish and write its own engine to a respectable strength because chess yields to hand-written search and evaluation. **Go does not**: before neural networks, the strongest hand-written programs were weak club players, and the strong open-source engine (KataGo) is a large neural network with a heavy runtime. What is realistic here, in order:

1. **Two players on one screen** — done in the draft.
2. **A small Monte-Carlo (MCTS) bot on 9×9** in a Web Worker, written by us. Beats a beginner, loses to anyone who has read the capturing track. Good as the first rung and as a teaching aid ("play the bot after each lesson").
3. **A stronger opponent** only by vendoring a real engine; **check what actually exists, its size and licence, before promising anything** (a GnuGo WebAssembly build, or a small KataGo network with an ONNX/WebGPU runtime, are the two candidates to investigate; neither is assumed viable until tried).
4. **Online play** needs a server or an OGS account; decide then.

There will be no Elo ladder claim until there is something to measure it against.

## Non-goals (for now)
- Accounts / cloud sync. Progress is local.
- A build step or framework.
- Japanese rules in the engine (territory scoring with prisoners) — explained in a lesson, not implemented.
