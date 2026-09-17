---
id: games/lee-sedol-alphago-2016
track: Study a whole game
title: Lee Sedol – AlphaGo, game 4, 2016
lede: The one game a human won against AlphaGo, and the move that won it. You met this record in First steps, when it was only a way to learn the notation; now read it as a game.
level: 3
sources:
  - Game record — AlphaGo (B) v Lee Sedol 9p (W), Google DeepMind Challenge Match game 4, Seoul, 13 March 2016; move list from Andries Brouwer's game archive, checked against Wikipedia, "AlphaGo versus Lee Sedol" (180 moves, White wins by resignation, move 78 the wedge at L11, the first eleven moves identical to game 2). See the file's `SO[]` line. The comments in the viewer and here are ours.
  - Wikipedia, "AlphaGo versus Lee Sedol" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol — the match, the result, and the reception of move 78
  - No engine judged any move in this lesson — the site's own bot is far too weak to have an opinion about professional play, and we did not run a strong one. The problems accept the move played in the game; the positions come from the record at the move numbers given.
---

## The game

Lee Sedol had lost the first three games of a five-game match. This is the fourth: White, and the only game in the match — and the only official game AlphaGo ever lost.

```sgf
file: lee-sedol-alphago-2016-g4.sgf
```

## What to look for

**Moves 1–11, a modern opening.** 4-4 and 3-4 points, then approaches. These eleven moves are the same as in game 2 of the match, which the strategy track used for the shoulder hit at move 37. Openings repeat, even at this level — up to the point where someone decides to deviate.

**Moves 12–77, AlphaGo building.** Black takes the top and the right and presses White along the bottom. By move 77 White's position is thin in the centre, and every commentator watching thought the game was over, as the three before it had been.

**Move 78, L11 — the wedge.** White plays between two black stones in the middle of Black's area. It is a move nobody expected; Lee Sedol thought for a long time before playing it. The game turned on it.

**Moves 79–110, the answer that was not one.** AlphaGo replies K10 and then plays a series of moves that professionals called mistakes: the program had misjudged the wedge, and its estimate of the position stayed wrong for long enough for White to take the centre. It is the clearest published example of what the system's blind spot looked like.

**Move 180.** AlphaGo resigns. Lee Sedol wins by resignation, the only time in the match.

## Problems

<p class="puzzle-intro">1 · White to play, move 78. You have lost three games; the position looks lost too. Find the move.</p>

```try
size: 19
turn: w
white: E17 M17 N17 F16 J16 G15 O15 F14 N14 O14 C13 F13 K13 O13 E12 G12 O12 E11 N11 P11 Q11 R11 B10 C10 D10 N10 R10 J9 N9 E5 Q5 B4 D4 F4 R4 F3 P3 Q3
black: O18 D17 F17 H17 O17 C16 E16 H16 N16 O16 Q16 H15 N15 G14 M14 G13 N13 F12 M12 N12 F11 K11 M11 O11 E10 H10 O10 P10 Q10 C9 D9 F9 L9 C6 E4 N4 P4 J3 O3
solution: L11
hint: Between two black stones in the centre, on the eleventh line.
prompt: Play the wedge.
success: L11. A stone pushed into the gap between Black's K11 and M11 — deep inside Black's sphere, where no engine and no commentator expected a move. It worked because Black's answer was wrong, and Black's answer was wrong because the position was one AlphaGo had not learned. One move, one game, and the only loss in the match.
```

## Remember

- The opening of a 2016 professional game is still corners, approaches, sides.
- A move can be right because of what the opponent does next; that is not a lesser kind of right.
- The strongest player in the world had a blind spot, and a human found it over the board.

+++ Read more: what this lesson deliberately does not claim
It would be easy to write that move 78 was objectively the best move in the position, or that AlphaGo's replies were losing moves, and everyone said so at the time. We do not have the means to check either claim: the site's own bot plays at a level far below a club player, and no strong engine is part of this project. What is checkable, and checked, is the record itself — 180 moves, White by resignation, the move number and the point of the wedge, the shared opening with game 2 — all of it against Wikipedia's article on the match. The rest of what you read in the viewer is description of what happened on the board, plus what was reported at the time, attributed. That distinction is the same one running through every lesson here: the moves are facts, the judgements are somebody's.
+++
