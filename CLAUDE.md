# Go Master

A Go course as a website, sibling of Chess Master (`../chess-master`, same owner, same shell, same design language): lessons built on real games and real books, with an interactive board inside the text. Play modes (two players on one screen now; a computer opponent later).

Static site, **no build step, no framework** — deliberate. Plain HTML/CSS/ES modules. The only vendored library is `marked` (`vendor/VERSIONS.md`); **the rules engine and the board are our own** (`js/rules/go.js`, `js/goban.js`) because nothing like chess.js / cm-chessboard / Stockfish exists for Go that can simply be dropped in. Intended for GitHub Pages under `/go-master/`, so all paths stay relative. Not published yet (no remote); when it is, a push to main will be a deploy, so merge only what is tested.

**Before starting any work here, read `ROADMAP.md`** — it holds the agreed phases and what is next.

## About the owner

- Former architect, now a student pilot. Comfortable with HTML/JS and Python. Club-level chess player (~1200+); **new to Go** — this course is for them, so the beginner track matters here in a way it did not for chess.
- Wants explanations before implementation, additive development, and no claims that something works without running it.
- Design is iterated by comment: keep visual decisions in `css/tokens.css` so each comment is a small diff. Draft 1 (2026-09-13) reuses the Chess Master language (metar-taf: white ground, Helvetica Neue, small uppercase letter-spaced labels, hairline borders, square corners, bottle-green `--accent` shared with Chess Master so the two read as siblings). The board is pale kaya wood with thin ink lines, slate and shell stones (`--gb-*`, `--stone-*` tokens). Lesson portraits get the same old-film treatment as Chess Master (`.board-aside`), **only on lessons built around a famous game or player**, never as decoration; photos only public-domain or CC from Wikimedia Commons, credited in `sources:`.
- The logo (`assets/brand/logo-go.svg`) is the Go member of the logo family drawn for Chess Master (`../chess-master/design/logos.html`): same 2×2 footprint, lines instead of squares, two stones on points.

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
```
**There is no engine oracle.** Chess Master verifies every puzzle against Stockfish; here puzzles are authored, and the checker only proves that every line is legal and (with `expect: capture`) that the reader's last move captures. A wrong tsumego is caught by reading, not by a machine. Do not claim engine verification.

## Layout

- `index.html` shell; `js/app.js` router + sidebar + home; `js/lesson.js` Markdown → components; `js/frontmatter.js` and `js/position.js` are the pure helpers shared with `scripts/`.
- `js/rules/go.js` the rules: board, chains and liberties, capture, suicide, **simple ko** (positional superko later), passes, **area (Chinese) scoring with komi 7.5** and a dead-stone list. Coordinates: `A1`…`T19` (no I) in lessons, `aa`…`ss` in SGF.
- `js/goban.js` is the single board component (SVG goban, stones, marks, labels, ghost stone, input, animation, sounds). Every board in the app goes through it. Everything visual is in `css/app.css` under "the goban itself" and tokens in `css/tokens.css`.
- `js/sgf.js` SGF parser (keeps the whole tree) + `loadSgf` (main line with positions) + `parseSolution` (the puzzle tree syntax). `js/sgf-viewer.js` annotated game viewer over the main line with keyboard nav; branch navigation is on the roadmap.
- `js/exercise.js` "try it" blocks; `js/progress.js` localStorage progress (lessons, tries, games, and stones played per day); `js/activity-grid.js` the 12-week grid shaded by stones played per day (owner's rule from Chess Master: moves, not points; no streak).
- `js/play.js` two players on one screen: 9/13/19, pass, undo, resign; after two passes click dead stones and read the area count.
- `content/curriculum.json` fixes track and lesson order; a lesson shows only when `"ready": true` and `content/lessons/<track>/<slug>.md` exists.
- `content/games/*.sgf` full games with `C[]` comments; shared between lessons. Files starting with `_` are composed fixtures for the checker and the viewer, never game records; the checker loads every `.sgf` here.
- **localStorage keys are prefixed `go-master.`** and nothing is ever adopted from another prefix: Chess Master will share the github.io origin, so a key collision would corrupt its progress.

## Lesson format

Markdown with frontmatter (`id`, `track`, `title`, `lede`, `level`, `sources:` list). Three fences become components:

    ```board                 ```sgf                  ```try
    size: 9                  file: name.sgf          size: 9
    black: D4 E5             (or inline SGF)         black: …
    white: D5                start: 0                white: …
    labels: D4=a, E5=b                               turn: b            (default black)
    tri: … / sq: … / x: …                             solution: E3 (D2 E2) (C2 D1)
    highlight: F5                                    expect: capture    (checker: the last reader move captures, and no other move does)
    score: B+3.5   (checker: our scorer agrees)        ko: F5             (a pending ko point)
    territory: true  (paint the counted areas; dead: … removes stones first)
    last: E5                                         hint: … / prompt: … / success: …
    caption: …
    interactive: true
    ```

A `try` solution is a **tree** in SGF-style parentheses: moves alternate reader / opponent starting with the reader; several branches at a reader node are all accepted; at an opponent node the first branch is the reply that gets played. Every line must end on a reader move. `pass` is a move.

**Lesson shape (owner's rule from Chess Master):** short core idea → problems (`try` blocks, the main body) → a short "Remember" list → long explanations and full games collapsed behind `+++ Read more: title` … `+++` sections. A lesson ticks itself in the sidebar when all its problems are solved; "Mark as read" is the fallback for lessons without problems.

## Content rules — non-negotiable

1. **Game move lists are facts** and free to use. Annotations are ours.
2. **Quote at length only from public-domain or CC sources** and say so in `sources:`. Known good: Arthur Smith, *The Game of Go* (1908, public domain, Gutenberg #66632); Wikipedia (CC BY-SA, attribute). **Sensei's Library's licence is not yet verified** — link to it, do not quote it until it is. GoGoD and modern books are not free: paraphrase and credit, quotes of a sentence or two at most.
3. **Every lesson has a non-empty `sources:` block.** The checker enforces it.
4. **Verify game records against a source before adding them**; do not trust memory for move lists. Say where each SGF came from in its `SO[]` property and in the lesson's sources.
5. Problems are composed unless stated; classical problems (Xuanxuan Qijing, Igo Hatsuyōron, etc.) are centuries old and free, but name the collection.

## Workflow

Branch before editing; merge to `main` with `--ff-only` after the owner approves. Run both checkers before every commit.
