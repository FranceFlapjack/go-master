# Roadmap

Status: **Phase 0 scaffold, draft 1, 2026-09-13; *First steps* track complete the same day (6 lessons, 17 problems, one verified game record).** Rules engine (33 checks), SVG board, lesson renderer with `board` / `sgf` / `try` fences, exercises with solution trees, territory painting, progress + activity grid, two-player play page with area counting. *Capturing techniques* complete the same day (7 lessons, 25 problems) with a ladder/net reader as the checker's oracle. Design draft 2 (dark red), a 9×9 computer opponent and *Life and death* (6 lessons, 32 problems, with an exhaustive life-and-death reader as oracle) on 2026-09-14. Next: *The opening*.

## Decisions taken in the draft (say so if you want them changed)

- **Scoring: area (Chinese), komi 7.5.** No prisoner bookkeeping, no agreement needed beyond "which stones are dead", so a beginner can count any finished game. Japanese territory counting is explained in the *counting* lesson as what they will meet on some servers; the winner is the same in all but rare cases.
- **Ko: simple ko only.** A stone that captured exactly one stone and now has exactly one liberty may not be retaken at once. Positional superko (no repetition of any earlier whole-board position) is a later addition to `js/rules/go.js`; triple ko is rare enough to wait.
- **SGF, tree-native.** The parser keeps every variation; the viewer walks the main line for now. Puzzles are trees from day one (`solution: E3 (D2 E2) (C2 D1)`), because tsumego are trees.
- **Narrow oracles, not an engine.** The scorer checks counted diagrams; a small ladder/net reader checks kill/escape problems; everything else is read by hand (see CLAUDE.md, Oracles). This is the one place where the Chess Master method does not transfer.
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
- ~~Paint the counted territory~~ done: `Goban.paintTerritory`, used by `territory: true` diagrams and the play page at game end.
- Variation navigation in the viewer (branches as a small list under the move; keyboard `v`).
- Handicap placement helper (`HA[]` + free placement) in the rules and the play page.
- Mobile polish; a dark mode is not planned until Chess Master has one.

## Phase 1 — Content
Write the tracks in this order, one branch each, running both checkers on every commit:
1. **First steps** (6) — **done 2026-09-13**: board and stones, liberties and capture (7 problems), ko (3, incl. a threat-then-retake tree with a `ko:` set-up point), two eyes (4), how a game ends and is counted (2, every diagram's count asserted by the scorer), reading a game record (AlphaGo – Lee Sedol game 4, record from A. Brouwer's archive checked against Wikipedia; comments ours).
2. **Capturing techniques** (7) — **done 2026-09-13**: ladder (4 problems incl. a 13×13 read and an escape), net (3), snapback (3), shortage of liberties (3), connecting and cutting (3), capturing races (3), and a mixed problem set (6). The planned *throw-in* lesson was dropped: every beginner-level throw-in shape collapses into a snapback or a ko, so the throw-in is mentioned inside *races* and left for the endgame track. `js/rules/capture-search.js` (ladders, nets, escapes) is the checker's oracle for this track; races and shortage positions were read by hand.
3. **Life and death** (6) — **done 2026-09-14**: eye shapes (6 problems), false eyes (5), seki (4), life in the corner (5), two problem sets (6 + 6, one on 13×13). All positions composed (no classical problems: none could be verified against a source from here); every one read to the end by `js/rules/life-search.js` (Benson's pass-alive test plus an exhaustive eye-space search), which also proves uniqueness. Limits: closed walls only, no ko (reported as unknown). Classical collections (*Xuanxuan Qijing*, *Igo Hatsuyōron*) remain an option once a diagram source can be checked.
4. **The opening** (6): corners → sides → centre, 4-4 and 3-4, enclosures and approaches, extensions, the 9×9 opening, handicap go. Model games needed: professional records whose SGF comes from a checkable source.
5. **Joseki** (5): a small set, why each move, when to leave. Kogo's Joseki Dictionary is freely distributable for non-commercial use — check the exact terms before quoting lines from it.
6. **Direction of play** (7), **The endgame** (4).
7. **Study a whole game** (3): Shusaku's ear-reddening game (Gennan Inseki – Shusaku, 1846), Go Seigen – Honinbo Shusai (1933, the "game of the century"), Lee Sedol – AlphaGo game 4 (2016, move 78). Records are public facts; each SGF must be checked against a published record and its origin written into the file.

Open questions for the owner: which board size they want to start playing on for real (9×9 is the recommendation); whether they have or want an OGS / KGS account (both allow bots and have public game records).

## Phase 2 — Exercises & review
- Daily problem review (spaced repetition over solved/failed problems), same design as planned for Chess Master.
- Problem sets by rank (30k → 10k) once the life-and-death track has enough material.

## Phase 3 — Design drafts
- Draft 1 (2026-09-13): the Chess Master language, kaya board, slate and shell stones.
- Draft 2 (2026-09-13, owner's first comment): the accent is dark red `#6f0b10` — Chess Master's green turned to red, then one step redder at the owner's comment (HSL 357° 82% 24%; the exact-tone match `#4d0f14` read as brown), so the two apps are siblings in different colours. Board good/bad marks stay green/red (meaning, not theme); the hint tint and the activity grid follow the accent.
- Still open: stone rendering (flat as now, or a subtle radial highlight); whether coordinates show on lesson diagrams by default.

## Play mode & a computer opponent (later, and honestly)

Chess Master could vendor Stockfish and write its own engine to a respectable strength because chess yields to hand-written search and evaluation. **Go does not**: before neural networks, the strongest hand-written programs were weak club players, and the strong open-source engine (KataGo) is a large neural network with a heavy runtime. What is realistic here, in order:

1. **Two players on one screen** — done in the draft.
2. **A small Monte-Carlo (MCTS) bot on 9×9** in a Web Worker, written by us — **done 2026-09-14** (`js/bot/`). What the tests show: it never plays an illegal move or fills its own eye, wins a one-liberty capturing race, does not pass while behind, passes to end the game when ahead, passes at once when a pass wins on the count, ends a game against itself by two passes with the board far from full, and beats a random player that never passes (8 games). What they do not show: any rank. It has no patterns and no opening knowledge; expect it to lose to anyone who has done the capturing track, and to play slack moves in the opening. Levels are thinking time (0.5 / 1.5 / 4 s), not strength claims. Possible next steps, in order of value: RAVE/AMAF in the tree, a few 3×3 playout patterns, a small opening book of 9×9 first moves.
3. **A stronger opponent** only by vendoring a real engine; **check what actually exists, its size and licence, before promising anything** (a GnuGo WebAssembly build, or a small KataGo network with an ONNX/WebGPU runtime, are the two candidates to investigate; neither is assumed viable until tried).
4. **Online play** needs a server or an OGS account; decide then.

There will be no Elo ladder claim until there is something to measure it against.

## Non-goals (for now)
- Accounts / cloud sync. Progress is local.
- A build step or framework.
- Japanese rules in the engine (territory scoring with prisoners) — explained in a lesson, not implemented.
