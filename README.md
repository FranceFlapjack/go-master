# Go Master

A Go course as a website, the sibling of [Chess Master](https://franceflapjack.github.io/chess-master/). Live at **https://franceflapjack.github.io/go-master/**. Every lesson is built on a real game or a real book, with an interactive board inside the text: play through the model game, then try the idea yourself.

Static site, no build. Run locally:

```
python3 scripts/serve.py 8001
```

Open http://localhost:8001. Check the rules engine with `node scripts/rules-test.mjs` and the content with `node scripts/check-content.mjs`.

Eight tracks — First steps, Capturing techniques, Life and death, The opening, Joseki, Direction of play, The endgame, Study a whole game — all ready (44 lessons, 151 problems). Plus a play page: two players on one screen, or a weak computer opponent on 9×9 (our own Monte-Carlo search, for practice), handicap games, area counting.

The rules engine and the board are our own (`js/rules/go.js`, `js/goban.js`). The only library is [marked](https://github.com/markedjs/marked) (MIT). See `vendor/VERSIONS.md`.

Game records are public facts; book quotations come only from public-domain or Creative Commons sources and every lesson lists its sources.

## Using this

Copyright (c) 2026 FranceFlapjack. Free to read, learn from, share and build on, **with credit and not for sale** — the code under the [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/), the lessons and the design under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Credit reads "Go Master by FranceFlapjack" with a link to https://franceflapjack.github.io/go-master/. Everything under `vendor/` keeps its own licence. See [LICENSE](LICENSE).

`robots.txt` asks the generative-AI crawlers not to take the lessons for training. That is an opt-out the well-behaved ones honour, not a lock.

