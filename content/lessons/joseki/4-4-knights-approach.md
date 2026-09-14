---
id: joseki/4-4-knights-approach
track: Joseki
title: "4-4 point: the knight's approach"
lede: A joseki is a corner sequence that both sides have agreed, over centuries of play, gives a fair result. This is the most common one on the board — the approach to a 4-4 stone, and the three quiet answers to it.
level: 3
sources:
  - Wikipedia, "Jōseki" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Joseki — the definition ("a studied sequence of moves for which the result is considered balanced for both black and white sides")
  - Move sequences from Kogo's Joseki Dictionary (Gary Odom, Alexander Dinerchtein and contributors, edition of 2014-02-25, http://waterfire.us/joseki.htm), the 4-4 point, one-space low approach — used as move lists only; the dictionary's own commentary is copyrighted and is not reproduced here. Every line is checked for legality by the site's rules engine; whether a move is "joseki" is the dictionary's judgement, and there is no engine behind it.
  - The problems play the joseki through with you: the accepted moves are the dictionary's lines, nothing else.
---

## The approach

Black has a 4-4 stone; White approaches with a knight's move on the third line. In the top-right corner that is Black Q16, White R14. It is the standard approach to the 4-4 point, and Black's basic answers are all quiet: a one-space jump, a knight's move, or a large knight's move along the top. Each keeps the corner and leaves White to make a base on the right side.

```sgf
(;GM[1]FF[4]SZ[19]C[Black 4-4, White's knight's approach, Black's one-space jump, White's two-space extension. The commonest shape in Go. Step through with the arrows.];B[pd]C[The 4-4 point.];W[qf]C[The knight's approach on the third line: R14.];B[nd]C[The one-space jump, O16. Black keeps the corner loosely and looks along the top.];W[qj]C[White extends two spaces down the right side to make a base. The joseki is complete: both sides have a position, neither has territory yet.];B[jc]C[Black may now extend along the top; K17 is the usual point. Or play elsewhere.])
```

## The slide

Instead of extending at once, White can slide under the corner first, at S16. Black blocks at R17 to keep the corner, and White then extends, one line shorter than before because the slide has already taken some of the corner.

```sgf
(;GM[1]FF[4]SZ[19]C[The same approach and answer, with White sliding under the corner before extending.];B[pd];W[qf];B[nd]C[The one-space jump again.];W[rd]C[The slide, S16: White takes some of the corner from underneath.];B[qc]C[Black blocks at R17. Not answering the slide would hand over the whole corner.];W[qi]C[White extends to R11 — one line closer than R10, because the slide has already made the group solid.];B[jc]C[Black extends along the top.])
```

Black's knight's-move answer at O17 works the same way: solid and low, and the slide-block-extend sequence follows it just as before.

```sgf
(;GM[1]FF[4]SZ[19]C[The knight's-move answer.];B[pd];W[qf];B[nc]C[O17, the knight's move: lower and more solid than the jump, with less reach into the centre.];W[rd]C[The slide.];B[qc]C[The block.];W[qi]C[The extension. Joseki.])
```

## What each move is for

- **The approach** stops Black from making a two-stone corner, and prepares a base on the side.
- **Black's answer** (jump, knight's move, large knight's move) keeps the corner and turns towards the top. None of them attacks the white stone; a *pincer* would, and pincers are a bigger subject.
- **The slide** takes corner territory in exchange for making White lower; **the block** is nearly always the right answer.
- **The extension** gives the white stones eye space. Without it they are a target.

## Problems

<p class="puzzle-intro">1 · Black to play against the approach. Answer it — the jump or the knight's move — and follow the joseki through.</p>

```try
size: 19
black: Q16
white: R14 D4
solution: (O16 (S16 R17 (R11 K17)) (R10 K17)) (O17 (S16 R17 (R11 pass)))
hint: A quiet move along the top: the one-space jump or the knight's move.
prompt: Answer the approach, then keep going. When the joseki is finished and it is your turn, play elsewhere (Pass).
success: The one-space jump or the knight's move, then the block against the slide, then the extension along the top — or, after the knight's move, a move elsewhere: the joseki is finished and the turn is yours. Moves you will play a thousand times.
```

<p class="puzzle-intro">2 · White to play. Black has answered with the jump; make a base.</p>

```try
size: 19
turn: w
white: R14 D4
black: Q16 O16 D16
solution: (R10) (S16 (R17 R11))
hint: Extend down the side, or slide under the corner first.
prompt: Settle the white stone.
success: R10, the two-space extension, or the slide at S16 first — after Black blocks at R17, extend to R11. Either way the white stone has a base and the joseki is finished.
```

## Remember

- 4-4 stone, knight's approach: answer with a jump or a knight's move along the top.
- Slide → block → extend. Never leave the slide unanswered.
- Both sides end with a position, not with territory. That is what "balanced" means.

+++ Read more: why not attack
A beginner's instinct is to attack the approach stone at once with a pincer — a stone on the other side of it. Pincers are real joseki too, and there are dozens, but they lead to fights that depend on the whole board, and the sequences run long. The quiet answers above are enough for a long time: they give a sound corner every time, and they leave the choice of fight for later, when you can see the rest of the board.
+++
