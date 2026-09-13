---
id: first-steps/counting-the-score
track: First steps
title: How a game ends and is counted
lede: Two passes end the game. Dead stones come off, each side counts the points it surrounds plus the stones it has on the board, White adds komi, and the bigger number wins.
level: 0
sources:
  - Wikipedia, "Rules of Go", sections "Ending the game" and "Scoring systems" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Rules_of_Go
  - Arthur Smith, The Game of Go (1908), chapter III, on the end of the game and counting — public domain, https://www.gutenberg.org/ebooks/66632
  - Positions composed for this lesson; every count below is checked by the site's scorer (scripts/check-content.mjs).
---

## The end

A game of Go has no checkmate. It ends when **both players pass in a row**, which they do when neither can gain anything more: every border is closed, every group is settled. Then the two players agree which stones are **dead** — stones that could not escape capture if the game went on — and take them off the board without playing it out.

## The count

This site uses **area counting**. Each side's score is:

> the empty points only its stones border **+** the stones it has on the board

White adds **komi**, 7.5 points, for having moved second. Empty points that touch both colours count for nobody. The half point means there is never a tie.

```board
size: 9
black: A4 B4 C4 D4 E4 E5 E6 F6 G6 H6 J6
white: A5 B5 C5 D5 D6 D7 E7 F7 G7 H7 J7
territory: true
score: B+3.5
caption: The finished game from the first lesson, with the counted points marked. Black 35 + 11 stones = 46. White 24 + 11 = 35, plus komi 42.5. Black wins by 3.5.
```

Now suppose a white stone had been left inside Black's area. It cannot make two eyes there, so it is dead. Both players agree, the stone comes off, and the point it stood on is Black's.

```board
size: 9
black: A4 B4 C4 D4 E4 E5 E6 F6 G6 H6 J6
white: A5 B5 C5 D5 D6 D7 E7 F7 G7 H7 J7 B2
territory: true
dead: B2
x: B2
score: B+3.5
caption: The white stone at B2 is dead. Removed, it leaves Black's 35 points intact: still 46 to 42.5.
```

If the players cannot agree whether a group is dead, they play it out. Under area counting this costs nothing: a stone played inside your own territory is a stone on the board, and the empty point it covers was yours anyway, so the total does not change. **When in doubt, capture.**

## A border left open

Territory only counts when it is closed. One gap, and the whole region touches both colours and counts for nobody.

```board
size: 9
black: E1 E2 E3 E4 E6 E7 E8 E9
white: F1 F2 F3 F4 F5 F6 F7 F8 F9
territory: true
highlight: E5
score: W+35.5
caption: Black's wall has a hole at E5. The empty region on the left touches the white stone at F5, so it is neutral: Black has 8 points, White 36 plus komi. One move at E5 turns this into a win for Black by 3.5.
```

## Problems

<p class="puzzle-intro">1 · Close the border. Then the left side is Black's and Black wins by 3.5.</p>

```try
size: 9
black: E1 E2 E3 E4 E6 E7 E8 E9
white: F1 F2 F3 F4 F5 F6 F7 F8 F9
solution: E5
hint: Which empty point on Black's side touches a white stone?
prompt: Close the wall.
success: E5. Now no empty point on the left touches White, and all 36 of them are Black's. From W+35.5 to B+3.5 with one stone: borders first, always.
```

<p class="puzzle-intro">2 · White claims the two stones at B2 and C2 are alive. Under area counting it costs nothing to prove otherwise. Capture them.</p>

```try
size: 9
black: A2 B1 C1 B3 C3 E1 E2 E3 E4 E5 E6 E7 E8 E9
white: B2 C2 F1 F2 F3 F4 F5 F6 F7 F8 F9
solution: D2
expect: capture
hint: The two white stones have one liberty.
prompt: Capture the two dead stones.
success: D2 takes them. Compared with simply removing them as dead, nothing changes: the stone at D2 stands on a point that was Black's anyway, and the two empty points are Black's too. The argument is settled at no cost.
```

## Remember

- Two passes in a row end the game; then dead stones come off.
- Area count: empty points you alone surround, plus your stones on the board. White adds 7.5 komi.
- A region that touches both colours counts for nobody. Close your borders.
- Filling your own territory or capturing a dead stone costs nothing under area counting. When in doubt, play it out.

+++ Read more: the other way of counting
Books and many servers use **territory counting** (the Japanese and Korean rules): you count only the empty points you surround, and add the prisoners you captured during the game, and the dead stones you remove at the end, as points; your own stones on the board do not count. Filling your own territory then *costs* a point, so the endgame ends with both sides passing rather than filling in.

The two methods almost always give the same winner, because a stone played inside your territory under area rules gains a stone and loses a point; and every stone captured under territory rules is a point for the captor and a point of territory lost for the victim. The differences are tiny (usually one point, from who played last) and only matter in games decided by half a point. Learn to count both ways eventually; start with area counting, because it has nothing to remember — count what is on the board and what is enclosed, and you are done.

On this site's play page, after two passes, click any stones you agree are dead and the count appears, painted on the board.
+++
