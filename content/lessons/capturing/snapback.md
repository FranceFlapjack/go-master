---
id: capturing/snapback
track: Capturing techniques
title: Snapback
lede: Give one stone away on purpose. The opponent captures it, and in doing so puts their own chain in atari on the point they just emptied. You take it back, with interest.
level: 1
sources:
  - Wikipedia, "Snapback (Go)" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Snapback_(Go)
  - Arthur Smith, The Game of Go (1908), chapter III, on "utte gaeshi" — public domain, https://www.gutenberg.org/ebooks/66632
  - Positions composed for this lesson; every sequence is checked by the site's rules engine (`expect: capture`).
---

## The idea

A chain with two liberties looks safe from a single move. But if the two liberties are next to each other, and one of them is hemmed in on its other sides — by the edge, or by opponent stones that do not belong to the chain — you can play *into* it: your stone has exactly one liberty and can be captured — and the capturing stone, once it lands, is part of a chain whose only liberty is the point your stone just left. You play there again and take the lot.

```board
size: 9
black: C2 D3 E3 F3 G2 G1
white: C1 D2 E2 F2 F1
highlight: D1 E1
caption: The white chain has two liberties, D1 and E1. Black plays D1 — a stone with one liberty. White captures it at E1 … and the whole chain now has exactly one liberty, D1. Black plays D1 again and takes five stones.
```

The name is exact: the capture *snaps back*. Under the rules there is nothing special about it. Your stone was captured, so the point is empty; your next stone there is a new stone, and it takes the last liberty of a chain. It is not a ko, because you capture more than one stone.

## Reading it

Before you throw a stone in, check three things: that your stone will have exactly one liberty (so the opponent *can* capture it, which they will want to); that the capturing move lands next to the chain (so it joins it); and that the chain will then have only one liberty. If any of these fails, the throw-in is simply a lost stone.

## Problems

<p class="puzzle-intro">1 · The position from the diagram. Throw in, let White capture, take back.</p>

```try
size: 9
black: C2 D3 E3 F3 G2 G1
white: C1 D2 E2 F2 F1
solution: D1 (E1 D1)
expect: capture
hint: One of the two liberties is next to a white stone that is not part of the chain. Play there.
prompt: Capture the four white stones.
success: D1, White captures at E1, D1 again: five stones. Had Black thrown in at E1 instead, White's capture at D1 would have connected to C1 and lived.
```

<p class="puzzle-intro">2 · In the corner. Two liberties, both inside.</p>

```try
size: 9
black: A3 B3 C3 D2 E1 E2
white: A2 B2 C2 C1 D1
solution: (B1 (A1 B1)) (A1 (B1 A1))
expect: capture
hint: Either liberty will do: throw in, and take back after the capture.
prompt: Capture the white chain.
success: A stone on either point has one liberty; White takes it; the chain of six has one liberty on the emptied point; Black takes it back. Corner chains with two adjacent liberties and no way out are dead as they stand.
```

<p class="puzzle-intro">3 · In the centre. The chain's liberties are F5 and F4, and two lone white stones stand at G5 and F6.</p>

```try
size: 9
black: C5 D6 D4 E6 E3 G4 F3
white: D5 E5 E4 G5 F6
solution: F5 (F4 F5)
expect: capture
hint: One liberty is hemmed in by white stones that do not belong to the chain; a black stone there has one liberty. The other liberty touches your own stones.
prompt: Capture the three white stones.
success: F5, White captures at F4, F5 again: four stones. The atari at F4 would have failed — White connects at F5 to G5 and F6 and has liberties to spare. The throw-in works precisely where the ordinary move does not.
```

## Remember

- Snapback: a chain with two adjacent liberties, one of them hemmed in so that a stone there has a single liberty. Throw in, get captured, capture back.
- Check that the capturing stone joins the chain and leaves it with one liberty.
- It is not a ko: you take back more than one stone.
- The defence, when it is your chain: see it coming, and add liberties before the throw-in.

+++ Read more: snapback and the "eye" that is not one
Beginners often count a snapback shape as an eye: an empty point surrounded by their own stones on three sides, with the fourth side open. It looks safe; surely nothing can be played there. But the point *can* be played, exactly because the stone played there has one liberty to be captured from, and the recapture takes the chain. In the life-and-death track this is one of the ways a group that "obviously" has two eyes turns out to have one.
+++
