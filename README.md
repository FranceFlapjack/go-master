# Go Master

A Go course as a website, the sibling of [Chess Master](../chess-master). Every lesson is built on a real game or a real book, with an interactive board inside the text: play through the model game, then try the idea yourself.

Static site, no build. Run locally:

```
python3 scripts/serve.py 8001
```

Open http://localhost:8001. Check the rules engine with `node scripts/rules-test.mjs` and the content with `node scripts/check-content.mjs`.

Eight tracks planned (First steps, Capturing techniques, Life and death, The opening, Joseki, Direction of play, The endgame, Study a whole game); *First steps*, *Capturing techniques* and *Life and death* are ready (19 lessons, 74 problems). Plus a play page: two players on one screen, or a weak computer opponent on 9×9 (our own Monte-Carlo search, for practice), with area counting.

The rules engine and the board are our own (`js/rules/go.js`, `js/goban.js`). The only library is [marked](https://github.com/markedjs/marked) (MIT). See `vendor/VERSIONS.md`.

Game records are public facts; book quotations come only from public-domain or Creative Commons sources and every lesson lists its sources.
