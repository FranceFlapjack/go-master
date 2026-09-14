---
id: life-and-death/corner-shapes
track: Life and death
title: Life in the corner
lede: The edge and the corner take liberties away, and a group that would live in the open dies against the side. Two counting rules cover most of it, and the 2-2 point is where the exceptions live.
level: 2
sources:
  - Wikipedia, "Life and death" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Life_and_death
  - The counting proverbs ("on the second line, six die and eight live"; "in the corner, four die and six live") are traditional; every diagram here that states a status carries a `life:` line and was read to the end by the site's life-and-death search, and so was every problem.
  - Positions composed for this lesson.
  - Every problem here is composed with a closed wall and no ko: the search treats the surrounding stones as safe and reports a ko as unknown, so positions were chosen to read out completely.
---

## Groups on the second line

A group lying along the second line has the first line as its only eye space. How many stones it needs to live is a matter of counting, and the answer is a proverb: **six die, eight live** — seven depends on who plays first.

```board
size: 9
white: B2 C2 D2 E2 F2 G2
black: A2 H2 A3 B3 C3 D3 E3 F3 G3 H3 J1 J2
life: B2 dead
caption: Six stones on the second line, enclosed. Dead, even with White to play: the eye space along the edge is too short to be split into two eyes once Black plays in from the ends.
```

```board
size: 9
white: B2 C2 D2 E2 F2 G2 H2
black: A2 J2 A3 B3 C3 D3 E3 F3 G3 H3 J3
life: B2 first
caption: Seven stones. Whoever plays first decides it: White lives with B1, E1 or H1; Black kills with B1 or H1, the points a hane would take.
```

```board
size: 13
white: C2 D2 E2 F2 G2 H2 J2 K2
black: B2 L2 B1 L1 B3 C3 D3 E3 F3 G3 H3 J3 K3 L3
life: C2 alive
caption: Eight stones (here on a 13×13 board). Alive without a move, even after Black has played both hanes at B1 and L1.
```

## Groups in the corner

The corner is cheaper: one side is already walled off. **Four die, six live** — five depends.

```board
size: 9
white: A2 B2 C2 D2
black: E2 E1 A3 B3 C3 D3 E3
life: A2 dead
caption: Four stones in the corner: dead as they stand.
```

```board
size: 9
white: A2 B2 C2 D2 E2
black: F2 F1 A3 B3 C3 D3 E3 F3
life: A2 first
caption: Five: whoever plays first — B1 or E1 for either side.
```

```board
size: 9
white: A2 B2 C2 D2 E2 F2
black: G2 G1 A3 B3 C3 D3 E3 F3 G3
life: A2 alive
caption: Six: alive.
```

## The 2-2 point

Corner eye spaces have a special point, the 2-2 point (B2 in the bottom-left corner), where a stone is hard to capture because the corner takes two of its liberties away for free. The rectangular six from the eye-shape lesson is the standard example: alive in the open, but in the corner it depends on the group's outside liberties.

```board
size: 9
white: A3 B3 C3 D3 D2 D1
black: A4 B4 C4 D4 E4 E3 E2 E1
life: A3 first
caption: Rectangular six in the corner with no outside liberties. Black kills at B2 (B1 works too); White lives with either of the same points. With two or more outside liberties the same shape is alive without a move; with exactly one it is a ko.
```

## Problems

<p class="puzzle-intro">1 · Seven on the second line, White to play. Live.</p>

```try
size: 9
turn: w
white: B2 C2 D2 E2 F2 G2 H2
black: A2 J2 A3 B3 C3 D3 E3 F3 G3 H3 J3
solution: (B1 (D1 E1) (H1 D1) (G1 F1)) (E1 (B1 C1) (H1 G1)) (H1 (F1 E1) (B1 C1) (C1 D1))
expect: live
target: B2
hint: Take one of the points Black's hane would take, or the middle.
prompt: Make two eyes.
success: B1, H1 or E1 all live: each leaves an eye space that Black can no longer cut down to a dead shape from both ends. Seven on the second line: the first player wins it.
```

<p class="puzzle-intro">2 · Seven on the second line, Black to play. Kill.</p>

```try
size: 9
black: A2 J2 A3 B3 C3 D3 E3 F3 G3 H3 J3
white: B2 C2 D2 E2 F2 G2 H2
solution: (B1 (C1 E1) (E1 G1) (F1 D1) (H1 F1)) (H1 (G1 E1) (E1 C1) (D1 F1) (B1 D1))
expect: dead
target: B2
hint: Play in from one end, on the first line.
prompt: Kill the white group.
success: B1 or H1, the hane on the first line. Whatever White does to divide the rest, you take the vital point of what is left, and the middle point E1 — the one that would have saved White — is no longer enough.
```

<p class="puzzle-intro">3 · Five in the corner, White to play. Live.</p>

```try
size: 9
turn: w
white: A2 B2 C2 D2 E2
black: F2 F1 A3 B3 C3 D3 E3 F3
solution: (B1 (C1 D1) (D1 E1) (E1 D1)) (E1 (B1 C1) (C1 B1) (A1 B1))
expect: live
target: A2
hint: Not the corner, not the middle: the second point from either end.
prompt: Make two eyes.
success: B1 or E1. After B1, A1 is one eye and C1–E1 is a straight three whose middle you will take when Black plays inside; after E1 the corner is a straight four that Black cannot kill.
```

<p class="puzzle-intro">4 · Five in the corner, Black to play. Kill.</p>

```try
size: 9
black: F2 F1 A3 B3 C3 D3 E3 F3
white: A2 B2 C2 D2 E2
solution: (B1 (C1 E1) (E1 C1) (A1 C1)) (E1 (B1 D1) (D1 B1) (A1 B1))
expect: dead
target: A2
hint: The points White needed.
prompt: Kill the white group.
success: B1 or E1, the second point from an end. Whatever White does with the rest, the vital point of what remains is yours, and White never gets a second eye.
```

<p class="puzzle-intro">5 · Rectangular six in the corner, no outside liberties. Black to play and kill.</p>

```try
size: 9
black: A4 B4 C4 D4 E4 E3 E2 E1
white: A3 B3 C3 D3 D2 D1
solution: (B2 (A2 B1) (C2 A2) (B1 A2) (C1 A2)) (B1 (A2 B2) (B2 A2) (C2 A2) (A1 B2))
expect: dead
target: A3
hint: The 2-2 point.
prompt: Kill the white group.
success: B2, the 2-2 point (B1 also works). In the open, White would simply answer and live; here the corner and the missing outside liberties turn every answer into a shortage of liberties. This is the exception every player learns once and then never forgets.
```

## Remember

- Second line: six die, eight live, seven depends on the first move.
- Corner: four die, six live, five depends.
- In the corner, look at the 2-2 point first, for both sides.
- Rectangular six in the corner: alive with two outside liberties, ko with one, dead with none.

+++ Read more: why the counts are what they are
A group's eye space along the edge is what is left after the opponent plays in from both ends (the *hane*). Six stones on the second line leave a space of four along the first line after both hanes, and those four are split by one stone in the middle: dead. Eight leave six, which is a straight six — alive. Seven leave five, alive or dead by who plays first. In the corner one end is the board's own edge and cannot be reduced, so each count drops by two. None of this needs memorising if you can count, but the proverbs are quicker in a game, and they are worth checking once against the search, as these diagrams were.
+++
