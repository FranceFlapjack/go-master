---
id: first-steps/two-eyes
track: First steps
title: "Two eyes: a group that cannot die"
lede: A group with two separate eyes can never be captured, because the opponent would have to fill both at once. Life and death, the deepest part of the game, starts from this one fact.
level: 0
sources:
  - Arthur Smith, The Game of Go (1908), chapter III, on "eyes" and the impossibility of capturing a group with two — public domain, https://www.gutenberg.org/ebooks/66632
  - Wikipedia, "Life and death" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Life_and_death
  - Positions composed for this lesson and checked with the site's rules engine.
---

## One eye

An **eye** is an empty point (or a small empty area) entirely surrounded by one colour. The opponent cannot play there unless the move captures, because it would be suicide.

A group with only one eye can still be captured: the opponent fills every liberty on the outside, and then the eye is the group's last liberty, and a stone there captures the whole group. That final move is the "suicide that captures" from the liberties lesson.

```board
size: 9
white: A2 B2 B1
black: A3 B3 C2 C1
highlight: A1
caption: The white group has one eye at A1 and no other liberties. Black plays A1 and takes all three stones.
```

## Two eyes

Now give the group two eyes. To capture it the opponent would have to fill both, but a stone in either eye is suicide as long as the *other* eye is still a liberty. Neither eye can ever be filled first. **The group is alive** and stays on the board to the end, whatever happens around it.

```board
size: 9
white: A2 B2 C2 D2 D1 B1
black: A3 B3 C3 D3 E2 E1
highlight: A1 C1
caption: Two eyes, A1 and C1. Black at A1 would be suicide (C1 is still a liberty); Black at C1 the same. This group cannot be captured.
```

The whole of *life and death* is the fight over whether a group can make two eyes before the opponent prevents it. On the small board it is most of the game.

## Problems

<p class="puzzle-intro">1 · One eye is not enough. Capture the white group.</p>

```try
size: 9
white: A2 B2 B1
black: A3 B3 C2 C1
solution: A1
expect: capture
hint: The eye is the group's last liberty.
prompt: Capture the three white stones.
success: A1 is suicide for a single stone, but it takes the group's last liberty first, so the three stones come off and A1 lives on their empty points.
```

<p class="puzzle-intro">2 · Your group has three empty points in a row. One move makes two eyes; any other move lets White kill it.</p>

```try
size: 9
black: A2 B2 C2 D2 D1
white: A3 B3 C3 D3 E2 E1
solution: B1
hint: Split the three points into two separate eyes.
prompt: Make two eyes.
success: B1 divides the space into A1 and C1, two eyes. Any other move, or a pass, and White plays B1 first — then the group has a single three-point space with a white stone in it and dies.
```

<p class="puzzle-intro">3 · The same shape with the colours reversed. Stop White making two eyes.</p>

```try
size: 9
white: A2 B2 C2 D2 D1
black: A3 B3 C3 D3 E2 E1
solution: B1
hint: Play the point White wanted.
prompt: Prevent two eyes.
success: B1 is the vital point, and the white group is dead as it stands. If White plays A1 or C1 the group is left with one liberty and you capture at the other point; if White leaves it alone, so do you, and the stones come off at the end of the game. Had White played B1 first, the group would have lived.
```

<p class="puzzle-intro">4 · White has one eye at J1 and one outside liberty. Take the outside liberty; White can do nothing and passes; then finish.</p>

```try
size: 9
white: H1 H2 J2
black: G1 H3 J3
solution: G2 (pass J1)
expect: capture
hint: You cannot play in the eye while the group has another liberty. Take that one first.
prompt: Capture the white group in two moves.
success: G2 leaves the eye as the group's only liberty. White cannot fill it (that would be suicide) and cannot escape, so White passes; J1 captures. One eye is one liberty, and a liberty can be filled.
```

## Remember

- An eye is an empty point surrounded by one colour; the opponent cannot play there except to capture.
- One eye: the group can still be captured, the eye being its last liberty.
- Two eyes: the group can never be captured. It is alive.
- Making, or preventing, two eyes is what life and death means.

+++ Read more: how many points make an eye
Three empty points in a row, as in problems 2 and 3, are the simplest case: the player who moves first decides. Two points in a row are never two eyes (there is no middle point to split them), so a group with only a two-point space is dead unless it can extend it. Four points in a row are alive without another move: whichever end the opponent plays, the defender answers by splitting the rest. Four points in a square are dead. Five and six points have their own shapes with their own names. The life-and-death track takes these one at a time; for now, remember that *three in a row: whoever plays first*, and look for that shape in your own games.
+++
