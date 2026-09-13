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
black: A2 A3 B2 B3 D1 E1
white: B1 C2 C3 B4
highlight: A1 C1
caption: Black's four stones have two liberties, A1 and A4. White's stone at B1 has A1 and C1. Black A1 would be atari on it — and self-atari, since Black's chain would be left with A4 alone, and White captures four stones there. Black C1 is the move: White's only liberty is then A1, and White cannot play there.
```

Read White's attempt after C1: White A1 has no liberties and captures nothing, because Black still has A4, so it is suicide and illegal. White can play A4 instead, putting Black in atari; Black then captures at A1 and the chain has liberties again.

## Problems

<p class="puzzle-intro">1 · The position above. Capture the white stone without losing your own.</p>

```try
size: 9
black: A2 A3 B2 B3 D1 E1
white: B1 C2 C3 B4
solution: C1 (A4 A1) (pass A1)
expect: kill
target: B1
refute: A1
hint: Which of the white stone's two liberties is not also yours?
prompt: Capture the white stone at B1.
success: C1. The shared liberty at A1 is the last one to fill, and it is White who cannot fill it. If White plays A4 to put you in atari, A1 captures and you are safe.
```

<p class="puzzle-intro">2 · The same fight in the opposite corner, turned round. Read it afresh.</p>

```try
size: 9
black: J8 J7 H8 H7 F9 E9
white: H9 G8 G7 H6
solution: G9 (J6 J9) (pass J9)
expect: kill
target: H9
refute: J9
hint: Your chain has J9 and J6; the white stone has J9 and G9.
prompt: Capture the white stone at H9.
success: G9. Filling the shared liberty at J9 first would have been self-atari; the outside liberty leaves White with nothing.
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
