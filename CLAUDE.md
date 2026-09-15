# Go Master

A Go course as a website, sibling of Chess Master (`../chess-master`, same owner, same shell, same design language): lessons built on real games and real books, with an interactive board inside the text. Play modes (two players on one screen now; a computer opponent later).

Static site, **no build step, no framework** — deliberate. Plain HTML/CSS/ES modules. The only vendored library is `marked` (`vendor/VERSIONS.md`); **the rules engine and the board are our own** (`js/rules/go.js`, `js/goban.js`) because nothing like chess.js / cm-chessboard / Stockfish exists for Go that can simply be dropped in. Intended for GitHub Pages under `/go-master/`, so all paths stay relative. Not published yet (no remote); when it is, a push to main will be a deploy, so merge only what is tested.

**Before starting any work here, read `ROADMAP.md`** — it holds the agreed phases and what is next.

## About the owner

- Former architect, now a student pilot. Comfortable with HTML/JS and Python. Club-level chess player (~1200+); **new to Go** — this course is for them, so the beginner track matters here in a way it did not for chess.
- Wants explanations before implementation, additive development, and no claims that something works without running it.
- Design is iterated by comment: keep visual decisions in `css/tokens.css` so each comment is a small diff. Draft 1 (2026-09-13) reuses the Chess Master language (metar-taf: white ground, Helvetica Neue, small uppercase letter-spaced labels, hairline borders, square corners). Draft 2 (same day, owner's comment): the accent is a **dark red** (`#6f0b10`, HSL 357° 82% 24%; the exact-tone match of the green read as brown) so the two apps are siblings in different colours; board good/bad marks stay green/red. The board is pale kaya wood with thin ink lines, slate and shell stones (`--gb-*`, `--stone-*` tokens). Lesson portraits get the same old-film treatment as Chess Master (`.board-aside`), **only on lessons built around a famous game or player**, never as decoration; photos only public-domain or CC from Wikimedia Commons, credited in `sources:`.
- The logo (`assets/brand/logo-go.svg`) is the Go member of the logo family drawn for Chess Master (`../chess-master/design/logos.html`): same 2×2 footprint, lines instead of squares, two stones on points.
- **The Master series switcher** (`js/family.js`, 2026-09-15): hovering or clicking the logo opens a rounded glass bubble (Apple-style: blur, saturation, a rim light; `--bubble-*` tokens) listing every app of the series — logo in its own accent and name only, the current one marked. `FAMILY` in that file is the whole registry and **must be identical in every app of the series**: adding a Master is one entry, copied to the other apps. Links are `../<app>/` on GitHub Pages (the apps are siblings) and the `dev` port on localhost. Nothing is fetched from a sibling and no progress is shared.

## Run

```
python3 scripts/serve.py 8001
```
then open http://localhost:8001 (8000 is Chess Master's). ES modules and `fetch` do not work over `file://`. The dev server sends `Cache-Control: no-store`.

Board animations use timers, not `requestAnimationFrame`, so they finish in hidden tabs; no `?noraf` hook is needed.

Validate before committing:
```
node scripts/rules-test.mjs       # the rules engine (run before touching js/rules/go.js)
node scripts/check-content.mjs    # every lesson: sources, legal positions, legal solution trees
node scripts/bot-test.mjs         # the computer opponent (run before touching js/bot/)
```
**Oracles, and their limits.** Chess Master verifies every puzzle against Stockfish; here we have three narrower oracles, and the checker uses each where a fence asks for it:
- `score: B+3.5` — our scorer agrees with a diagram's count (`dead:` removed first). Use it on every counted diagram.
- `expect: kill` / `expect: escape` with `target: <stone>` (or `target: move`, the stone just played) — `js/rules/capture-search.js`, a ladder/net reader: after the reader's first move the target chain cannot escape / cannot be caught, and (`kill` always, `escape` with `unique: true`) no other first move works. Scope: the attacker only plays ataris plus at most one quiet move (the net); the defender extends or captures adjacent stones in atari; three liberties is safety. It does **not** read capturing races, counter-attacks on the reader's other chains, or eyes — for those use `expect: capture` and read by hand.
- `safe: A2` — after every reader move of every line, the reader's own chain at A2 cannot be captured (the search aimed at our stones). Required wherever the prose says "without losing your own". It checks **that one chain only**; name each chain at risk. `quiet: 0` restricts the hypothetical attacker to ataris; it *weakens* the uniqueness check (fewer moves count as kills), so use it only with a reason written into the fence, and never to silence a flood of alternatives — that flood means the position is wrong.
- `refute: A1 E4` (needs `target:`) — the moves the prose says fail must fail under the capture search: no immediate capture of the target, and the chain still escapes (`kill`) / is still caught (`escape`). Use it on every "had you played X instead" sentence.
- `expect: capture` — every solution line is legal, ends on a reader move that captures, and no *other first move* captures (uniqueness at the root only).
- `expect: live` / `expect: dead` with `target: <stone>` — `js/rules/life-search.js`, the life-and-death reader: an exhaustive search of the target's eye space (every move for both sides, passes included) ending in capture, in Benson's pass-alive test, or in two passes. It asserts the position is a problem (the other side moving first gets the opposite result), that after every reader move in the tree the group is dead / alive, and that no other first move works (`unique: false` waives that; the tree should then list every working move). A `unknown` (a ko, or a region over 14 points) fails the check. Scope: the region is the closed eye space; the surrounding wall is taken as safe. Compose problems enclosed, ko-free, region ≤ 8 points or the checker gets slow.
- `expect: seki` with `target: <a stone of each colour>` — both chains alive whoever moves; after every reader move in the tree still so; `refute:` entries (a move, or a line `A2/pass/E1` reader/opponent/reader…) leave the reader's own chain dead. The answer is usually `pass`; an exercise shows a Pass button only when its tree accepts a pass.
- `life: A3 alive | dead | first | vital B1` on a `board` fence — the diagram's claim, by the same search: alive even if the attacker moves first / dead even if the defender moves first / whoever moves first wins / B1 is the one point that decides it for both sides.
- Joseki lessons: the sequences are move lists from Kogo's dictionary, checked only for legality; exercises play the joseki through (the tree is the sequence, both sides). No engine judges them, and the lessons say so.
- `node scripts/life-explore.mjs 9 "<black>" "<white>" A3 b dead` prints every working first move and an answer to every reply, in the solution-tree syntax: use it to author, then let the checker confirm.
Everything else — whether the opponent's scripted reply is their best, whether a tsumego is sound, **every opening judgement** — is caught by reading, not by a machine. Opening problems accept the standard points named in the sources or the move played in the model game, and their `sources:` say so. Say which oracle checked a lesson in its `sources:`, and never claim more.

## Layout

- `index.html` shell; `js/app.js` router + sidebar + home; `js/lesson.js` Markdown → components; `js/frontmatter.js` and `js/position.js` are the pure helpers shared with `scripts/`.
- `js/rules/capture-search.js` the ladder/net reader and `js/rules/life-search.js` the life-and-death reader (Benson + eye-space search), both used only by the checker (see Oracles). `scripts/rules-test.mjs` covers them on the classical shapes.
- `js/rules/go.js` the rules: board, chains and liberties, capture, suicide, **simple ko** (positional superko later), passes, **area (Chinese) scoring with komi 7.5** and a dead-stone list; `handicapPoints` (fixed placement, the traditional order). Coordinates: `A1`…`T19` (no I) in lessons, `aa`…`ss` in SGF.
- `js/goban.js` is the single board component (SVG goban, stones, marks, labels, ghost stone, input, animation, sounds). Every board in the app goes through it. Everything visual is in `css/app.css` under "the goban itself" and tokens in `css/tokens.css`.
- `js/sgf.js` SGF parser (keeps the whole tree) + `loadSgf` (main line with positions) + `parseSolution` (the puzzle tree syntax). `js/sgf-viewer.js` annotated game viewer over the main line with keyboard nav; branch navigation is on the roadmap.
- `js/exercise.js` "try it" blocks; `js/progress.js` localStorage progress (lessons, tries, games, and stones played per day); `js/activity-grid.js` the 12-week grid shaded by stones played per day (owner's rule from Chess Master: moves, not points; no streak).
- `js/play.js` two players on one screen (9/13/19) or one player against the computer (9×9 only): handicap 2–9 (2–5 on the small boards, komi 0.5, White first), pass, undo (two plies against the computer), resign; after two passes click dead stones and read the area count — with the computer on, it marks what its playouts say is dead first.
- `js/bot/` the computer opponent, **ours and deliberately weak**: `board.js` a typed-array board for playouts (checked move by move against `rules/go.js` by `scripts/bot-test.mjs`), `mcts.js` plain UCT with random playouts that never fill a true eye and answer ataris, area scoring at the end; `worker.js` runs it off the page thread, `client.js` is the page's handle (one request at a time; a cancelled request's answer is dropped, so no stale move lands after undo or new game). ~6k playouts/s on 9×9 in Node; levels are wall-clock budgets (0.5 / 1.5 / 4 s). No patterns, no book, no network. The UI says so.
- `content/curriculum.json` fixes track and lesson order; a lesson shows only when `"ready": true` and `content/lessons/<track>/<slug>.md` exists.
- `content/games/*.sgf` full games with `C[]` comments; shared between lessons. Files starting with `_` are composed fixtures for the checker and the viewer, never game records; the checker loads every `.sgf` here.
- **localStorage keys are prefixed `go-master.`** and nothing is ever adopted from another prefix: Chess Master will share the github.io origin, so a key collision would corrupt its progress.

## Lesson format

Markdown with frontmatter (`id`, `track`, `title`, `lede`, `level`, `sources:` list). Three fences become components:

    ```board                 ```sgf                  ```try
    size: 9                  file: name.sgf          size: 9
    handicap: 4  (stones on the star points, White to move)
    black: D4 E5             (or inline SGF)         black: …
    white: D5                start: 0                white: …
    labels: D4=a, E5=b                               turn: b            (default black)
    tri: … / sq: … / x: …                             solution: E3 (D2 E2) (C2 D1)
    highlight: F5                                    expect: capture | kill | escape   (see Oracles)
                                                     target: E5 | move   unique: true   refute: A1 E4
                                                     safe: A2   quiet: 0
    score: B+3.5   (checker: our scorer agrees)        ko: F5             (a pending ko point)
    life: A3 alive|dead|first|vital B1  (checker)
    territory: true  (paint the counted areas; dead: … removes stones first)
    last: E5                                         hint: … / prompt: … / success: …
    caption: …
    interactive: true
    ```

A `try` solution is a **tree** in SGF-style parentheses: moves alternate reader / opponent starting with the reader; several branches at a reader node are all accepted; at an opponent node the first branch is the reply that gets played. Every line must end on a reader move. `pass` is a move.

**Lesson shape (owner's rule from Chess Master):** short core idea → problems (`try` blocks, the main body) → a short "Remember" list → long explanations and full games collapsed behind `+++ Read more: title` … `+++` sections. A lesson ticks itself in the sidebar when all its problems are solved; "Mark as read" is the fallback for lessons without problems.

## Content rules — non-negotiable

1. **Game move lists are facts** and free to use. Annotations are ours.
2. **Quote at length only from public-domain or CC sources** and say so in `sources:`. Known good: Arthur Smith, *The Game of Go* (1908, public domain, Gutenberg #66632); Wikipedia (CC BY-SA, attribute). **Sensei's Library's licence is not yet verified** — link to it, do not quote it until it is. GoGoD and modern books are not free: paraphrase and credit, quotes of a sentence or two at most. **Kogo's Joseki Dictionary** (2014 edition, waterfire.us/joseki.htm): its header says commercial distribution needs permission and asks to be contacted before any distribution — so we use its *move sequences* only (facts), never its comments, credit and link it in `sources:`, and do not vendor the file. `node scripts/sgf-tree.mjs <sgf> "Q16 R14"` walks such a tree for authoring.
3. **Every lesson has a non-empty `sources:` block.** The checker enforces it.
4. **Verify game records against a source before adding them**; do not trust memory for move lists. Say where each SGF came from in its `SO[]` property and in the lesson's sources.
5. Problems are composed unless stated; classical problems (Xuanxuan Qijing, Igo Hatsuyōron, etc.) are centuries old and free, but name the collection.

## Workflow

Branch before editing; merge to `main` with `--ff-only` after the owner approves. Run both checkers before every commit.
