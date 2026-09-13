---
id: first-steps/the-board-and-the-stones
track: First steps
title: The board and the stones
lede: Lines, not squares. Stones go on the crossings, never move, and the side that surrounds more of the board wins. That is nearly the whole rule book.
level: 0
sources:
  - Arthur Smith, The Game of Go (1908), chapter II "Description of the board and stones" — public domain, https://www.gutenberg.org/ebooks/66632
  - Wikipedia, "Rules of Go" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Rules_of_Go
---

## The board

A full board is a grid of 19 by 19 lines, which gives 361 crossing points. Stones are played **on the points where the lines cross**, including the edge and the corners, never inside the squares. Beginners learn on 9×9 (81 points): the same rules, a game in ten minutes.

The darker dots, nine on the full board and five on 9×9, are the **star points**. They have no effect on play; they are landmarks for the eye, and the places where handicap stones go.

```board
size: 9
caption: The 9×9 board. Columns are lettered A to J (there is no I, to keep it apart from J), rows are numbered from the bottom. The centre point is E5.
```

## The stones

Black plays first, then the players alternate, one stone per turn. A stone, once placed, **never moves**. It leaves the board only when it is captured, which the next lesson explains. Instead of playing, you may **pass**; when both players pass one after the other, the game is over.

Try it: click anywhere on this board. Black first, then White.

```board
size: 9
interactive: true
caption: A board to try. Nothing here counts for anything; place a few stones and get used to the crossings.
```

## The aim

The point of the game is not to capture stones. It is to **surround territory**: the empty points that only your stones border. At the end, each side counts the points it surrounds plus the stones it has on the board (this is *area counting*; there is another way to count that gives the same winner nearly always, and a later lesson covers it). White gets a bonus called **komi** — 7.5 points on this site — for having moved second. The half point means there can be no tie.

```board
size: 9
black: A4 B4 C4 D4 E4 E5 E6 F6 G6 H6 J6
white: A5 B5 C5 D5 D6 D7 E7 F7 G7 H7 J7
caption: A finished 9×9 game, walls only. Black surrounds the 35 empty points below the wall and has 11 stones, 46 in all. White surrounds 24 and has 11 stones, 35, plus 7.5 komi is 42.5. Black wins by 3.5.
```

Real games are not that tidy: stones are captured, groups die, borders wobble. But every game ends like this, with the board divided and the points counted.

## Remember

- Stones go on the crossings, corners and edges included.
- Black first; one stone per turn; stones never move.
- Two passes in a row end the game.
- You win by surrounding more of the board, stones and empty points together, and White gets 7.5 komi.

+++ Read more: why 19 lines, and why start on 9
The 19×19 board has been standard for well over a thousand years; the game reached Japan from China in the 7th or 8th century, and Arthur Smith's 1908 book, the first full description in English, already treats 19 lines as the only size worth mentioning. Nobody knows why 19 exactly; 17-line boards existed in early China.

The 9×9 board is a modern teaching tool. It keeps every rule and every kind of fight, but a game lasts a few dozen moves instead of two or three hundred, so you meet capture, life and death and counting many times in an evening. Play 9×9 until the rules feel automatic, then 13×13, then the full board. The lessons here follow the same path.
+++
