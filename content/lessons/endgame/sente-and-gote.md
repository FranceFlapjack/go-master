---
id: endgame/sente-and-gote
track: The endgame
title: Sente and gote
lede: When the fighting is over, what is left is the borders. Every border move is either sente — the opponent has to answer — or gote — you end the exchange and the opponent gets the next free move. The endgame is played sente first, then the biggest gote.
level: 3
sources:
  - Wikipedia, "Go strategy and tactics" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_strategy_and_tactics — "A player whose moves compel the opponent to respond in a local position is said to have sente"; "Sente means 'preceding move' … whereas gote means 'succeeding move'"; "In the endgame (yose) players typically try to play all available sente moves and then play the largest gote move"; "A reverse sente play is a gote play that prevents the opponent from making a sente move"
  - Every counted diagram is checked by the site's scorer (`score:`), so the cost of ignoring a sente move and the size of a gote move are facts of the position. The connection in problem 2 is checked by the capture search (`expect: escape`). Everything else is the definitions above applied by hand.
---

## The two words

A move is **sente** when the opponent must answer it locally — because ignoring it costs more than anything else on the board. After a sente move and its answer, it is your turn again: you kept the initiative. A move is **gote** when you make the last move of the local exchange, and the opponent is free to play anywhere. Wikipedia's rule for the endgame follows at once: **play every sente move you have, then the largest gote move.** A sente move is free; a gote move costs you the next turn, so it had better be the biggest thing left.

The test for sente is a count: *what does it cost the opponent to ignore this?* If the answer is "less than the biggest move elsewhere", the move is not sente, whatever it threatens.

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8
white: E2 E3 E4 E5 E6 E7 E8 F2 D1
highlight: D1
labels: C1=a, D9=b
caption: White has played the hane at D1 under Black's wall. Black's atari at a is sente: White must connect at E1 or lose the stone. The push at b is gote — worth something, but it ends there. Sente first, then gote.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 C1 D9
white: E2 E3 E4 E5 E6 E7 E8 F2 D1 E1 E9
territory: true
score: W+18.5
caption: Black plays the sente move a, White connects, Black takes b, White blocks. White by 18.5 — the reference result.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9 C2 B1
white: E2 E3 E4 E5 E6 E7 E8 F2 D1 C1 E1 E9
territory: true
score: W+20.5
caption: Black takes b first. White extends to C1 — the sente move Black could have had — and after C2, E1, B1 and E9 the result is two points worse for Black. That is the price of playing gote before sente.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 C1 E1 D9
white: E2 E3 E4 E5 E6 E7 E8 F2 F1 E9
territory: true
score: W+14.5
caption: Black plays a and White ignores it, taking b's answer at E9 instead. Black captures the stone at E1, White blocks at F1. Four points better for Black than the reference: ignoring a sente move costs more than the move it was ignored for.
```

## Problems

<p class="puzzle-intro">1 · Black to play, the position at the top. Two moves are available. Which first?</p>

```try
size: 9
black: D2 D3 D4 D5 D6 D7 D8
white: E2 E3 E4 E5 E6 E7 E8 F2 D1
solution: C1 (E1 D9) (E9 E1)
hint: Which of the two moves does White have to answer?
prompt: Play sente before gote.
success: C1, atari on the hane stone. White connects at E1 (or loses four points, as the diagram shows), and you still have the move — so you take D9 as well. Had you played D9 first, White would have extended at C1 and the corner would have cost you two points.
```

<p class="puzzle-intro">2 · Black to play. You played the hane at E1, White blocked at F1. Now finish — the hane-and-connect is gote, and this is the gote part.</p>

```try
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9 E1
white: E2 E3 E4 E5 E6 E7 E8 F2 F1 E9
solution: D1
expect: escape
target: E1
unique: true
hint: The stone at E1 has one liberty.
prompt: Connect.
success: D1. Without it, White plays D1 and the hane stone is captured, with the corner opened behind it. Hane, block, connect: three moves, two of them yours, and White gets the next free move — that is what "gote" means in practice. It was still worth four points, which is why you played it.
```

<p class="puzzle-intro">3 · White to play. Black has played hane and connected at E1–D1. Two gote moves are left: the block at F1 and the push at D9. Count them.</p>

```try
size: 9
turn: w
white: E2 E3 E4 E5 E6 E7 E8 F2
black: D2 D3 D4 D5 D6 D7 D8 E1 D1
solution: (F1 (D9 E9)) (D9 (C9 E9 (F1 G1)))
hint: Neither move has to be answered. How much does each one swing?
prompt: Take the bigger gote move — if there is one.
success: Either. Both are gote, and both are worth two points: whichever you take, Black takes the other, and the count is the same — the two diagrams below prove it. Two moves of equal size are *miai*: the order does not matter, and knowing that is worth more than guessing. The lesson is not "F1" or "D9"; it is that you counted.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 E1 D1 D9
white: E2 E3 E4 E5 E6 E7 E8 F2 F1 E9
territory: true
score: W+14.5
caption: White blocks F1, Black pushes D9, White blocks E9.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 E1 D1 C9 F1
white: E2 E3 E4 E5 E6 E7 E8 F2 D9 E9 G1
territory: true
score: W+14.5
caption: White pushes D9, Black blocks C9, White E9; Black crawls F1, White blocks G1. The same count: the two moves were miai.
```

## Remember

- Sente: the opponent must answer. Gote: you end the exchange and they get the free move.
- Sente first, then the largest gote. A sente move is free; a gote move costs a turn.
- The test is a count: what does it cost to ignore? Less than the biggest move elsewhere means it is not sente.

+++ Read more: double sente and reverse sente
Two refinements. A move that is sente for *whichever* side plays it first is *double sente*: each player has a move there that the other must answer, so the first to play it gains for free — such points are played the moment they appear, ahead of everything. A *reverse sente* move — the article's term — is a gote move that removes the opponent's sente move: it gains what the sente move would have taken *and* denies them the free move, so it is worth more than its face value, and the endgame books count it accordingly. None of this changes the order of play; it changes what counts as "largest".
+++
