---
id: capturing/shortage-of-liberties
track: Capturing techniques
title: Shortage of liberties
lede: A chain with two liberties cannot afford to fill one of them. Half of all captures come from that: the obvious move is self-atari, the quiet move next to it wins.
level: 1
sources:
  - Wikipedia, "Shortage of liberties" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Shortage_of_liberties
  - Positions composed for this lesson; problems 1 and 2 are checked by the site's capture search (`expect: kill`, with the self-atari move listed under `refute:` and confirmed to fail), problem 3 by the rules engine and by hand.
---

## The idea

Count liberties on both sides before you attack. When your own chain has only two, any move that fills one of them puts it in atari, and the opponent captures it before your attack lands. That is *shortage of liberties* (Japanese *damezumari*). The move that works is nearly always the *other* one: the liberty that belongs to the opponent alone.

```board
size: 9
black: A2 B2 B1 C2 D2 E2 F2 F3 H1 H2 H3
white: A3 B3 C3 D3 E3 F4 G2 G3 G4 H4 J4 D1 E1 F1
highlight: C1 G1
caption: Black's chain along the second line has two liberties: the eye at A1 and the shared point C1. White's three stones on the first line have C1 and G1. Black C1 would be atari — and self-atari: the chain would be left with A1 alone, and White A1 captures nine stones. Black G1 is the move. White's only liberty is then C1, and White cannot play there.
```

Read White's attempt after G1: White C1 has no liberties of its own and captures nothing, because Black still has A1; it is suicide, and illegal. White cannot play A1 either, for the same reason. Had White been first to play, G1 would have connected the three stones to the white group above and saved them; Black's G1 takes that away.

## Problems

<p class="puzzle-intro">1 · The position above. Capture the three white stones without losing your own.</p>

```try
size: 9
black: A2 B2 B1 C2 D2 E2 F2 F3 H1 H2 H3
white: A3 B3 C3 D3 E3 F4 G2 G3 G4 H4 J4 D1 E1 F1
solution: G1 (pass C1)
expect: kill
target: D1
quiet: 0
refute: C1
safe: A2
hint: Which of White's two liberties is not also yours?
prompt: Capture the white stones on the first line.
success: G1. The shared liberty at C1 is the last one to fill, and it is White who cannot fill it; the three stones are dead where they stand, and you capture at C1 whenever you like.
```

<p class="puzzle-intro">2 · The same fight in the opposite corner, turned round. Read it afresh.</p>

```try
size: 9
black: J8 H8 H9 G8 F8 E8 D8 D7 B9 B8 B7
white: J7 H7 G7 F7 E7 D6 C8 C7 C6 B6 A6 F9 E9 D9
solution: C9 (pass G9)
expect: kill
target: F9
quiet: 0
refute: G9
safe: J8
hint: Your chain has the eye at J9 and the shared point G9; the white stones have G9 and C9.
prompt: Capture the white stones on the top edge.
success: C9. Filling the shared liberty at G9 first would have been self-atari; the outside liberty leaves White with nothing.
```

<p class="puzzle-intro">3 · Two white stones, each with two liberties, and one point touches both. A double atari: White cannot save both.</p>

```try
size: 9
black: D5 E6 D3 E2
white: E5 E3
solution: E4 (F5 F3) (F3 F5)
expect: capture
hint: Find the empty point next to both white stones.
prompt: Capture a white stone.
success: E4 puts both stones in atari at once. Whichever White saves, the other is captured. Shortage of liberties in its simplest form: two things to do, one move to do them with.
```

## Remember

- Before you atari, count your own liberties. Two is not enough to fill one.
- In a fight over shared liberties, fill the opponent's outside liberties first; the shared one last.
- A move that puts two chains in atari at once wins one of them.

+++ Read more: the same idea everywhere
Shortage of liberties is behind most of the shapes in this track. The snapback works because the capturing chain is left with one liberty. The net works because every extension leaves two, and an atari makes it one. In the endgame, a chain that seems safely connected can turn out to have too few liberties to defend a cutting point, and a whole corner changes hands. The habit to build is simple and boring: before each fighting move, count the liberties of every chain it touches, yours included.
+++
