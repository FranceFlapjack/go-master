---
id: capturing/the-net
track: Capturing techniques
title: The net
lede: When the ladder does not work, do not chase. Play one loose stone that covers both escape routes, and the stones are caught without a single atari.
level: 1
sources:
  - Wikipedia, "Net (Go)" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Net_(Go)
  - Arthur Smith, The Game of Go (1908), chapter III, on "geta" — public domain, https://www.gutenberg.org/ebooks/66632
  - Positions composed for this lesson; every net is checked by the site's capture search (`expect: kill`), which also confirms that the ataris fail.
---

## The idea

The ladder chases a stone with ataris; each atari gives it one liberty and it keeps running. The **net** (Japanese *geta*) does the opposite: it plays a stone *not* touching the target, at the point where its escape routes meet. Now whichever way the stone extends, it walks into an atari and is captured. The stone never gets a third liberty, so no ladder breaker can help it.

```board
size: 9
black: D5 E6 F6 D4
white: E5 G2 B8
highlight: F4
caption: White's stone at E5 has two liberties, F5 and E4. Both ladders fail (the stones at G2 and B8 are on their paths). The net at F4 catches it anyway.
```

Read it: after F4, if White extends to F5, Black plays G5 and the two stones have one liberty, E4; White extends there, and E3 captures three. If White extends to E4 first, Black plays E3; White's only liberty is F5; G5 captures. The two white stones never get beyond two liberties.

## Ladder or net?

- The ladder needs the diagonal stone and a clear path to the edge. Read it; if it works, it captures with certainty and the stones can be left where they are.
- The net needs the target to be hemmed in on two sides already, so that one stone can cover the remaining directions. It leaves the target with two liberties for a moment, so it fails if the target can gain a third by capturing something.
- When both work, the net is usually better: it leaves no chasing stones as weaknesses, and it needs no reading to the edge.

## Problems

<p class="puzzle-intro">1 · Both ladders are broken. Catch the stone with a net.</p>

```try
size: 9
black: D5 E6 F6 D4
white: E5 G2 B8
solution: F4 (F5 G5 (E4 E3)) (E4 E3 (F5 G5))
expect: kill
target: E5
refute: F5 E4
hint: A move that does not touch the white stone, on the diagonal below and to the right.
prompt: Capture the white stone.
success: F4 is the net. Whichever way White runs, one atari finishes it. An atari at F5 or E4 would have started a ladder into a white stone.
```

<p class="puzzle-intro">2 · The same shape from the other side. Do not pattern-match; read it.</p>

```try
size: 9
black: F5 E6 D6 F4
white: E5 C2 H8
solution: D4 (D5 C5 (E4 E3)) (E4 E3 (D5 C5))
expect: kill
target: E5
hint: The escape routes are D5 and E4. Where do they meet?
prompt: Capture the white stone.
success: D4. The net stone sits on the diagonal, a knight's move from both escape points.
```

<p class="puzzle-intro">3 · Two stones with three liberties. No atari is possible yet, but one net stone catches them.</p>

```try
size: 9
black: D5 D4 E6 F6 F3
white: E5 E4 J8 H2
solution: E3 (F5 G5 (F4 G4)) (F4 G4 (F5 G5))
expect: kill
target: E5
hint: The three liberties are F5, F4 and E3. Take the one that the black stone at F3 helps you cover.
prompt: Capture the two white stones.
success: E3. Now the chain has two liberties, F5 and F4, and each extension runs into an atari: F5 is answered at G5, F4 at G4. Two stones in the net, and Black never had to read a ladder.
```

## Remember

- A net stone does not touch the target; it sits where the escape routes meet, usually a knight's move away.
- The target keeps two liberties but can never get a third: every extension is an atari.
- Ladder broken? Look for the net. Both work? Prefer the net.

+++ Read more: names and shapes
*Geta* is the Japanese word for a wooden clog; the shape of the net around a stone was thought to look like one. The net comes in several shapes — the one-point net, the knight's-move net, the large knight's-move net — depending on how far the covering stone stands from the target, and which one applies depends on the stones already around. The test is always the same: after the net stone, does every extension by the target lead to an atari from which there is no escape? If you can answer that for both escape routes, you can play the net without reading anything else on the board.
+++
