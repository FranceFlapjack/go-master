---
id: life-and-death/tsumego-set-2
track: Life and death
title: Problems, set two
lede: Six more, a little less tidy: stones inside the eye space, an outside liberty that matters, a false eye at the top, and one on the big board.
level: 2
sources:
  - Positions composed for this course (not taken from a classical collection). Every one is read to the end by the site's life-and-death search, which also confirms that the listed answers are the only ones.
  - Every problem is composed with a closed wall and no ko: the search treats the surrounding stones as safe and reports a ko as unknown, so positions were chosen to read out completely.
---

<p class="puzzle-intro">1 · Black to play. Your stone at C1 is inside; use it.</p>

```try
size: 9
black: A4 B4 C4 D4 E4 E3 F2 F1 C1
white: A3 B3 C3 D3 D2 E2 E1 A2
solution: (B2 (C2 A1) (A1 C2) (B1 A1) (D1 A1)) (B1 (B2 C2) (C2 B2) (A1 B2) (D1 B2))
expect: dead
target: A3
hint: The white stone at A2 is cut off from the rest on one side. Two moves work; both use the stone at C1.
prompt: Kill the white group.
success: B2 or B1. Either way White's stones on the left are separated from those on the right, and the one eye they could share is never made: whatever White tries, you answer on the point that keeps it to one.
```

<p class="puzzle-intro">2 · White to play. Live in the corner, with a stone of yours already at D1.</p>

```try
size: 9
turn: w
white: A4 B4 B3 C3 C2 D1
black: A5 B5 C5 C4 D4 D3 D2 E1
solution: A2 (B2 A1) (A1 B2) (B1 C1) (C1 B1)
expect: live
target: A4
hint: Which point makes two separate spaces out of one?
prompt: Make two eyes.
success: A2. It leaves A3 as one eye and the corner points around B1 as a second space, and every black move inside it has an answer on the other side. The tempting A3 or B2 both fail to A2: Black takes the point you needed and the rest is one shape with one eye.
```

<p class="puzzle-intro">3 · Black to play. A five-point space in the top-right corner.</p>

```try
size: 9
black: J4 H4 G4 F4 F3 E3 E2 E1
white: J3 H3 G3 G2 F2 F1
solution: H1 (H2 J2) (J2 H2) (G1 H2) (J1 H2)
expect: dead
target: J3
hint: A square with a tail. The point that touches three others.
prompt: Kill the white group.
success: H1, the vital point of the bulky five. After it every white move leaves a shape with one eye at most, and you keep answering at the point that matters — usually H2.
```

<p class="puzzle-intro">4 · White to play. Five along the bottom, and Black has not yet played the hane at F1. Live.</p>

```try
size: 9
turn: w
white: A2 B2 C2 D2 E2
black: F2 G1 A3 B3 C3 D3 E3 F3 G2
solution: (B1 (C1 D1) (D1 E1) (E1 D1) (F1 D1)) (E1 (B1 C1) (C1 B1) (A1 B1) (F1 B1))
expect: live
target: A2
hint: The second point from either end.
prompt: Make two eyes.
success: B1 or E1. Both leave a space that Black cannot reduce to a dead shape from either end. The corner point A1 fails to B1, and the middle C1 fails to E1: try them and see.
```

<p class="puzzle-intro">5 · Black to play, on the 13×13 board. Kill the white group in the top-right corner.</p>

```try
size: 13
black: N10 M10 L10 L11 K11 J12 J13
white: N11 M12 M11 L12 K13 K12
solution: M13 (N12 N13) (N13 N12) (L13 N12)
expect: dead
target: N11
hint: Problem 2 of the first set, turned round and on a bigger board.
prompt: Kill the white group.
success: M13. The eye space is the bent four you have seen before, and the vital point is the one touching the most other points. The board is bigger; the corner is the same size.
```

<p class="puzzle-intro">6 · Black to play. Two eyes along the top edge — or are they?</p>

```try
size: 9
black: A7 B7 C7 D7 E7 F7 G7 H7 H8 H9
white: A9 B8 C9 C8 D9 D8 E9 E8 F8 G9 G8
solution: A8 (B9 F9) (pass B9)
expect: dead
target: B8
hint: Check the diagonals of each eye.
prompt: Kill the white group.
success: A8. The eye at B9 has an empty diagonal, and taking it cuts off the stone at A9. If White connects at B9 the group has one eye, and F9 takes it; if White does nothing, you capture A9 through B9.
```

## Remember

- A stone of yours inside the enemy's space is worth a liberty count of its own: it may be the eye they were going to make.
- The hane on the first line shrinks an eye space by one point; the vital point of what is left is the move.
- The corner is the same size on every board.
