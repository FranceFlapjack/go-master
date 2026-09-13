---
id: first-steps/reading-a-game-record
track: First steps
title: Reading a game record
lede: Every lesson from here on is built on real games, shown in a viewer you can step through. Learn to read the coordinates, the move list and the numbered diagrams, on the most famous game of the century so far.
level: 0
sources:
  - Game record — Google DeepMind Challenge Match, game 4, AlphaGo (B) v Lee Sedol 9p (W), Seoul, 2016-03-13, W+R, 180 moves. Move list from Andries Brouwer's archive, https://homepages.cwi.nl/~aeb/go/games/games/AlphaGo/LeeSedol/4.sgf, checked against Wikipedia, "AlphaGo versus Lee Sedol" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol. Game records are facts; the comments are ours.
  - Wikipedia, "Smart Game Format" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Smart_Game_Format
---

## Coordinates

Columns are letters from the left, **A to T, skipping I** (it looks like J and like the number 1). Rows are numbers from the bottom, 1 to 19. So the bottom-left corner is A1, the centre of the full board is K10, and Q16 is the 4-4 point in the top-right corner: fourth line from the right edge, fourth from the top.

```board
size: 19
black: Q16 D4 C16 R4
caption: The four corner points from the game below. The centre star point is K10. The 4-4 point (Q16, D4) sits on a star point; the 3-4 point (C16, R4) is one line closer to the edge.
```

## The viewer

Below is a whole game. The board shows the position; the list on the right shows every move as a number and a coordinate, black dots for Black's moves, white for White's. Click any move to jump there; use the arrow buttons under the board, or the **← →** keys, to step one move at a time, and **↑ ↓** for the start and the end. Comments appear above the list at the moves that have them. The two numbers beside the arrows count the stones each side has captured so far.

Step through the first thirteen moves slowly and read the comments; they explain what an opening looks like. Then jump to move 78.

```sgf
file: lee-sedol-alphago-2016-g4.sgf
```

## Numbered diagrams

In books, and in later lessons here, a sequence is often shown on one diagram with **numbers on the stones**: 1 is the first move of the sequence, 2 the reply, and so on. Odd numbers are one colour, even the other. A stone without a number was already there. Read them in order, and if a number sits on a point where another stone has since been captured, the book says so in the text.

```board
size: 9
black: E5 F4
white: E4 D5
labels: E5=1, E4=2, F4=3, D5=4
caption: The same idea on a small board: Black 1, White 2, Black 3, White 4. Books draw the numbers on the stones; here the viewer moves the stones for you instead.
```

## Problems

<p class="puzzle-intro">1 · Play the first move of a game: any of the four 4-4 points.</p>

```try
size: 19
solution: (Q16) (D16) (D4) (Q4)
hint: The star points nearest the corners.
prompt: Play on a 4-4 point.
success: A corner, on the star point. All four are equally good on an empty board; Q16 is where this game began.
```

## Remember

- Letters A–T from the left, skipping I; numbers 1–19 from the bottom. K10 is the centre.
- 4-4 and 3-4 are the names of corner points, counted from the nearest edges.
- Step through records slowly, with the keyboard, and stop where the comments stop you.
- On numbered diagrams, read the numbers in order; unnumbered stones were there before.

+++ Read more: SGF, the file behind the viewer
Game records are stored as text in the **Smart Game Format** (SGF), which every Go program and server reads. A file is a list of moves like `;B[pd];W[dp]`, where the two letters are the column and row counted from the top-left, `a` to `s`, so `pd` is Q16. Comments sit in `C[...]`, and variations in parentheses. The site keeps a copy of every game it shows under `content/games/`, with a note of where the record came from and how it was checked. If you play online, you can download your own games as SGF and, later, open them here.
+++
