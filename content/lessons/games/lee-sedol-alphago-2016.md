---
id: games/lee-sedol-alphago-2016
track: Study a whole game
title: Lee Sedol – AlphaGo, game 4, 2016
lede: The one game a human won against AlphaGo, and the move that won it. You met this record in First steps, when it was only a way to learn the notation; now read it as a game.
level: 3
sources:
  - Game record — AlphaGo (B) v Lee Sedol 9p (W), Google DeepMind Challenge Match game 4, Seoul, 13 March 2016; move list from Andries Brouwer's game archive, checked against Wikipedia, "AlphaGo versus Lee Sedol" (180 moves, White wins by resignation, move 78 the wedge at L11, the first eleven moves identical to game 2). See the file's `SO[]` line. The comments in the viewer and here are ours.
  - Wikipedia, "AlphaGo versus Lee Sedol" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol — the 4–1 match score and game 4 as AlphaGo's only loss in the match; move 78 as "a brilliant *tesuji*" that "turned the game around", Gu Li's "divine move", and AlphaGo's collapse ("responded poorly on move 79", 70% estimate, assessment "suddenly plummeted", "a series of very bad moves from black 87 to 101")
  - No engine judged any move in this lesson — the site's own bot is far too weak to have an opinion about professional play, and we did not run a strong one. The problems accept the move played in the game; the positions come from the record at the move numbers given.
---

## The game

Lee Sedol had lost the first three games of a five-game match. This is the fourth: White, and the only game he won — AlphaGo took the match 4–1.

```sgf
file: lee-sedol-alphago-2016-g4.sgf
```

## What to look for

**Moves 1–11, a modern opening.** 4-4 and 3-4 points, then approaches. These eleven moves are the same as in game 2 of the match, which the strategy track used for the shoulder hit at move 37. Openings repeat, even at this level — up to the point where someone decides to deviate.

**Moves 12–77, AlphaGo building.** Black takes the top and the right and presses White along the bottom. By move 77 White's position is thin in the centre.

**Move 78, L11 — the wedge.** White plays between two black stones in the middle of Black's area. Wikipedia's article on the match calls it "a brilliant *tesuji*" that "turned the game around", and quotes Gu Li 9p calling it a "divine move", "completely unforeseen by him".

**Moves 79–110, the answer that was not one.** AlphaGo replies K10. The article records what happened inside the program: it "responded poorly on move 79", still estimating a 70% chance of winning; after Lee's move 82 its assessment "suddenly plummeted", and it made "a series of very bad moves from black 87 to 101".

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
success: L11. A stone pushed into the gap between Black's K11 and M11, deep inside Black's sphere. Gu Li 9p called it a divine move and said it was completely unforeseen by him; AlphaGo answered poorly and, a few moves later, collapsed. One move, one game — AlphaGo's only loss in the match.
```

## Remember

- The opening of a 2016 professional game is still corners, approaches, sides.
- A move can be right because of what the opponent does next; that is not a lesser kind of right.
- The strongest player in the world had a blind spot, and a human found it over the board — once, in five games.

+++ Read more: what this lesson deliberately does not claim
It would be easy to write that move 78 was objectively the best move in the position, or to put numbers on how much AlphaGo's replies lost. We do not have the means to check either: the site's own bot plays at a level far below a club player, and no strong engine is part of this project. What is checkable, and checked, is the record itself — 180 moves, White by resignation, the move number and the point of the wedge, the shared opening with game 2 — all of it against Wikipedia's article on the match. What commentators said, and what the programme's own win estimate did, is quoted from that article and attributed there; the rest of what you read in the viewer is description of what happened on the board. That distinction is the same one running through every lesson here: the moves are facts, the judgements are somebody's.
+++
