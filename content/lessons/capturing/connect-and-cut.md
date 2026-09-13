---
id: capturing/connect-and-cut
track: Capturing techniques
title: Connecting and cutting
lede: Stones that are connected live or die together; stones that are cut apart must each make their own life. Most of the fighting in a game is about which of the two it will be.
level: 1
sources:
  - Wikipedia, "Connection (Go)" and "Cut (Go)" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Connection_(Go) and https://en.wikipedia.org/wiki/Cut_(Go)
  - Positions composed for this lesson; the safety of every cutting stone is checked by the site's capture search (`expect: escape`), the meaning of each cut was read by hand.
---

## Kinds of connection

Two stones on adjacent points are one chain: **solidly connected**, and nothing can separate them. Everything else is a *virtual* connection: the stones are separate chains, but the opponent cannot cut them without losing the cutting stone. Whether that is true depends on the surroundings, and checking it is the whole skill.

```board
size: 9
black: B7 C7 E7 F8 H7 H9 B4 D4 F4 G4 F2 G2
labels: E8=a, F7=b, H8=c, C4=d, F3=e, G3=f
caption: Top row, left to right — solid; diagonal (cutting points a and b: the opponent needs both, so one move cannot cut); a one-point jump on the edge (cutting point c). Bottom — a one-point jump (cutting point d); a bamboo joint (two parallel pairs: e and f are miai, whichever the opponent takes, you take the other, so it is never cut).
```

```board
size: 9
white: C5 E5 D6
black: D3
highlight: D5
caption: The tiger's mouth, or hanging connection: three white stones around D5. A black stone at D5 would have one liberty (D4) and be captured at once. So D5 is not a cutting point — unless Black first plays D4, after which the cut becomes possible. Watch for that.
```

## When a cut works

A cutting stone is worth playing when it will survive: when it has friends nearby to connect to, or room to run, or when one of the two separated chains is short of liberties and can be captured. A cut that is captured is worse than no cut, because it hands over a stone and strengthens the opponent's shape.

## Problems

<p class="puzzle-intro">1 · White's stones at D5 and F5 are a one-point jump. Cut, using your stone at E3 as support.</p>

```try
size: 9
black: E3
white: D5 F5
solution: E5
expect: escape
target: move
hint: The cutting point of a one-point jump is the point between the stones.
prompt: Cut the two white stones apart.
success: E5. If White plays atari from above at E6, Black extends to E4 and connects to E3; from below at E4, Black extends to E6 with three liberties. The cutting stone cannot be caught, and D5 and F5 must now each look after themselves.
```

<p class="puzzle-intro">2 · Now the other side. Your stone at F5 has one liberty; connect before it is cut off.</p>

```try
size: 9
black: D5 F5
white: E6 F6 G5 F4
solution: E5
expect: escape
target: F5
unique: true
hint: A solid connection is a stone on the point between.
prompt: Save the stone at F5.
success: E5 makes one chain of D5, E5, F5 with liberties to spare. Any other move, and White E5 captures F5. When a stone has one liberty, the solid connection is the only connection.
```

<p class="puzzle-intro">3 · A diagonal has two cutting points. One of them is already yours. Take the other, and make sure the cutting stone is safe.</p>

```try
size: 9
black: D4 F6 G5
white: D5 E4
solution: E5
expect: escape
target: move
hint: The two white stones touch corners at D5–E4. The cutting points are E5 and D4.
prompt: Cut the white stones apart.
success: E5. With D4 already black, this completes the cut. E5 has two liberties, but an atari from either side lets it connect to F6 or G5, so it cannot be captured; nor can D4: it has two liberties, C4 and D3, but an atari on either lets it extend into open ground and reach three.
```

## Remember

- Solid connection: adjacent stones, one chain. Everything else can be cut in principle; the surroundings decide.
- Diagonal: two cutting points, safe unless one is taken. One-point jump: one cutting point. Bamboo joint: never cut. Tiger's mouth: the cutting stone is captured, unless its liberty has been filled first.
- Cut only when the cutting stone survives, or when one side of the cut is short of liberties. Connect solidly when a stone has one liberty.

+++ Read more: why connection is the whole game
A connected group needs two eyes; two separated groups need four. Every cut therefore doubles what the defender has to achieve, and every connection halves it. This is why so much of the opening and middlegame consists of moves that look like nothing — a one-point jump here, a knight's move there — placed so that they cannot be cut, while the opponent looks for the cutting point that is not quite covered. A useful exercise with any game record: for each move, ask whether it connects something, cuts something, or threatens to. Most do.
+++
