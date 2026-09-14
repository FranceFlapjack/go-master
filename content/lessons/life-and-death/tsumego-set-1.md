---
id: life-and-death/tsumego-set-1
track: Life and death
title: Problems, set one
lede: Six positions from the shapes of this track, turned and mixed so that you have to read them rather than recognise them. Say who is to play, count the eye space, find the vital point.
level: 2
sources:
  - Positions composed for this course (not taken from a classical collection). Every one is read to the end by the site's life-and-death search, which also confirms that the listed answers are the only ones.
  - Every problem is composed with a closed wall and no ko: the search treats the surrounding stones as safe and reports a ko as unknown, so positions were chosen to read out completely.
---

## How to read a problem

1. Find the group in question and count its eye space: which empty points can only ever be its eyes?
2. Name the shape. Three, four, five — straight, bent, square, pyramid, bulky.
3. Find the vital point, the point that touches the most others. Check the diagonals of any single eye.
4. Only then play. If the first move is wrong, the board will tell you; read again before the second try.

<p class="puzzle-intro">1 · Black to play. Kill the white group in the top-right corner.</p>

```try
size: 9
black: E9 E8 F7 G7 H7 J7
white: F9 F8 G8 H8 J8
solution: H9 (G9 J9) (J9 G9)
expect: dead
target: F9
hint: Three in a row along the top edge.
prompt: Kill the white group.
success: H9, the middle of the straight three. Whichever side White fills, you capture at the other. The shape is the same as in the corner where you first met it; only the direction changed.
```

<p class="puzzle-intro">2 · Black to play. The white eye space bends round the corner.</p>

```try
size: 9
black: A4 B4 C4 C3 D3 E2 E1
white: A3 B2 B3 C2 D1 D2
solution: B1 (A2 A1) (A1 A2) (C1 A2)
expect: dead
target: A3
hint: Four points in an L. Which one touches the most of the others?
prompt: Kill the white group.
success: B1. It touches A1 and C1, and it makes A2 and A1 a bent two that can never be two eyes. If White plays A2, you play A1; if A1, then A2; if C1, then A2 again. A bent four is alive in the open; this one is squeezed into the corner with no outside liberties, and it dies.
```

<p class="puzzle-intro">3 · White to play. A black stone sits inside your eye space. Live.</p>

```try
size: 9
turn: w
white: A2 B2 C2 D2 E2 E1
black: A3 B3 C3 D3 E3 F2 F1 B1
solution: C1 (pass A1)
expect: live
target: A2
hint: The stone at B1 has two liberties. Take the one that also divides the space.
prompt: Make two eyes.
success: C1. Now B1 has one liberty, A1, and Black cannot play there — it would be a stone with no liberties capturing nothing. You capture at A1 whenever you like, and D1 is your second eye. Any other move, and Black plays C1 and the space is gone.
```

<p class="puzzle-intro">4 · The same position, Black to play. Kill.</p>

```try
size: 9
black: A3 B3 C3 D3 E3 F2 F1 B1
white: A2 B2 C2 D2 E2 E1
solution: C1 (A1 D1) (D1 A1)
expect: dead
target: A2
hint: The same point White needed.
prompt: Kill the white group.
success: C1. Your two stones have two liberties, A1 and D1, and so has the white group. If White takes one, you take the other and capture. The point that lives for one side kills for the other — that is what "vital" means.
```

<p class="puzzle-intro">5 · White to play. Live, by dealing with the black stone at C1.</p>

```try
size: 9
turn: w
white: A3 B3 C3 D3 D2 E2 E1 A2
black: A4 B4 C4 D4 E4 E3 F2 F1 C1
solution: B1 (B2 C2) (C2 B2) (D1 B2)
expect: live
target: A3
hint: Put the stone in atari from the side that leaves you room for an eye behind it.
prompt: Make two eyes.
success: B1. The black stone at C1 now has one liberty, D1. If Black pushes in at B2 you answer C2, and if at C2 you answer B2; if Black extends to D1 you connect at B2 and the captured stones will give you your second eye. Capturing from the other side, at D1, fails: Black answers B2, and the stone at A2 is cut off and short of liberties.
```

<p class="puzzle-intro">6 · White to play. The group looks short of space. Live.</p>

```try
size: 9
turn: w
white: A3 B3 C3 D2 D1
black: A4 B4 C4 D4 D3 E2 E1
solution: B1 (A2 B2) (B2 A2) (C2 A2) (A1 A2) (C1 C2)
expect: live
target: A3
hint: Extend down to the edge, not along it.
prompt: Make two eyes.
success: B1, the descent to the first line. It splits the space into A1–A2 on one side and C1–C2 on the other, and whichever side Black plays into, you answer on the same side and keep an eye there. Playing on the second line instead leaves a straight three or a bent three that Black takes the middle of.
```

## Remember

- Say who is to play before you count anything.
- Name the shape, then find the vital point. When a stone of the other colour sits inside, count its liberties too.
- The point that lives for one side kills for the other.
