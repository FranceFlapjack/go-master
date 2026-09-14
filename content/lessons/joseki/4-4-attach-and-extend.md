---
id: joseki/4-4-attach-and-extend
track: Joseki
title: "4-4 point: attach and extend"
lede: When Black wants a wall rather than a corner, there is a joseki for that too — attach to the approach stone, extend when White hanes, and let White have the side in exchange for thickness facing the top.
level: 3
sources:
  - Move sequence from Kogo's Joseki Dictionary (Gary Odom, Alexander Dinerchtein and contributors, 2014-02-25, http://waterfire.us/joseki.htm), the 4-4 point, one-space low approach, the "tsuke-nobi" line — used as a move list only; the dictionary's commentary is copyrighted and not reproduced. Checked for legality by the site's rules engine; the judgement that it is joseki is the dictionary's.
  - Wikipedia, "Jōseki" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Joseki
  - The problems play the line through with you; the accepted moves are the dictionary's, nothing else.
---

## Attach and extend (tsuke-nobi)

Black 4-4, White's knight's approach — and now Black attaches to the approach stone from above, at Q14. White hanes underneath at Q13; Black extends to P14; White hanes again at R15; Black blocks at R16; White extends to R10 for a base; Black extends along the top. Nine moves, and the result is a white group on the side with territory, and a black wall facing the top with the corner behind it.

```sgf
(;GM[1]FF[4]SZ[19]C[Attach and extend: Black gives up the right side for a wall facing the top. Step through.];B[pd]C[The 4-4 point.];W[qf]C[The approach.];B[pf]C[The attachment, Q14, from above. Black is not trying to keep the side; Black wants a wall.];W[pg]C[White hanes underneath.];B[of]C[Black extends: P14. The attach-and-extend that names the joseki.];W[qe]C[White hanes at R15, pushing into the corner.];B[qd]C[Black blocks at R16, keeping the corner.];W[qj]C[White extends to R10 for a base on the side. The joseki is complete.];B[jc]C[Black extends along the top to make the wall pay: K17. With a stone already there, Black could play elsewhere.])
```

## When to choose it

The quiet answers of the previous lesson keep the corner and give White the side. This one gives White *more* of the side and takes a wall instead. A wall is worth playing for when it faces something — a black stone already along the top, or a framework in the centre. Facing nothing, a wall is stones without territory, and the quiet answers are better.

## Problems

<p class="puzzle-intro">1 · Black to play. Answer the approach with the attach-and-extend joseki and play it through.</p>

```try
size: 19
black: Q16
white: R14 D4
solution: Q14 (Q13 P14 (R15 R16 (R10 K17)))
hint: Attach to the white stone from above, then extend when White hanes.
prompt: Play the attach-and-extend joseki.
success: Q14, P14, R16, and then K17 along the top once White has extended for a base. White has the side; you have the corner and a wall that faces the top — where your next stones should go.
```

<p class="puzzle-intro">2 · White to play. Black has attached at Q14. Continue the joseki.</p>

```try
size: 19
turn: w
white: R14 D4
black: Q16 Q14 D16
solution: Q13 (P14 R15 (R16 R10))
hint: Hane underneath, then hane into the corner, then make a base.
prompt: Continue the joseki.
success: Q13, R15, R10: the hane under, the hane into the corner, and the extension for a base. White gets the right side; Black gets the wall. Balanced — as long as Black's wall has somewhere to face.
```

## Remember

- Attach and extend: Q14, P14, R16 against the knight's approach. Black gets a wall, White the side.
- Play it when the wall will face your own stones. Otherwise, the quiet answers.
- Both players should know both joseki: the choice between them is the whole skill.
