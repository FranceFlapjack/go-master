---
id: life-and-death/false-eyes
track: Life and death
title: False eyes
lede: An eye is a point the opponent can never fill. Some points look exactly like that and are not, because the stones around them can be captured one chain at a time. Learn to tell the two apart by the diagonals.
level: 2
sources:
  - Wikipedia, "Eye (Go)" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Eye_(Go) — the diagonal rule for real and false eyes
  - Positions composed for this lesson; every problem and every diagram carrying a `life:` line is read to the end by the site's life-and-death search, including the uniqueness of the answer.
---

## The diagonal rule

An eye is an empty point whose four neighbours are all your stones. That is not enough: the stones around the point must also be **connected to each other**, and around a single point they connect only through the diagonals. If the opponent holds enough of the diagonal points, the stones next to the eye are separate chains, each of which can be put in atari — and then the "eye" has to be filled to save them, or a stone lands in it with a capture.

- In the **centre**, you need three of the four diagonal points (the opponent may hold one).
- On the **edge**, you need both diagonal points.
- In the **corner**, you need the one diagonal point.

An eye that fails this test is a **false eye**. A group whose second eye is false is dead: it has one eye.

```board
size: 9
white: A1 B2 C1 C2 D1 D2 E1 E2 F2 G1 G2
black: A3 B3 C3 D3 E3 F3 G3 H3 H2 H1
life: B2 vital A2
highlight: A2
caption: The white group has two eye points, B1 and F1. F1 is real: its diagonals E2 and G2 are white. B1 is on the edge and one of its diagonals, A2, is empty. Whoever plays A2 decides the group. Black at A2 cuts the stone at A1 off; B1 becomes false, and the group dies. White at A2 connects it, and B1 is a real eye.
```

Read Black's kill: after Black A2, the stone at A1 has one liberty, B1. If White connects at B1, the group has filled its own eye and is left with F1 alone; Black plays F1 and captures everything. If White does nothing, Black captures A1 by playing B1, and there is no eye there at all.

## Problems

<p class="puzzle-intro">1 · The position above. Black to play and kill.</p>

```try
size: 9
black: A3 B3 C3 D3 E3 F3 G3 H3 H2 H1
white: A1 B2 C1 C2 D1 D2 E1 E2 F2 G1 G2
solution: A2 (B1 F1) (pass B1)
expect: dead
target: B2
hint: One of the two eyes has an empty diagonal.
prompt: Kill the white group.
success: A2. If White connects at B1, the group has one eye and F1 takes it; if White ignores you, B1 captures the corner stone. B1 was never an eye, only the shape of one.
```

<p class="puzzle-intro">2 · Mirror image, White to play. Live.</p>

```try
size: 9
turn: w
white: J1 H2 G1 G2 F1 F2 E1 E2 D2 C1 C2
black: J3 H3 G3 F3 E3 D3 C3 B3 B2 B1
solution: J2
expect: live
target: H2
hint: Which eye is not yet real?
prompt: Make two real eyes.
success: J2 connects the corner stone to the group, and H1 is a real eye beside D1. The only move: filling H1 or D1 loses an eye, and anything else lets Black play J2.
```

<p class="puzzle-intro">3 · A group in the open. The eye at G5 has one black diagonal already. Black to play.</p>

```try
size: 9
black: C4 C5 C6 D3 E3 F3 G3 H4 D7 E7 F7 G7 H7 J5 J6
white: D4 E4 F4 G4 D5 F5 H5 D6 E6 F6 G6
solution: H6 (G5 E5) (pass G5)
expect: dead
target: D4
hint: A centre eye needs three of its four diagonals. Count G5's.
prompt: Kill the white group.
success: H6. Now the stone at H5 is cut off with one liberty, and G5 is a false eye: if White connects there, E5 is the group's only eye and you fill it; if not, you capture H5 through G5.
```

<p class="puzzle-intro">4 · The corner eye. White to play and live.</p>

```try
size: 9
turn: w
white: A2 A3 A4 B1 C1 D1 D2 E2 F2 F1
black: A5 B5 B4 B3 C2 C3 D3 E3 F3 G2 G1
solution: B2
expect: live
target: B1
hint: A corner eye has one diagonal. Is it yours?
prompt: Make the corner eye real.
success: B2. The stones on the left edge and the stones along the bottom are now one group with two eyes, A1 and E1. Black at B2 first would have cut them apart: A1 false, one eye, dead.
```

<p class="puzzle-intro">5 · The same corner, Black to play. Kill.</p>

```try
size: 9
black: A5 B5 B4 B3 C2 C3 D3 E3 F3 G2 G1
white: A2 A3 A4 B1 C1 D1 D2 E2 F2 F1
solution: B2 (A1 E1) (pass A1)
expect: dead
target: B1
hint: Take the diagonal.
prompt: Kill the white group.
success: B2. The three stones on the left have one liberty, A1. If White connects there, the whole group has one liberty left, E1, and you take it; if White does nothing, A1 captures the three stones and the corner eye is gone.
```

## Remember

- Centre eye: three of four diagonals. Edge eye: both. Corner eye: the one.
- A false eye can be filled by force: put the cut-off stone in atari and the owner must fill the eye or lose the stone.
- When you count eyes, count diagonals first. A group with a false eye is a group with one eye.

+++ Read more: why the diagonals
A stone next to an eye point touches the eye and its two other neighbours; two stones on opposite sides of the eye never touch each other directly. They connect only through the stones on the diagonal points, or by a longer route around the outside. When the opponent holds a diagonal point, the route through it is closed, and each remaining route is one more thing to defend. The counts in the rule (three, two, one) are the numbers of diagonals a group needs so that the stones around the eye stay one chain with the eye as a shared liberty rather than a set of chains that can be picked off one by one. It is worth setting up a false eye on the board and trying to save it: the moment the cut-off stone is in atari, the eye has to be filled, and then it is not an eye.
+++
