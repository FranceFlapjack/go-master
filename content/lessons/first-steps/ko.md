---
id: first-steps/ko
track: First steps
title: "Ko: no immediate retake"
lede: One shape lets each side capture a single stone back and forth forever. The ko rule stops it, and turns the shape into a fight for tempo that runs through the whole game.
level: 0
sources:
  - Arthur Smith, The Game of Go (1908), chapter III "Rules of play", on ko — public domain, https://www.gutenberg.org/ebooks/66632
  - Wikipedia, "Rules of Go", section "Ko" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Rules_of_Go
  - Positions composed for this lesson and checked with the site's rules engine.
---

## The shape

Look at E5 and F5. If Black plays F5, the white stone at E5 loses its last liberty and is captured. But the new black stone at F5 then has exactly one liberty: E5, the point just emptied. White could play there, capture F5, and the position would be back where it started. Then Black could take again, and so on, for ever.

```board
size: 9
black: D5 E6 E4
white: G5 F6 F4 E5
highlight: F5
caption: A ko. Black takes at F5; White could take straight back at E5; nothing would ever change.
```

## The rule

**You may not retake a ko immediately.** After your stone is captured in a ko, you must play somewhere else first. Only then, if the opponent has not resolved the ko, may you take it back.

That is the whole rule, and it is enough. The consequences are what matter:

- The side that just lost the ko needs a move elsewhere that the opponent *must* answer: a **ko threat**. An atari on a big group, a cut, a move that threatens to kill. If the opponent answers, the ko can be retaken. If they ignore the threat and **connect** the ko instead, the ko is over, and the threat gets carried out.
- So a ko is a trade: each side weighs what the ko is worth against what the threats are worth. Beginners lose kos by having no threats; strong players spend the middlegame saving them.

```board
size: 9
black: D5 E6 E4 F5
white: G5 F6 F4
highlight: E5
caption: Black has just captured at F5. White may not play E5 now. Black, if given a free move, connects at E5 and the ko is finished.
```

## Problems

<p class="puzzle-intro">1 · Take the ko. A plain capture, the first move of every ko.</p>

```try
size: 9
black: D5 E6 E4
white: G5 F6 F4 E5
solution: F5
expect: capture
hint: Which white stone has one liberty?
prompt: Capture the white stone.
success: F5 takes. Now White may not retake at E5 until they have played elsewhere.
```

<p class="puzzle-intro">2 · White just took the ko at E5, so F5 is forbidden this turn. Find a move White has to answer, then retake.</p>

```try
size: 9
black: D5 E6 E4 A2 A3 C2 C3
white: G5 F6 F4 E5 B2 B3
ko: F5
solution: B4 (B1 F5)
expect: capture
hint: The two white stones at B2 and B3 have two liberties. Take one, and White must run.
prompt: You cannot retake yet. Make a ko threat, wait for the answer, then take the ko.
success: B4 is atari; White extends to B1 to live; and now the ko may be retaken at F5. That is a ko fight in miniature: threat, answer, retake.
```

<p class="puzzle-intro">3 · You took the ko; White made a threat at G9 (atari on H9) that you can afford to ignore. End the ko.</p>

```try
size: 9
black: D5 E6 E4 F5 H9
white: G5 F6 F4 G9
last: G9
solution: E5
hint: A ko ends when one side fills the point the stone was captured from.
prompt: Ignore the threat and connect the ko.
success: E5 connects: the four black stones are one solid chain with plenty of liberties and there is no ko any more. White's threat at G9 takes the stone at H9 next, a small price for a solid centre.
```

## Remember

- A ko is a shape where a single stone can be captured back and forth.
- You may not retake immediately; play elsewhere first.
- The move elsewhere should be a ko threat: something the opponent must answer.
- The side that connects the ko ends it; the side that ignores a threat pays for it.

+++ Read more: bigger kos, and the rule behind the rule
The reason for the ko rule is simply that the game must end; a position that repeats for ever has no result. The rule you have learnt forbids the *immediate* repeat, which covers the ordinary ko. Rarer shapes (a *triple ko*, where three kos are linked and the position repeats after six moves) are handled differently by different rule sets: under Japanese rules the game is annulled and replayed; under most rules used online (positional superko) no whole-board position may ever be repeated at all. This site's engine applies the simple rule only; you will not meet a triple ko for years.

In real games kos are rarely as small as the ones above. A ko can decide the life of a group, or of a whole corner, and then the threats become the whole story: one player counts how many they have, the other counts how much the ko is worth, and the fight elsewhere on the board is really a fight about the ko. That is the *ko fight*, and it has its own lesson in the strategy track.
+++
