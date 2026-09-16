---
id: strategy/influence-and-territory
track: Direction of play
title: Influence and territory
lede: A stone on the third line takes the side; a stone on the fourth line faces the centre. Territory is points you can count now; influence is the promise of points later, and a wall is worth exactly what you do with it.
level: 3
sources:
  - Wikipedia, "Go strategy and tactics" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_strategy_and_tactics — "A play on the fourth line is directed more towards influence to the center, a play on the third line more towards making territory along the side"; and "Thick positions are important as they radiate influence across the board"
  - Game record — AlphaGo (W) v Lee Sedol (B), 2016, game 2, to move 37 (the shoulder hit at P10 on the fifth line); see the file's `SO[]` line. The comments are ours.
  - The two counted diagrams are checked by the site's scorer (`score:`); the choice of direction in the problems follows the rule from the joseki track — block towards where the wall is worth more — and was judged by no engine.
---

## Third line, fourth line

Count what a wall encloses. A row of stones on the **third line** takes everything below it: two lines of territory plus the stones themselves. The same row one line higher, on the **fourth line**, takes three — nine more points on a 9×9 board, more on a big one. So why not always play higher? Because a fourth-line wall has a gap under it: the second and third lines are open, and a stone that lands there can live, or slide along, and the territory was never there. The third line is *territory*; the fourth line is *influence* — a claim on the centre that has to be cashed later, by attacking whatever comes near it.

```board
size: 9
black: A3 B3 C3 D3 E3 F3 G3 H3 J3
white: A4 B4 C4 D4 E4 F4 G4 H4 J4
territory: true
score: W+34.5
caption: A third-line wall. Black has 27 points — 18 of territory and the nine stones. Secure, and small.
```

```board
size: 9
black: A4 B4 C4 D4 E4 F4 G4 H4 J4
white: A5 B5 C5 D5 E5 F5 G5 H5 J5
territory: true
score: W+16.5
caption: The same wall one line higher: 36. Nine points more — if White never gets under it. On 19×19 that "if" is the 3-3 invasion from the joseki track: White lives under a 4-4 stone and the fourth-line wall turns into influence facing the centre.
```

## Influence in a real game

```sgf
file: alphago-lee-sedol-2016-g2.sgf
start: 36
```

Move 37, White's shoulder hit at P10 against Black's stone at Q11, is played on the fifth line — a line higher still. It does not take territory; it presses down on the right side and faces the centre. Whatever you make of the move (commentators at the time made a great deal of it), it is influence in its purest form: a stone whose value is entirely in what happens afterwards.

## Problems

<p class="puzzle-intro">1 · Black to play. White has invaded at the 3-3 point under your 4-4 stone. You have a stone at K17 along the top. Block on the side that makes your wall face it.</p>

```try
size: 19
black: Q16 K17 D4
white: R17 D16 Q4
solution: R16
hint: After the block White crawls along the other side, and your wall forms along that side too. Which side has your stone?
prompt: Block towards your stone.
success: R16, blocking the right. White crawls along the top on the second line, your stones form along the third line above them, and the wall runs towards K17 — the top becomes territory. Blocking at Q17 would have sent the wall down the right side, facing nothing.
```

<p class="puzzle-intro">2 · The same invasion, but now your stone is on the right side at R10.</p>

```try
size: 19
black: Q16 R10 D4
white: R17 D16 Q4
solution: Q17
hint: The wall goes along the side you did not block.
prompt: Block towards your stone.
success: Q17. White crawls down the right side and your wall forms above it, facing R10 — the right side becomes territory. The joseki is the same either way; the direction of the block is the whole decision.
```

<p class="puzzle-intro">3 · Black to play. You are ahead, and the left side is nearly yours. Take it as territory, not as a promise.</p>

```try
size: 9
black: C7 C6 C5 C4 E2 F2 G2
white: E7 E6 E5 E4 D3 G3 H2
solution: (C3) (C2)
hint: The third line makes territory. Which point turns the corner under your wall, where White's D3 is looking in?
prompt: Close the left side.
success: C3 (or C2) turns the corner where White's stone at D3 was looking in, and the left side becomes points you can count. C4 to C7 were a wall facing the centre — influence; one third-line stone under it makes it territory. When you are ahead, count; when you are behind, the wall was for fighting.
```

## Remember

- Third line for territory, fourth line for influence; the fifth line is a claim on the centre.
- A wall is worth what you do with it: attack with it, or close it into territory — one or the other, and soon.
- When you block a 3-3 invasion, block towards your own stones.

+++ Read more: why the third line is the line of territory
Wikipedia's phrasing — third line for territory, fourth for influence — is the standard teaching, and the counting diagrams above show the arithmetic behind it: each line higher is one more row of points, and one more row of risk. On the second line a stone can be undercut only by a first-line stone, which rarely lives; on the third line the gap under it is two points and still narrow; on the fourth line the gap is three, wide enough for the 3-3 point and the second-line slide. The fourth-line player is betting that the centre will be worth more than the side. Neither line is right in general; the position tells you which, and the count tells you whether the bet paid.
+++
