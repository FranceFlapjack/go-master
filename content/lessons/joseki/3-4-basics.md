---
id: joseki/3-4-basics
track: Joseki
title: 3-4 point basics
lede: The 3-4 stone has two lives: enclosed, it is the oldest corner shape in the game; approached, it starts the oldest joseki. One answer to the approach has a name and a face — Shusaku's diagonal.
level: 3
sources:
  - Move sequences from Kogo's Joseki Dictionary (Gary Odom, Alexander Dinerchtein and contributors, 2014-02-25, http://waterfire.us/joseki.htm), the 3-4 point, the enclosures and the one-space low approach with the diagonal answer — used as move lists only; the dictionary's commentary is copyrighted and not reproduced. Checked for legality by the site's rules engine; the judgement that a line is joseki is the dictionary's.
  - Game record — Gennan Inseki (W) v Shusaku (B), 1846, moves 4 and 9 (the approach and the diagonal); see the file's `SO[]` line.
  - Arthur Smith, The Game of Go (1908), chapter IV, on "shimari" — public domain, https://www.gutenberg.org/ebooks/66632
  - The problems play the lines through with you; the accepted moves are the dictionary's, nothing else.
---

## The four enclosures

Left alone, a 3-4 stone is enclosed with one more move on its open side. From R16 the four enclosures are P17 (small knight), P16 (one-point), O17 (large knight) and O16 (two-point). The small knight's is the tightest and the classic; the others trade a little solidity for a little more reach.

```board
size: 19
black: R16
labels: P17=a, P16=b, O17=c, O16=d
caption: The 3-4 stone at R16 and its four enclosures: a small knight, b one-point, c large knight, d two-point. All four are joseki; a is the one to learn first.
```

## The approach and the diagonal

White's basic approach to R16 is the small knight's move at P17 — the same point Black wanted. Black's steadiest answer is the diagonal move Q15, which the dictionary and everyone else call *Shusaku's diagonal* after the game of 1846, where it was played as move 9. It connects the corner solidly, faces the approach stone, and threatens to press on it later. White then extends along the top to make a base: three spaces to L17 is the common choice; Black can then press at N17.

```sgf
(;GM[1]FF[4]SZ[19]C[The 3-4 point, the knight's approach, Shusaku's diagonal, White's extension. Step through.];B[qd]C[The 3-4 point, R16: three lines from the right, four from the top. Its open side is along the top.];W[oc]C[The approach at P17, the point Black would have used to enclose.];B[pe]C[Shusaku's diagonal, Q15. Solid: the corner is connected and the stone looks at White's.];W[kc]C[White extends three spaces along the top to L17 for a base. The joseki is complete.];B[mc]C[Later, Black can press at N17, leaning on the white stones; for now both sides can play elsewhere.])
```

```sgf
(;GM[1]FF[4]SZ[19]C[The other common extension: White settles on the right side instead.];B[qd];W[oc];B[pe];W[qi]C[R11: White extends down the right side instead of along the top.];B[mc]C[Then Black's usual move is N17, pressing the approach stone from the top.])
```

Shusaku's diagonal is slow by modern standards — the dictionary lists a dozen other answers, pincers among them — but it is never wrong, and for a player learning the game its virtue is exactly that.

## Problems

<p class="puzzle-intro">1 · Black to play. Enclose your 3-4 stone (any of the four enclosures).</p>

```try
size: 19
black: R16 D4
white: D16 Q4
solution: (P17) (P16) (O17) (O16)
hint: Along the top, a knight's move or a jump from R16.
prompt: Enclose the corner.
success: P17, P16, O17 or O16. The small knight's enclosure at P17 is the classic; learn that one first and the others when you know why you want them.
```

<p class="puzzle-intro">2 · Black to play. White has approached at P17. Answer with Shusaku's diagonal and follow the joseki.</p>

```try
size: 19
black: R16 D4
white: P17 D16 Q4
solution: Q15 (L17 N17) (R11 N17)
hint: The diagonal move towards the approach stone.
prompt: Answer the approach.
success: Q15. Whether White extends along the top or down the side, your follow-up is N17, pressing the approach stone. The corner is yours and solid.
```

<p class="puzzle-intro">3 · White to play. Black has answered your approach with the diagonal. Make a base.</p>

```try
size: 19
turn: w
white: P17 D16 Q4
black: R16 Q15 D4
solution: (L17) (M17) (K17) (R11)
hint: Extend along the top — two, three or four spaces — or down the right side.
prompt: Settle the approach stone.
success: L17, the three-space extension, is the common choice; M17 and K17 are the tighter and wider versions, and R11 takes the side instead. All are joseki; which is best depends on the stones nearby.
```

## Remember

- 3-4 stone alone: enclose it — small knight's move first.
- Approached at the knight's move: Shusaku's diagonal, then let White extend.
- The follow-up press at N17 is yours whenever you want it.

+++ Read more: the diagonal in 1846
In the ear-reddening game, White approached Shusaku's R16 at P17 as early as move 4. Shusaku took the last empty corner first (C4), White enclosed a corner, Shusaku enclosed one, White approached again — and only then, at move 9, came Q15. The diagonal is slow enough that it can wait one move; it is solid enough that it can be played after the opponent has already got a second stone nearby. That combination — never urgent, never wrong — is why it survived two centuries of fashion.
+++
