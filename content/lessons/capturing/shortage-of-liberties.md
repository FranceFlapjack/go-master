---
id: capturing/shortage-of-liberties
track: Capturing techniques
title: Shortage of liberties
lede: A chain with two liberties cannot afford to fill one of them. Half of all captures come from that: the obvious move is self-atari, the quiet move next to it wins.
level: 1
sources:
  - Wikipedia, "Shortage of liberties" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Shortage_of_liberties
  - Positions composed for this lesson; every line is checked by the site's rules engine (`expect: capture`). These positions involve counter-attacks on the reader's own stones that the capture search does not read, so they were read by hand as well.
---

## The idea

Count liberties on both sides before you attack. When your own chain has only two, any move that fills one of them puts it in atari, and the opponent captures it before your attack lands. That is *shortage of liberties* (Japanese *damezumari*). The move that works is nearly always the *other* one: the liberty that belongs to the opponent alone.

```board
size: 9
black: A1 B1 D2 E2 F2 C3
white: B2 D1 E1
highlight: C1 F1
caption: Black's two stones have liberties A2 and C1; White's have C1 and F1. Black C1 would be atari on White, but it leaves Black's chain with one liberty, and White answers C2. Black F1 is the move: White's only liberty is then C1, and White cannot play there.
```

Read White's attempt after F1: White C1 has no liberties of its own and captures nothing, because Black still has A2, so it is self-atari; Black C2 takes three stones. If White plays C2 instead, Black C1 takes two.

## Problems

<p class="puzzle-intro">1 · The position above. Capture the two white stones without losing your own.</p>

```try
size: 9
black: A1 B1 D2 E2 F2 C3
white: B2 D1 E1
solution: F1 (C1 C2) (C2 C1)
expect: capture
hint: Which of White's two liberties is not also yours?
prompt: Capture the white stones on the first line.
success: F1. The shared liberty at C1 is the last one to fill, and it is White who runs out first.
```

<p class="puzzle-intro">2 · The same fight in the other corner, turned round. Read it afresh.</p>

```try
size: 9
black: J9 H9 F8 E8 D8 G7
white: H8 F9 E9
solution: D9 (G9 G8) (G8 G9)
expect: capture
hint: Your stones have H9's neighbour J8 and the shared point G9. White has G9 and D9.
prompt: Capture the white stones on the top edge.
success: D9. Filling the shared liberty first would have been self-atari; the outside liberty leaves White with nothing.
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
