---
id: opening/the-4-4-and-3-4-points
track: The opening
title: The 4-4 and 3-4 points
lede: One stone takes a corner, but not all corner stones are the same. The 4-4 point is fast and loose; the 3-4 point is slower and wants a second stone. Which you choose says what kind of game you want.
level: 3
sources:
  - Wikipedia, "Go opening theory", "Shimari" and "Shin Fuseki" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_opening_theory, https://en.wikipedia.org/wiki/Shimari, https://en.wikipedia.org/wiki/Shin_Fuseki — names of the points and enclosures; the 1930s history of the 4-4 point
  - Game records — AlphaGo (B) v Lee Sedol (W), 2016, game 2, and Gennan Inseki (W) v Shusaku (B), 1846; see the previous lesson and the `SO[]` line of each file.
  - The problems in this track are judgement, not calculation; the accepted answers are the standard points named in the sources, or the move played in the model game. Nothing here was checked by an engine.
---

## Three ways to take a corner

```board
size: 13
black: D10
white: K11
labels: D4=a, D3=b, C4=c, C3=d
caption: Top-left, a black stone on the 4-4 point (the star point). Top-right, a white stone on the 3-4 point: one line lower on one side, here the third line from the top and the fourth from the right. Bottom-left, the empty corner's points: a is 4-4, b and c are the two 3-4 points, d is 3-3.
```

**The 4-4 point (hoshi).** Balanced between the two sides, so it works with a stone on either. It takes the corner in one move, but only loosely: the opponent can still slip in underneath at the 3-3 point and live there. What the 4-4 stone really claims is influence — the sides and the centre, not the nine points in the corner.

**The 3-4 point (komoku).** One line lower on one side. It is closer to territory and it is unbalanced: it wants a second stone on the open side to close the corner (an *enclosure*, next lesson), and if the opponent gets there first (an *approach*), the corner is contested. Slower, more solid.

**The 3-3 point.** Territory at once — nobody can invade under it — but low and small, and it gives the opponent the outside. Rare as a first move on the big board; common on 9×9.

## In the games

```sgf
file: alphago-lee-sedol-2016-g2.sgf
start: 4
```

Modern professional games use both. Here AlphaGo took two 4-4 points (Q16 and, mirrored, White's D4) and the players split the remaining corners with 3-4 points. In 1846 every corner stone was a 3-4 point; the 4-4 point as an opening move came into fashion only in the 1930s, with the "new fuseki" of Go Seigen and Kitani Minoru.

```sgf
file: gennan-shusaku-1846.sgf
start: 6
```

## The 3-3 invasion

The price of the 4-4 point is the point underneath it. A white stone at the 3-3 point under a black 4-4 stone can make a small living group in the corner; Black gets a wall on the outside in exchange. Whether that trade is good depends on the rest of the board — a wall facing your own stones is worth a lot, a wall facing the opponent's living stones is worth little. The sequences are joseki and belong to that track; for now, know that the invasion exists, and that a 4-4 corner is not territory until it has a second stone.

```board
size: 13
black: D10
white: C11
highlight: C11
caption: White invades at the 3-3 point under a 4-4 stone. Black blocks on one side and White lives along the other; Black's wall faces the side Black blocked from.
```

## Problems

<p class="puzzle-intro">1 · White to play. Black's corner stone is on the 4-4 point. Where is the invasion point?</p>

```try
size: 13
turn: w
black: D10 D4 K4
white: K10 G3 G11
solution: C11
hint: The point diagonally under the 4-4 stone, three lines from each edge.
prompt: Invade the corner.
success: C11, the 3-3 point. Under a 4-4 stone it is always available, at a price: Black will wall you in on one side. Here, with black stones on both sides, the wall would be worth something — the moment to invade is a judgement for later; the point is the same.
```

<p class="puzzle-intro">2 · Black to play. Your stone at R16 is on the 3-4 point. Close the corner.</p>

```try
size: 19
black: R16 D4
white: D16 Q4
solution: (P17) (O17) (P16)
hint: The 3-4 stone is low on the right side; the open side is along the top. A knight's move that way.
prompt: Enclose the corner.
success: P17, the small knight's enclosure — or O17 (large knight) or P16 (one-point). Each turns the 3-4 stone into a corner that is nearly territory. The next lesson is about the differences between them.
```

<p class="puzzle-intro">3 · White to play. Black has a 3-4 stone at R16 and has not enclosed it. Approach from the open side.</p>

```try
size: 19
turn: w
black: R16 Q3
white: D17
solution: (P17) (P16)
hint: The point Black wanted for the enclosure is the point you want for the approach.
prompt: Approach the corner.
success: P17 (or P16, a line higher). It is the same idea as the enclosure, from the other side: the 3-4 stone's open side is where both players want to be. In the 1846 game White played exactly this, P17, as move 4.
```

<p class="puzzle-intro">4 · From the 2016 game after move 5. White to play: Lee Sedol's answer to the approach at P4?</p>

```try
size: 19
turn: w
black: Q16 C16 P4
white: D4 R4
solution: P3
hint: Attach underneath the approaching stone.
prompt: Play the move from the game.
success: P3, the attachment under the approach stone. It keeps the corner and starts a short standard sequence (O3, Q3 followed in the game). The approach and the attachment underneath are as common a pair as any in the opening.
```

## Remember

- 4-4: fast, balanced, influence; the 3-3 point under it is open to invasion.
- 3-4: lower, unbalanced, territory; it wants an enclosure, and it invites an approach on its open side.
- 3-3: secure and small.
- The corner is not territory until it has a second stone — yours or theirs.

+++ Read more: which to choose
There is no wrong answer, and professionals have moved between them by fashion for a century. A rough guide for a beginner: take 4-4 points if you want simple, fast openings and do not mind the 3-3 invasion (you get a wall, which is good if you know what to do with it); take 3-4 points if you like territory you can count and are happy to answer approaches. Playing both, one of each in adjacent corners, is the most common professional choice, because the stones then work together along the side between them. Whatever you pick, the pace is the same: corners in the first moves, then the biggest side.
+++
