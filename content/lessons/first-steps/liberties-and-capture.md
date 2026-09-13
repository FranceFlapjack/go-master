---
id: first-steps/liberties-and-capture
track: First steps
title: Liberties and capture
lede: A stone's liberties are the empty points next to it. Fill the last one and the stone comes off the board. Everything about fighting grows from this one rule.
level: 0
sources:
  - Arthur Smith, The Game of Go (1908), chapter III "Rules of play" — public domain, https://www.gutenberg.org/ebooks/66632
  - Wikipedia, "Rules of Go", sections "Liberties" and "Capture" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Rules_of_Go
  - Positions checked with the site's rules engine (scripts/check-content.mjs); the problems are composed for this lesson.
---

## Liberties

The empty points directly next to a stone, along the lines, are its **liberties**. A stone in the middle has four; on the edge three; in the corner only two. Diagonal points do not count.

```board
size: 9
black: E5 A1 E9
labels: D5=a, F5=b, E4=c, E6=d, A2=e, B1=f, D9=g, F9=h, E8=i
caption: The stone at E5 has four liberties, a to d. The corner stone has two, e and f. The edge stone has three, g to i.
```

Stones of one colour that touch along a line form a **chain** (a group) and share their liberties. Two stones side by side have six liberties, not eight.

```board
size: 9
black: D5 E5
white: D3 E3 D2 E2
labels: C5=a, F5=b, D6=c, E6=d, D4=e, E4=f
caption: The black chain has six liberties, a to f. The white chain of four has eight.
```

## Capture

When a stone or chain loses its last liberty, it is **captured**: every stone in it is taken off the board and kept by the captor. A chain with only one liberty left is in **atari**; the next move can take it.

```board
size: 9
black: D5 E6 E4
white: E5
highlight: F5
caption: White's stone has one liberty left, F5. It is in atari; Black to play captures it there.
```

Two consequences follow, and both are rules in their own right:

- **You may not fill your own last liberty.** A move that would leave your own stone or chain with no liberties is illegal (*suicide*) —
- **unless it captures.** If the move takes the opponent's last liberty first, their stones come off, your stone gains liberties from the empty points they leave, and the move is legal.

## Problems

Black to play in every problem. Click the point; the board tells you whether it was right.

<p class="puzzle-intro">1 · The stone from the diagram above. Capture it.</p>

```try
size: 9
black: D5 E6 E4
white: E5
solution: F5
expect: capture
hint: Which empty point touches the white stone?
prompt: Capture the white stone.
success: F5 takes the last liberty and the stone comes off. One prisoner for Black.
```

<p class="puzzle-intro">2 · In the corner a stone has only two liberties. One is already gone.</p>

```try
size: 9
black: A2
white: A1
solution: B1
expect: capture
hint: The corner stone touches only two points.
prompt: Capture the corner stone.
success: B1. Corner stones are the easiest to capture, which is why the corner is both the best place to make territory and the worst place to be short of liberties.
```

<p class="puzzle-intro">3 · On the edge, three liberties. Find the last one.</p>

```try
size: 9
black: D1 F1
white: E1
solution: E2
expect: capture
hint: An edge stone has three neighbours, not four.
prompt: Capture the edge stone.
success: E2 captures. Count liberties before you play, not after.
```

<p class="puzzle-intro">4 · A chain shares its liberties. Two white stones, one point left.</p>

```try
size: 9
black: D5 E6 F6 G5 E4
white: E5 F5
solution: F4
expect: capture
hint: The two stones are one chain; find the single empty point they still touch.
prompt: Capture the two stones.
success: F4 takes both. A chain lives and dies together.
```

<p class="puzzle-intro">5 · Two white groups. Only one of them can be captured right now.</p>

```try
size: 9
black: B7 C8 D7 F3 G4
white: C7 G3
solution: C6
expect: capture
hint: Count the liberties of each white stone. One has two left, the other has one.
prompt: One white stone is in atari. Capture it.
success: C6. The stone at G3 still has two liberties (H3 and G2), so a move there only puts it in atari; C7 could be taken at once.
```

<p class="puzzle-intro">6 · Now the other way round: your stone is in atari. Save it.</p>

```try
size: 9
black: E5
white: D5 E6 F5
solution: E4
hint: Extend along the line into open space; the new stone joins the chain and brings its own liberties.
prompt: Black's stone is in atari. Give it liberties.
success: E4 extends: the chain of two now has three liberties (D4, F4, E3). Running away is the first defence; whether it works in the long run is the subject of the ladder lesson.
```

<p class="puzzle-intro">7 · A move that looks like suicide, and is not.</p>

```try
size: 9
black: A3 B2 C1
white: A2 B1
solution: A1
expect: capture
hint: A stone at A1 would have no liberties of its own. What happens to the white stones first?
prompt: Capture the two white stones.
success: A1 has no liberties, but it takes the last liberty of both white stones, so they come off first, and then A1 has two liberties of its own. Capture comes before suicide.
```

## Remember

- Liberties are the empty points along the lines next to a stone: four in the middle, three on the edge, two in the corner.
- Touching stones of one colour form a chain and share their liberties.
- Take the last liberty and the whole chain is captured. One liberty left is atari.
- Filling your own last liberty is illegal, unless the move captures.

+++ Read more: what capturing is for
Beginners capture whenever they can. Stronger players capture rarely, because a stone that is captured is worth two points at most (one for the prisoner, one for the point it stood on, under territory counting; under area counting simply the point it stood on plus the point your stone now occupies), while a stone that is *threatened* makes the opponent answer, and a stone that cannot escape may as well be left where it is until the end.

Arthur Smith, writing in 1908 for readers who had never seen the game, put it this way: the object is to secure territory, and taking stones is only a means to that end. Keep that in mind through the next lessons, which are all about capturing: the techniques matter because a group that *can* be captured has no territory, not because prisoners are points.
+++
