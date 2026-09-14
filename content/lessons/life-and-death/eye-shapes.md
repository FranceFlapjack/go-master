---
id: life-and-death/eye-shapes
track: Life and death
title: "Eye shapes: three, four, five in a row"
lede: A group lives with two eyes. Whether an enclosed space can be made into two eyes depends on its shape, and for the small shapes the answer is a short list that every player learns by heart.
level: 2
sources:
  - Wikipedia, "Life and death" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Life_and_death — the standard names of the eye shapes and their status
  - Arthur Smith, The Game of Go (1908), chapter III, on eyes and "the shapes which can be made into two eyes" — public domain, https://www.gutenberg.org/ebooks/66632
  - Positions composed for this lesson; the status of every shape and every problem is read to the end by the site's life-and-death search (`expect: live` / `expect: dead`), which also confirms that no other first move works.
---

## The eye space

When a group is enclosed, what matters is the empty space inside it: its **eye space**. If the opponent cannot stop the group from dividing that space into two separate eyes, the group lives. For the smallest spaces the outcome depends only on the shape and on who plays first, so they are worth memorising.

```board
size: 9
white: A2 B2 C2 D2 D1
black: A3 B3 C3 D3 E2 E1
life: A2 vital B1
highlight: B1
caption: Straight three — A1, B1, C1. Whoever plays the middle point decides it. White at B1 makes two eyes, A1 and C1. Black at B1 leaves White with one eye at best: after Black B1, White A1 is atari on the black stone, and Black C1 captures the whole group.
```

```board
size: 9
white: A3 B3 B2 C2 C1
black: A4 B4 C4 C3 D3 D2 D1
life: A3 vital A1
highlight: A1
caption: Bent three — A1, A2, B1. The vital point is the middle point of the three, here the corner. White at A1: two eyes. Black at A1: dead.
```

```board
size: 9
white: A2 B2 C2 D2 E2 E1
black: A3 B3 C3 D3 E3 F2 F1
life: A2 alive
caption: Straight four — alive without a move. If Black plays B1, White answers C1 (or the other way round), and A1 and D1 are two eyes.
```

```board
size: 9
white: A3 B3 C3 C2 C1
black: A4 B4 C4 D3 D2 D1
life: A3 dead
caption: Square four — dead without a move. Wherever White plays inside, Black takes the diagonal point and the rest is a bent three with Black to play. Do not add stones to a square four; it is already lost.
```

```board
size: 9
white: A3 B3 C3 D3 D2 D1
black: A4 B4 C4 D4 E4 F3 F2 E1
life: A3 alive
caption: Rectangular six — alive, like the straight four, as long as the group has two outside liberties. (With none, the corner version is a famous exception, dead to a stone at B2; with one, it is a ko. Both are for later.)
```

## Shapes with a vital point

Some shapes are alive or dead depending on who plays first at one point, the **vital point**. It is the point that touches the most other points of the space: play there and the rest cannot be split in two.

```board
size: 9
white: A3 B3 C3 C2 D2 D1
black: A4 B4 C4 D4 D3 E3 E2 E1
life: A3 vital B1
highlight: B1
caption: Bulky five — a square four with a tail (A1, A2, B1, B2, C1). The vital point is B1, the point that touches three others.
```

```board
size: 9
white: A3 B3 C3 A2 C2 D1 D2
black: A4 B4 C4 D4 D3 E2 E1
life: A3 vital B1
highlight: B1
caption: Pyramid four — A1, B1, C1 and B2. The vital point is the centre, B1.
```

## Problems

<p class="puzzle-intro">1 · Straight three, Black to play. Kill the white group.</p>

```try
size: 9
black: A3 B3 C3 D3 E2 E1
white: A2 B2 C2 D2 D1
solution: B1 (A1 C1) (C1 A1)
expect: dead
target: A2
hint: Three in a row: the middle point.
prompt: Kill the white group.
success: B1, the middle point. If White ataris the stone from either side, you capture the whole group at the other end. White cannot make two eyes.
```

<p class="puzzle-intro">2 · The same shape, in the other corner, White to play. Live.</p>

```try
size: 9
turn: w
white: J2 H2 G2 F2 F1
black: J3 H3 G3 F3 E2 E1
solution: H1
expect: live
target: J2
hint: The same point that would have killed you.
prompt: Make two eyes.
success: H1 splits the three into two eyes, J1 and G1. Whoever plays the middle point of a straight three decides it.
```

<p class="puzzle-intro">3 · Bent three in the corner, Black to play. Kill.</p>

```try
size: 9
black: A4 B4 C4 C3 D3 D2 D1
white: A3 B3 B2 C2 C1
solution: A1 (B1 A2) (A2 B1)
expect: dead
target: A3
hint: The middle point of a bent three is the point where it bends.
prompt: Kill the white group.
success: A1, the bend. Whichever side White fills, the other point captures. The corner point looks harmless and is the whole problem.
```

<p class="puzzle-intro">4 · Pyramid four, White to play. Live.</p>

```try
size: 9
turn: w
white: J3 H3 G3 J2 G2 F1 F2
black: J4 H4 G4 F4 F3 E2 E1
solution: H1
expect: live
target: J3
hint: Which point of the four touches three others?
prompt: Make two eyes.
success: H1, the centre of the pyramid. It leaves J1, G1 and H2 as three separate eyes, more than enough. Black at H1 first would have killed the group.
```

<p class="puzzle-intro">5 · Bulky five, Black to play. Kill.</p>

```try
size: 9
black: A4 B4 C4 D4 D3 E3 E2 E1
white: A3 B3 C3 C2 D2 D1
solution: B1 (A2 B2) (B2 A2) (C1 B2) (A1 B2)
expect: dead
target: A3
hint: Find the point that touches three others.
prompt: Kill the white group.
success: B1. Whatever White does now, the space is a bent three or a square with Black already inside, and there is no second eye. A bulky five is decided by its vital point, like the three-point shapes.
```

<p class="puzzle-intro">6 · Bulky five, White to play. Live.</p>

```try
size: 9
turn: w
white: J3 H3 G3 G2 F2 F1
black: J4 H4 G4 F4 F3 E3 E2 E1
solution: H1
expect: live
target: J3
hint: Same shape, same point.
prompt: Make two eyes.
success: H1. G1 is one eye, and J1, J2, H2 are a bent three that Black cannot destroy while G1 stands: a black stone inside is captured and leaves an eye behind. The vital point works for both sides: whoever takes it, wins the shape.
```

## Remember

- Straight three, bent three: whoever plays the middle point first.
- Straight four, bent four (in the open): alive. Square four: dead. Pyramid four: whoever plays the centre first.
- Bulky five: whoever plays the vital point first. Rectangular six: alive, with outside liberties.
- The vital point is the point that touches the most other points of the space. When in doubt, play there.

+++ Read more: how these were checked
Every shape and problem in this track is read to the end by a small program in the site (`js/rules/life-search.js`). It tries every move inside the eye space for both sides, in every order, until the group is captured or is provably safe — "provably" by Benson's test, which asks whether a group could be captured even if its owner never answered again. A group with two real eyes passes that test; a straight four does not, which is why the search also plays on until an answer settles it. The search reports a ko as *unknown* rather than guessing; problems that come down to a ko are kept out of these lessons. What the search does not do is judge the outside: the surrounding stones are taken as safe, so each problem is composed with a solid wall.
+++
