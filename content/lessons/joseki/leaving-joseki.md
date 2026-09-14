---
id: joseki/leaving-joseki
track: Joseki
title: When to leave the joseki
lede: A joseki is a fair local result, and the board is not local. The sequence you know is the right one only if it faces the right way, and sometimes the best move is not the next move of the sequence but a stone on the other side of the board.
level: 3
sources:
  - Wikipedia, "Jōseki" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Joseki — the proverb "learning jōseki loses two stones in strength" and Rui Naiwei's remark, quoted there, that "playing joseki is easy [but] choosing the right one [in a game] is hard"
  - Kogo's Joseki Dictionary (http://waterfire.us/joseki.htm), whose introduction lists guidelines for choosing a joseki by the adjacent corners and sides, and by ladders; paraphrased here, not quoted.
  - Game records — Gennan Inseki (W) v Shusaku (B), 1846, and AlphaGo (B) v Lee Sedol (W), 2016, game 2; see the `SO[]` line of each file. The departures discussed are facts of the records; the reasons given are ours.
  - The problems accept the move played in the game, nothing else; there is no engine behind them.
---

## Two proverbs

The Wikipedia article on joseki records a proverb: "learning jōseki loses two stones in strength". It also quotes the professional Rui Naiwei: "playing joseki is easy [but] choosing the right one [in a game] is hard." Both mean the same thing. A sequence learned by heart is a sequence played without looking — and the one thing a joseki cannot tell you is whether it is the right joseki *here*.

## Three questions before the next move

The dictionary's own advice for choosing comes down to looking outward:

1. **Which way will the result face?** A wall facing your own stones is worth a lot; a wall facing a living enemy group is worth little. Choose the joseki whose wall or whose territory points the right way — and choose the block, in the 3-3 invasion, by the same rule.
2. **Is there a ladder in it?** Several joseki have a variation that works only if a ladder works. Check the ladder before you start, and if the opponent has a stone on its path, choose the line without it.
3. **Is there something bigger elsewhere?** The next move of a joseki is usually worth a lot, but not always the most on the board. An empty corner is bigger than most joseki moves; so is the second approach to a corner that has already been approached once.

## Leaving in the games

```sgf
file: gennan-shusaku-1846.sgf
start: 5
```

Move 4: White approaches R16. The joseki says Black answers — Shusaku's own diagonal, even. Move 5: Shusaku takes the empty corner at C4 instead, and answers the approach four moves later. The empty corner was bigger, and the approach could wait; the joseki was left and then resumed.

```sgf
file: alphago-lee-sedol-2016-g2.sgf
start: 9
```

Moves 5 to 8 are a sequence in the lower right: approach, attachment, hane, connection. The local continuation would be Black's extension at N4. Move 9: Black approaches D4 at C6 instead — and comes back to N4 at move 11, after White has answered. The two moves were both big; the order was a whole-board choice.

## Problems

<p class="puzzle-intro">1 · From the 1846 game after move 4. White has approached. Black to play: Shusaku's move.</p>

```try
size: 19
black: R16 Q3
white: D17 P17
solution: C4
hint: The joseki answer is Q15. Is it the biggest move?
prompt: Play the move from the game.
success: C4, the last empty corner. The approach at P17 was answered four moves later, with the diagonal — the joseki resumed once the bigger move had been taken.
```

<p class="puzzle-intro">2 · From the 2016 game after move 8. The local sequence continues at N4. Black to play: AlphaGo's move.</p>

```try
size: 19
black: C16 Q16 P4 O3
white: D4 R4 P3 Q3
solution: C6
hint: The corner on the other side has a 4-4 stone with no approach yet.
prompt: Play the move from the game.
success: C6, the approach to D4. The extension at N4 came two moves later. When both moves are big and the local one can wait, play the one the opponent must answer first.
```

<p class="puzzle-intro">3 · Black to play. White has invaded at 3-3. You have a wall's worth of stones along the right already; which way should the new wall face?</p>

```try
size: 19
black: Q16 R10 R7
white: R17 D4 K17
solution: Q17 (R16 R15 (S15 R14 (S14 R13 (Q18 P18 (R18 O17)))))
hint: Block so that the wall faces your own stones, not White's stone at K17.
prompt: Block on the right side.
success: Q17, the block from the top: the wall then runs down the right side towards your stones at R10 and R7, and the top — where White already has K17 — is given up. Same joseki, chosen by the rest of the board.
```

## Remember

- A joseki is fair locally; the board decides whether it is good.
- Before the next move: which way does the result face, is there a ladder, is there something bigger?
- Leaving a joseki to take an empty corner or an unanswered approach is normal; coming back to it later is normal too.

+++ Read more: how many to learn
Professionals know thousands of variations; a strong amateur perhaps a few hundred; a player who has just learned the game needs the handful in this track, and the questions above. The questions do more work than the sequences, because a wrong joseki played perfectly is still a wrong joseki, while a right idea played roughly is usually fine. When a game goes wrong in the corner, look up the sequence afterwards — that is when a joseki dictionary is useful, and that is what the one behind these lessons is for.
+++
