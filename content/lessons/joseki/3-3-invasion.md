---
id: joseki/3-3-invasion
track: Joseki
title: The 3-3 invasion
lede: The 4-4 stone's open secret is the point underneath it. White plays there, lives in the corner, and Black gets a wall. Twelve moves, from the invasion to the last defence, that every player must know from both sides.
level: 3
sources:
  - Move sequence from Kogo's Joseki Dictionary (Gary Odom, Alexander Dinerchtein and contributors, 2014-02-25, http://waterfire.us/joseki.htm), the 4-4 point, the 3-3 invasion with the block — used as a move list only; the dictionary's commentary is copyrighted and not reproduced. Checked for legality by the site's rules engine; the mirror-image line is ours by symmetry and checked the same way.
  - Wikipedia, "Jōseki" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Joseki
  - The problems play the line through with you; the accepted moves are the dictionary's, nothing else. Whether the white corner lives at the end is not checked by the site's life search (the wall is open on one side); it is the dictionary's and everyone's judgement.
---

## The sequence

Black has a 4-4 stone at Q16; White invades at the 3-3 point, R17. Black blocks on one side — here from the right, at R16 — and White crawls along the other, on the second line, while Black follows on the third. Then White turns back into the corner with two hanes, and Black finishes by defending the cut. White lives with a few points; Black has a wall along the top.

```sgf
(;GM[1]FF[4]SZ[19]C[The 3-3 invasion under a 4-4 stone, blocked from the right. Step through.];B[pd]C[Black's 4-4 stone.];W[qc]C[The invasion at the 3-3 point, R17.];B[qd]C[Black blocks at R16: Black chooses to keep the right side and give White the top of the corner.];W[pc]C[White extends along the top, Q17.];B[oc]C[Black hanes on top: P17.];W[ob]C[White extends underneath: P18.];B[nc]C[Black extends: O17.];W[nb]C[White extends: O18.];B[mc]C[Black extends once more: N17. The wall is three stones long.];W[rd]C[Now White turns back into the corner with the hane at S16.];B[re]C[Black blocks at S15.];W[rc]C[White connects at S17. The corner group is alive.];B[qf]C[Black defends the cutting point with R14. Joseki: White has a small living corner; Black has a wall facing the top and the right side outside it.])
```

## Which side to block

The block decides where the wall goes. Block at R16 and the wall faces the top; block at Q17 and it faces the right side. Block on the side where the wall will be worth more — where you have stones for it to work with, or where the opponent has none. The mirror image of the sequence is the same joseki turned over:

```sgf
(;GM[1]FF[4]SZ[19]C[The same invasion, blocked from the top instead. Black's wall now faces the right side.];B[pd];W[qc];B[pc]C[Block at Q17.];W[qd];B[qe];W[re];B[qf];W[rf];B[qg]C[The wall runs down the right side.];W[pb];B[ob];W[qb];B[nc]C[And Black defends the cut at O17.])
```

## What each move is for

- **The invasion** takes territory now, in a corner the 4-4 stone was only claiming. It gives up the outside.
- **The block** chooses the direction of the wall — the most important move of the sequence for Black.
- **The crawl** on the second line is White living; Black's answers on the third line are the wall. Each pair is one point for White and a stone of thickness for Black.
- **The two hanes** into the corner make the group's eyes; Black's block and final defence keep the wall free of cuts.

## Problems

<p class="puzzle-intro">1 · Black to play. White has invaded at the 3-3 point. Block — from either side — and play the joseki through.</p>

```try
size: 19
black: Q16
white: R17 D4
solution: (R16 (Q17 P17 (P18 O17 (O18 N17 (S16 S15 (S17 R14)))))) (Q17 (R16 R15 (S15 R14 (S14 R13 (Q18 P18 (R18 O17))))))
hint: Block on one side of the invading stone, then follow White along, then defend the cut at the end.
prompt: Answer the invasion.
success: The block, the wall, the defence of the cut. White lives small; you have a wall facing whichever side you chose. Choosing that side well is the whole art of this joseki.
```

<p class="puzzle-intro">2 · White to play. Invade under the 4-4 stone and live, following the joseki after Black blocks from the right.</p>

```try
size: 19
turn: w
white: D4 D16
black: Q16 K17
solution: R17 (R16 Q17 (P17 P18 (O17 O18 (N17 S16 (S15 S17)))))
hint: The 3-3 point, then crawl along the top on the second line, then turn back into the corner.
prompt: Invade and live.
success: R17, then the crawl and the two hanes: the white group has eyes at the top edge and the corner. Black's wall faces the stone at K17 — which is why, in a real game, you would think twice before invading here.
```

## Remember

- The 3-3 point under a 4-4 stone is always open. Twelve moves from the invasion to the defence of the cut; know them from both sides.
- Black's block chooses the direction of the wall. Block towards where the wall is worth more.
- White gets a small corner and ends in gote; Black gets a wall. Fair — if the wall faces something.

+++ Read more: the invasion after 2016
Until the AlphaGo matches, professionals invaded at 3-3 late, when the wall would be worth little; the sequence above, with the wall, was the reason. Programs played the invasion early and often, and the standard follow-ups changed with them. Those modern lines are not in the 2014 dictionary these lessons are drawn from, so they are not shown here; the classical sequence is still correct, still joseki, and the one to learn first. When you meet a modern version, you will recognise most of its moves.
+++
