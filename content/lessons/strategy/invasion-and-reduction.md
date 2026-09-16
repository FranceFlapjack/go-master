---
id: strategy/invasion-and-reduction
track: Direction of play
title: Invading and reducing
lede: A framework is not territory yet. You can go inside it and try to live — an invasion — or press on its edge from outside and make it smaller — a reduction. Invade where there is room to live; reduce where there is not.
level: 3
sources:
  - Wikipedia, "Go strategy and tactics" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_strategy_and_tactics — "A thick group can also support invasion of enemy spheres of influence", and the thickness section's advice to push an invader towards one's thick group
  - Move sequences from Kogo's Joseki Dictionary (Gary Odom, Alexander Dinerchtein and contributors, 2014-02-25, http://waterfire.us/joseki.htm) — the 3-3 invasion under a 4-4 stone, as taught in the joseki track; used as a move list only, and the judgement that White lives is the dictionary's
  - Game record — AlphaGo (B) v Lee Sedol (W), 2016, game 2, move 37 (the shoulder hit at P10); see the file's `SO[]` line. The comments are ours.
  - What is machine-checked: the closed frameworks in the diagrams cannot be invaded — the site's life-and-death search reads the invading stone as dead even with White to move (`life:`). Where to invade or reduce is a judgement: the accepted answers are the joseki point, the move played in the model game, or the moves outside a framework the search has shown to be closed. No engine judged them.
---

## Two ways into a framework

When the opponent has sketched an area with stones on the third and fourth lines, it is a *framework* (moyo), not territory: nothing inside it has been decided. You have two ways to contest it.

- **Invade**: play inside and live. It works where the framework has room — an open corner, a wide extension — and it hands the opponent a wall in exchange for the points. The 3-3 invasion under a 4-4 stone from the joseki track is the invasion every player learns first.
- **Reduce**: play on the edge, from outside, so that the framework's boundary is pushed back a line or two. It gains less than a successful invasion and risks less than a failed one. The *shoulder hit* — a stone diagonally above the framework's edge stone — and the *cap*, a stone one point above it, are the two standard reductions.

The choice is a matter of counting room. A small, closed area has no room for two eyes and cannot be invaded at all; the search confirms it below. A large, open one can.

```board
size: 9
black: C1 C2 C3 C4 D5 D6 A7 B7 C7
white: B3
life: B3 dead
caption: Black's left side is closed: thirteen points, walled on every side. White's invasion at B3 is dead even with White to move next — there is no room for two eyes. Against a framework like this, only reduction from outside is possible.
```

```board
size: 19
black: Q16 K17 D4
white: R17 D16 Q4
caption: The same idea with room: a 4-4 stone leaves the 3-3 point open on two sides, and White's invasion at R17 lives — by the sequence from the joseki track, with Black taking a wall in exchange.
```

## Problems

<p class="puzzle-intro">1 · White to play. Black has a 4-4 stone at Q16 and an extension to K17. The corner has room: invade.</p>

```try
size: 19
turn: w
white: D16 Q4
black: Q16 K17 D4
solution: R17
hint: The point under the 4-4 stone.
prompt: Invade where there is room to live.
success: R17, the 3-3 point. Black blocks on one side, you crawl along the other and live in the corner; Black gets a wall facing K17. That is the price of the invasion, and here it is worth paying only if you can deal with the wall — the joseki is the same every time; whether to play it is the judgement.
```

<p class="puzzle-intro">2 · Black to play, in AlphaGo – Lee Sedol, game 2, after move 36. White's right side is a framework. Reduce it from above.</p>

```try
size: 19
black: J17 C16 E16 O16 Q16 R15 C6 D5 Q5 B4 C4 K4 N4 P4 B3 D3 O3 D2
white: Q14 R14 C13 Q11 D10 C7 B6 R6 B5 C5 R5 D4 E4 R4 C3 F3 P3 Q3
solution: P10
hint: The stone at Q11 is the edge of White's area on the right. The shoulder hit is the point diagonally above it, towards the centre.
prompt: Play the reduction that was played in the game.
success: P10, the shoulder hit on the fifth line — move 37 of the game, AlphaGo's. It does not enter the framework; it presses on its shoulder from the centre, so that White's right side is capped below the fifth line while the black stone faces the middle of the board. The game continued with fights across the whole board.
```

```sgf
file: alphago-lee-sedol-2016-g2.sgf
start: 36
```

<p class="puzzle-intro">3 · White to play. Black's left side is the closed framework from the diagram above. Anything inside dies — so reduce it from outside.</p>

```try
size: 9
turn: w
white: G3 G6
black: C1 C2 C3 C4 D5 D6 A7 B7 C7
solution: (E4) (E5) (E6) (D7) (D8) (C8) (D4)
hint: Every point inside the wall is dead. Press on the wall from the side you are on.
prompt: Reduce from the outside.
success: A move against the boundary from outside — E4, E5, E6, D7, D8, C8 or D4 — takes a point or two off the framework and risks nothing. An invasion at B3 or B4 would be a dead stone: the search read it out in the diagram. Count the room first; it tells you which of the two tools to use.
```

## Remember

- A framework is not territory. Invade where there is room to live; reduce from outside where there is not.
- The 3-3 point under a 4-4 stone is the standard invasion; the shoulder hit and the cap are the standard reductions.
- Before invading, count the room. A closed area of a dozen points has none.

+++ Read more: the exchange an invasion makes
An invasion that lives is never free. The invader gets points inside the framework; the framework's owner gets a wall around them — thickness, in the sense of the previous lesson — and the wall faces outwards, towards whatever else the invader owns. The 3-3 invasion shows the exchange in its cleanest form: White's corner is worth a handful of points, Black's wall is worth whatever Black can do with it. So the question "should I invade?" is really "can I afford the wall?" — and the time to invade is when the wall would face your own thickness, or an area already settled, where it has nothing to do. Reduction sidesteps the exchange: no wall is given, because nothing is enclosed.
+++
