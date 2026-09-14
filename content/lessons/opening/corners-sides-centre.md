---
id: opening/corners-sides-centre
track: The opening
title: Corners, sides, centre
lede: The first moves of a game go to the corners, then the sides, then the centre — not by convention but by arithmetic. The edge of the board is a wall you did not have to build.
level: 3
sources:
  - Wikipedia, "Go opening theory" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_opening_theory — the corners-sides-centre order and the names of the corner points
  - Arthur Smith, The Game of Go (1908), chapter IV on the opening — public domain, https://www.gutenberg.org/ebooks/66632
  - Game records — Gennan Inseki (W) v Shusaku (B), 1846 ("the ear-reddening game"), and AlphaGo (B) v Lee Sedol (W), 2016, game 2; move lists from Andries Brouwer's archive (https://homepages.cwi.nl/~aeb/go/games/), checked against the Wikipedia articles on each game; see the `SO[]` line of each file. Game records are facts; the comments are ours.
  - The counting diagram is checked by the site's scorer (`score:`). The problems in this track are judgement, not calculation — there is no engine behind them; the accepted answers are the standard points named in the sources, or the move played in the model game.
---

## Why the corners

To surround territory you build a fence. In the corner two sides of the fence are already there — the edge of the board — and on the side one is. Count it:

```board
size: 13
black: A4 B4 C4 D4 D3 D2 D1 E13 E12 E11 E10 F10 G10 H10 J10 J11 J12 J13 E5 E6 E7 J5 J6 J7 F4 G4 H4 F8 G8 H8
white: M12
score: B+48.5
territory: true
caption: Nine points of territory three times over. In the corner it took 7 stones; on the side, 11; in the centre, 12. Same territory, nearly twice the work. (The lone white stone is there so that the rest of the board counts for nobody; area count, B+48.5.)
```

That is the whole reason for the order **corners, then sides, then centre**. The corners are where a few stones do the most; the centre is where the most stones do the least. Nobody plays the centre in the opening unless the corners and sides are settled — or unless the whole game is about power rather than territory, which is a later idea.

## The corner points

A corner is "taken" with one stone near the 3-3, 3-4 or 4-4 point (counting lines from the two nearest edges). All three are normal; the next lesson is about the difference. What matters first is the pace: **four corners in the first four to six moves**, then the fighting over them.

```sgf
file: alphago-lee-sedol-2016-g2.sgf
start: 4
```

```sgf
file: gennan-shusaku-1846.sgf
start: 6
```

Two games 170 years apart, same first idea: 2016, four corners in four moves (4-4, 4-4, 3-4, 3-4); 1846, four corners in six moves, all on the 3-4 point, with an approach between.

## Then the sides

Once the corners are taken, the biggest points are on the sides, between corners: an **extension** from your own corner stone, or an **approach** to the opponent's. The third line makes territory; the fourth line makes influence — a framework that may become territory later. Both games above go to the sides next.

## Problems

<p class="puzzle-intro">1 · Three corners are taken. Black to play: take the fourth. (Any of the usual corner points is accepted.)</p>

```try
size: 13
black: D4 K10
white: D10
solution: (K4) (K3) (L4) (L3)
hint: The empty corner is bottom-right. The 4-4, 3-4 and 3-3 points are all corner moves.
prompt: Take the last corner.
success: The last empty corner is the biggest thing on the board. K4 (the 4-4 point), K3 or L4 (the 3-4 points), even L3 (the 3-3) all take it; which one is a matter of style, and the next lesson.
```

<p class="puzzle-intro">2 · All four corners are taken. Black to play: which side is biggest?</p>

```try
size: 13
black: D4 K4
white: D10 K10
solution: (G3) (G4)
hint: Two black corner stones face each other along one side. A stone between them makes the side yours.
prompt: Play the biggest side.
success: The bottom, between your two stones: G3 or G4 turns two corners into one long framework. The left or right sides, between a black stone and a white one, are worth less; the centre least of all.
```

<p class="puzzle-intro">3 · From the 2016 game, after White's fourth move. Black to play: what did AlphaGo do?</p>

```try
size: 19
black: Q16 C16
white: D4 R4
solution: P4
hint: The corners are gone. An approach to an opponent's corner is worth about as much as an empty corner.
prompt: Play the move from the game.
success: P4, an approach to White's 3-4 stone at R4, from the open side. With no empty corner left, the approach is the next biggest thing, ahead of any extension along a side.
```

<p class="puzzle-intro">4 · From the 1846 game, after move 4. Black to play: what did Shusaku do?</p>

```try
size: 19
black: R16 Q3
white: D17 P17
solution: C4
hint: White has just approached R16. Is answering bigger than the empty corner?
prompt: Play the move from the game.
success: C4: the last empty corner. Shusaku left the approach at P17 unanswered for one move because an empty corner is worth more. He answered it with the diagonal at Q15 four moves later.
```

## Remember

- Corners first, then sides, then centre — because the edge does the fencing for you.
- Four corners in the first four to six moves; an approach to an enemy corner counts as a corner move.
- Extend along a side between your own stones before you play between yours and the opponent's.

+++ Read more: third line and fourth line
On the side, a stone on the third line (three from the edge) can make territory below it that is hard to invade; a stone on the fourth line leaves room underneath for the opponent to slide in, but reaches further into the centre. Players mix them: an extension on the third line to secure, on the fourth to build. The 2016 game shows both: Black's J17 on the third line (a wide, low extension along the top), White's D10 on the fourth line (the left side as a framework). The two lessons after this one — the 4-4 and 3-4 points, then extensions — are about exactly this trade between certain territory and possible territory.
+++
