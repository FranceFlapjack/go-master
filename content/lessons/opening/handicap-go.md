---
id: opening/handicap-go
track: The opening
title: Handicap games
lede: Go has a built-in way for players of different strength to have a real game — the weaker player starts with stones already on the board, one per rank of difference. Learn what the stones are for, and how each side plays with them.
level: 3
sources:
  - Wikipedia, "Go handicaps" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_handicaps — the fixed placement (upper right, lower left, lower right, upper left, centre, then the side points) and the absence of komi
  - Arthur Smith, The Game of Go (1908), chapter V, "Illustrative games", which includes handicap games with commentary on how each side plays — public domain, https://www.gutenberg.org/ebooks/66632
  - The placements are those of the site's rules engine (`handicapPoints`, tested against the Wikipedia order); the two ladder problems are checked by the capture search; the other problems are judgement, and say so.
---

## The stones

A handicap of *n* stones means Black places *n* stones on the star points before White's first move, and White then plays first; there is no komi (the Play page uses 0.5, only so that a game cannot end in a tie). One stone per rank of difference is the convention: a 5-kyu against a 9-kyu gives four stones. The placement is fixed:

```board
size: 19
handicap: 9
caption: Nine stones: all the star points. Fewer stones are placed in a fixed order — two: upper right and lower left; three: add lower right; four: all corners; five: add the centre; six: corners plus the left and right side points; seven: add the centre; eight: all but the centre.
```

```board
size: 13
handicap: 4
caption: Four stones on 13×13. The small boards have no side star points in this app, so the handicap runs to five there.
```

## What the stones do

Every handicap stone is a 4-4 point: it takes a corner loosely and faces both sides. So a handicap opening is the 4-4 point lesson four or nine times over — and with White to play, it is White who approaches, invades at 3-3, and tries to cut the black stones apart. Black's stones are already connected in spirit; the game is about keeping them so.

**Playing Black with a handicap.** Keep it simple. Answer approaches; connect when cut; extend from your stones along the sides rather than chase White's. Every ladder tends to favour you, because your stones are everywhere — a white stone that runs will run into one of them. Do not try to kill everything; White will live somewhere, and you will still be ahead if your stones stay connected.

**Playing White against a handicap.** You must make something happen: approach, invade, cut, and choose the fights where Black's stones are furthest apart. Play lightly — a stone that gets captured cost one move, and you have many to make up.

## Problems

<p class="puzzle-intro">1 · White to play against four stones. Approach the stone in the upper-right corner, Q16. (Either knight's-move approach, low or high, is accepted.)</p>

```try
size: 19
turn: w
handicap: 4
solution: (O17) (O16) (R14) (Q14)
hint: A knight's move from the 4-4 stone, on the third line (low) or the fourth (high), from either side.
prompt: Approach the upper-right stone.
success: O17 or R14, the low approaches, or O16 and Q14, the high ones. A 4-4 stone can be approached from either side; the shape is the same each time, and which side is a matter of what else is on the board.
```

<p class="puzzle-intro">2 · White to play against four stones, and you want a sure corner. Invade under the upper-right stone.</p>

```try
size: 19
turn: w
handicap: 4
solution: R17
hint: The 3-3 point under the 4-4 stone at Q16.
prompt: Invade at the 3-3 point.
success: R17, the 3-3 point under Q16. White lives in the corner; Black gets a wall. Early in a handicap game the wall is often the better half of the trade, which is why strong players usually approach first and invade later.
```

<p class="puzzle-intro">3 · Black to play with three stones on 9×9. White's cutting stone at E5 has two liberties. Capture it — both ladders work here, thanks to your stones.</p>

```try
size: 9
handicap: 3
turn: b
black: D5 E6 F4
white: E5
solution: (F5 (E4 E3 (D4 C4 (D3 D2)))) (E4 (F5 G5 (F6 G6 (F7 F8 (E7 D7 (E8 D8 (E9 D9 (F9 G9))))))))
expect: kill
target: E5
hint: Read each ladder to the edge. Your handicap stones are on both paths.
prompt: Capture the white stone.
success: Either atari works. The ladder from F5 runs into your stone at C3 and ends at D2; the one from E4 runs to the top edge and ends at G9. With stones on every star point, ladders are Black's friend.
```

<p class="puzzle-intro">4 · Black to play with three stones. Your stone at E5 is in atari. Save it.</p>

```try
size: 9
handicap: 3
turn: b
black: E5 D4
white: E4 D5 F5
solution: E6
expect: escape
target: E5
unique: true
hint: Extend, and look at where G7 is.
prompt: Save the black stone at E5.
success: E6. With three liberties and the handicap stone at G7 nearby, the chain cannot be caught. In a handicap game, "connect and keep going" is nearly always enough.
```

## Remember

- Handicap stones go on the star points in a fixed order; White plays first; no komi.
- Black: keep the stones connected, answer approaches, let White live small.
- White: approach, invade, cut — make the game complicated where Black's stones are far apart.
- Ladders favour the side with more stones on the board, which in a handicap game is Black.

+++ Read more: how much is a stone worth
A handicap stone is worth roughly one rank, which is to say roughly the advantage a player one rank stronger would have over an even game — on 19×19, commonly estimated at ten points or a little more. That estimate is why komi (about seven points) is often called about half a stone, and why the rules for small boards give fewer stones: a stone on 9×9 is worth far more of the board than a stone on 19×19. The exact value has been argued over for a century and depends on how strong the players are. For a beginner the practical rule is simpler: if you lose three times in a row, take another stone; if you win three times, give one back.
+++
