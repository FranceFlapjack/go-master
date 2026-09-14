---
id: opening/extensions
track: The opening
title: Extensions and the two-space rule
lede: After the corners, the sides. A stone placed two points away from your own along the third line is the basic unit of the opening — far enough to be worth something, close enough not to be cut in two.
level: 3
sources:
  - Arthur Smith, The Game of Go (1908), chapter IV — "hiraki" (extension) and the "ikken", "nikken", "sangen" spacings — public domain, https://www.gutenberg.org/ebooks/66632
  - The rule of thumb "from a wall of n stones, extend n+1" is common teaching (see Sensei's Library, "Extension from a wall", https://senseis.xmp.net/?ExtensionFromAWall — linked, not quoted); it is a guide, not a theorem, and nothing here checks it.
  - Game record — AlphaGo (B) v Lee Sedol (W), 2016, game 2; see the `SO[]` line of the file. The extensions discussed are facts of the record; the comments are ours.
  - The problems in this track are judgement, not calculation; the accepted answers are the standard points named in the sources, or the move played in the model game. Nothing here was checked by an engine.
---

## The two-space extension

From a single stone on the third line, the standard extension is **two points along the same line**: D3 to G3, with two empty points between. If the opponent plays between them, each of your stones still has room to make eye shape on its own side, and the intruder is squeezed between two. One space is safe but slow; three spaces is faster but the gap can be invaded. Two is the unit.

```board
size: 13
black: D3 G3
white: D11 G11 H11
labels: E3=a, F3=b, M11=c
caption: Bottom: the two-space extension on the third line, D3 to G3; a white stone at a or b would be caught between the two. Top: from a wall of two stones (G11, H11) the extension is one point wider, to c — a wall of n stones extends n+1.
```

**From a wall, wider.** A wall of two stones is stronger than one and can afford a wider extension: three points. Three stones, four points. The rule of thumb is *n + 1*. A wide extension from a wall is how a wall turns into territory.

**Third line or fourth.** An extension on the third line makes territory below it — there is only one line under it to slide into. On the fourth line the extension is a framework: more centre influence, but the opponent can still come in underneath. Mixing them is normal: one low, one high.

## In the game

```sgf
file: alphago-lee-sedol-2016-g2.sgf
start: 14
```

Moves 11 to 14 are all extensions. Black 11 (N4) is a one-point jump from P4 along the bottom. White 12 (R6) is a one-point jump up the right side from the corner stones. Black 13 (J17) is a much wider extension on the third line, between C16 and Q16 — not territory, but a framework that both corner stones support. White 14 (D10) answers with a fourth-line extension up the left from D4, also a framework. Black then approached R4 again at Q5, and White's R6 was already there to answer it.

## Problems

<p class="puzzle-intro">1 · Black to play. Extend from your stone on the third line, along the bottom.</p>

```try
size: 13
black: D3
white: D11 K11 K4
solution: G3
hint: Two points between: count them.
prompt: Play the standard extension.
success: G3, the two-space extension. F3 would be safe but slow; H3 leaves a gap that White can invade at once, with K4 nearby to help.
```

<p class="puzzle-intro">2 · Black to play. Now you have a wall of two. Extend from it.</p>

```try
size: 13
black: D3 D4
white: D11 K11 K4 C4 C5
solution: (H3) (H4)
hint: A wall of two extends three.
prompt: Extend from the wall.
success: H3 (or H4, a line higher): three points from a two-stone wall. The wall is strong enough that a white stone between could be attacked from both sides.
```

<p class="puzzle-intro">3 · From the 2016 game after move 12. Black to play: AlphaGo's extension along the top?</p>

```try
size: 19
black: C16 Q16 C6 N4 P4 O3
white: R6 D4 R4 F3 P3 Q3
solution: J17
hint: A wide extension between two corner stones, on the third line.
prompt: Play the move from the game.
success: J17, midway between C16 and Q16 on the third line. Wider than the two-space rule allows for a single stone — but here two corner stones support it, and a white invasion on either side of J17 would land between two black positions.
```

<p class="puzzle-intro">4 · Same game after move 13. White to play: Lee Sedol's extension up the left side?</p>

```try
size: 19
turn: w
white: R6 D4 R4 F3 P3 Q3
black: J17 C16 Q16 C6 N4 P4 O3
solution: D10
hint: From the 4-4 stone, up the left, on the fourth line — a framework, not territory.
prompt: Play the move from the game.
success: D10, a fourth-line extension six points up from D4. It stakes out the left side as a framework and keeps Black's C6 stone from extending there itself. High rather than low: White wants the centre, and does not mind Black sliding under later.
```

## Remember

- From one stone on the third line: extend two. From a wall of n: extend n + 1.
- Third line makes territory; fourth line makes a framework. Use both.
- An extension between two of your own positions can be wider, because an invader lands between two.

+++ Read more: the invasion test
The way to judge an extension is to ask what happens if the opponent plays right in the middle of it. After a two-space extension on the third line the invader has one point on each side and is short of eye space; either of your stones can attack it, and it will usually have to run. After a three-space extension from a single stone the invader can make a two-space extension of its own on one side, which is often enough to settle. From a two-stone wall the same three-space gap is fine, because the wall side needs no help and the whole attack can come from the other. The rule of thumb is just that test worked out in advance.
+++
