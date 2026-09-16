---
id: endgame/counting-endgame-moves
track: The endgame
title: Counting the value of a move
lede: The value of an endgame move is a number, and you can get it by playing the position out both ways in your head and taking the difference. Three border spots on one board — worth four, two and two — and the order that follows from the numbers.
level: 3
sources:
  - Wikipedia, "Go strategy and tactics" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_strategy_and_tactics — "Players then set about maximizing the boundaries of their territories while minimizing the opponent's territory. One must choose which of these moves is more urgent to play based not only on the points it may gain, but on whether that move is sente"; the example of a dame point that "when filled in, is sente"
  - Wikipedia, "Rules of Go" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Rules_of_Go — area scoring counts stones on the board together with surrounded empty points, which is why a neutral point is worth a point to whoever fills it here
  - Every value in this lesson is the difference between two counted diagrams, and every diagram is checked by the site's scorer (`score:`). The problems accept the move the numbers say is biggest, or either of two that are equal; the trees are checked for legality. Nothing here is judgement except the assumption, stated in the text, that the rest of the board is settled.
---

## The method

Take a border spot. Imagine Black plays it first and both sides finish the local sequence; count the board. Imagine White plays it first; count again. **The difference is what the spot is worth** — how much the result swings depending on who gets there first. Do it for every spot left on the board, and play them in order of size, sente moves first.

On the board below three spots are open: the corner at D1–E1–F1, the top at D9–E9, and the single neutral point E5. Everything else is settled; we count under area scoring, as the site does, so stones on the board count as well as empty points.

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8
white: E2 E3 E4 E6 E7 E8 F5 F2
labels: E1=a, D9=b, E5=c
caption: Three border spots. a: whoever plays the first-line hane here gets the corner sequence. b: a one-point push at the top. c: a neutral point — it touches both colours and belongs to nobody until it is filled.
```

## The spots, counted

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 E1 D1 D9
white: E2 E3 E4 E6 E7 E8 F5 F2 F1 E9 E5
territory: true
score: W+14.5
caption: The reference: Black gets the corner (hane E1, block F1, connect D1), Black pushes at the top (D9, E9), White fills the neutral point. White by 14.5.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 C1 D9
white: E2 E3 E4 E6 E7 E8 F5 F2 D1 E1 E9 E5
territory: true
score: W+18.5
caption: White gets the corner instead (hane D1, block C1, connect E1); everything else as before. Four points worse for Black. The corner is worth 4.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 E1 D1 C9
white: E2 E3 E4 E6 E7 E8 F5 F2 F1 D9 E9 E5
territory: true
score: W+16.5
caption: White gets the top instead (D9, Black blocks C9, E9). Two points worse than the reference. The top is worth 2.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 E1 D1 D9 E5
white: E2 E3 E4 E6 E7 E8 F5 F2 F1 E9
territory: true
score: W+12.5
caption: Black fills the neutral point instead of White. Two points better than the reference — one stone more for Black, one fewer for White. Under area scoring a neutral point is worth 2 in this sense, the same as the push at the top.
```

So: corner 4, top 2, neutral point 2. None of the three is sente — each ends with the player who started it making the last local move — so the order is simply by size: the corner first, then the other two in either order.

## Problems

<p class="puzzle-intro">1 · Black to play, the position at the top. Three gote moves, three sizes. The biggest first.</p>

```try
size: 9
black: D2 D3 D4 D5 D6 D7 D8
white: E2 E3 E4 E6 E7 E8 F5 F2
solution: E1 (F1 D1)
hint: Four, two and two. Which is the four?
prompt: Play the biggest move.
success: E1, the hane in the corner: White blocks at F1 and you connect at D1. Four points, against two for the top and two for the neutral point. The move is gote — you end the sequence — so White gets one of the two-point spots next and you get the other.
```

<p class="puzzle-intro">2 · Black to play. The corner is settled. Two spots left, worth two each.</p>

```try
size: 9
black: D2 D3 D4 D5 D6 D7 D8 E1 D1
white: E2 E3 E4 E6 E7 E8 F5 F2 F1
solution: (D9 (E9 E5)) (E5 (D9 C9))
hint: Equal moves. Take either, then the other if White lets you.
prompt: Take a two-point move.
success: D9 or E5: they are worth the same, so it does not matter which — you take one, White takes the other. The point of counting is not to agonise over equal moves; it is to know they are equal, and to know that both are smaller than the corner you have already taken.
```

<p class="puzzle-intro">3 · White to play, the position at the top with nothing settled. Same three spots, from the other side.</p>

```try
size: 9
turn: w
white: E2 E3 E4 E6 E7 E8 F5 F2
black: D2 D3 D4 D5 D6 D7 D8
solution: D1 (C1 E1)
hint: The values do not depend on whose turn it is.
prompt: Play the biggest move.
success: D1, the hane under Black's wall: Black blocks at C1, you connect at E1. The same four points, seen from White's side — the value of a spot is the swing between the two results, and the swing is the same whoever is counting.
```

## Remember

- Value of a spot = the count if you play it first minus the count if the opponent does.
- Play the spots in order of size, sente moves first (they are free).
- Under area scoring the neutral points count too: fill them in turn at the end, and count them like any other two-point move.

+++ Read more: the two ways to count, and why the numbers here are "doubled"
Books on the endgame give values in two currencies. The one used here — the difference between the two results — is called *deiri* (in-and-out) counting: the corner is "4 points in gote". The other, *miai* counting, divides a gote move's swing by two, because each side had an equal chance of getting there: the same corner is "2 points" in miai counting, and the top and the neutral point are "1 point" each. The two systems agree on the order of moves (they must, since one is the other halved for gote moves) and differ only in how sente and reverse-sente moves are scaled. When you read "the monkey jump is worth 8 points" in the next lesson, the proverb is in deiri terms.
+++
