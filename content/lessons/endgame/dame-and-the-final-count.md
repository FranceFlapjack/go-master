---
id: endgame/dame-and-the-final-count
track: The endgame
title: Neutral points and the final count
lede: The game ends when both players pass. Before that, three things: fill the neutral points, close every border, and agree which stones are dead. Under area scoring each of them is worth exactly what the count says — and the count is on the play page.
level: 3
sources:
  - Wikipedia, "Rules of Go" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Rules_of_Go — area scoring: "a player's score is determined by the number of stones that player has on the board plus the empty area surrounded by that player's stones"; territory scoring: "the number of empty locations that player has surrounded minus the number of stones their opponent has captured"; a neutral point: "an empty intersection belongs to neither player's territory"; the end: "The game ends when both players have passed consecutively"; on disputes, Chinese rules resolve them by playing on
  - Wikipedia, "Go strategy and tactics" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_strategy_and_tactics — the endgame example of a dame point that "when filled in, is sente"
  - Every count here is checked by the site's scorer (`score:`, with `dead:` where stones are removed first); the capture in problem 2 by the capture search (`expect: capture`). The site scores by area with komi 7.5, as its play page does.
---

## What is left at the very end

When every border is settled there are still empty points that belong to nobody: they touch both colours and cannot be surrounded by either. These are the **neutral points** (*dame*). Under territory scoring they are worth nothing and are filled out of tidiness. Under **area scoring** — what this site uses, and what Chinese rules use — a stone on the board counts, so every neutral point is worth one point to whoever fills it. Fill them in turn, and count them like any other one-point gote move; the last one matters as much as the first.

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9 D1
white: E2 E3 E4 E6 E7 E8 E9 E1 F5
territory: true
score: W+15.5
highlight: E5
caption: One neutral point left, E5: it touches Black's D5 and White's E4, E6 and F5. As it stands, White by 15.5.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9 D1 E5
white: E2 E3 E4 E6 E7 E8 E9 E1 F5
territory: true
score: W+14.5
caption: Black fills it: one more black stone, White by 14.5.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9 D1
white: E2 E3 E4 E6 E7 E8 E9 E1 F5 E5
territory: true
score: W+16.5
caption: White fills it instead: White by 16.5. Two points between the two — a neutral point is a real move under area scoring.
```

## Borders, and dead stones

Territory only counts when it is closed. A single gap, and the whole region behind it touches both colours and counts for nobody — the counting lesson in First steps showed it, and the diagram below shows it again with one stone missing from a wall. Close every border before you pass.

```board
size: 9
black: D2 D3 D4 D6 D7 D8 D9 D1 B8
white: E2 E3 E4 E6 E7 E8 E9 E1 F5 E5
territory: true
score: W+43.5
x: D5
caption: Black's wall is missing D5, and White's stone at E5 looks through the gap. Every empty point on the left now touches White as well as Black: Black's whole side counts for nobody. One stone at D5 is worth the side.
```

Then the dead stones. Stones left inside the opponent's territory that could not make two eyes are **dead**: at the end both players agree they come off, and the points they stood on count for the surrounding side. If the players do not agree, area scoring has a simple answer — **play it out**. Capturing a dead stone inside your own territory costs nothing under area scoring: the stone you add is a point, and the point it stands on was yours anyway.

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9 D1 E5 B8
white: E2 E3 E4 E6 E7 E8 E9 E1 F5 B9 C9
territory: true
score: W+42.5
caption: Two white stones at B9–C9 inside Black's area, with two liberties. Counted as they stand, they make the whole left side neutral — White by 42.5.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9 D1 E5 B8
white: E2 E3 E4 E6 E7 E8 E9 E1 F5 B9 C9
territory: true
dead: B9 C9
score: W+14.5
caption: Agreed dead and removed: White by 14.5, the same as if they had never been played. That is the count the play page shows after you mark them.
```

## Problems

<p class="puzzle-intro">1 · Black to play. Every border is closed; one neutral point is left. Take it.</p>

```try
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9 D1
white: E2 E3 E4 E6 E7 E8 E9 E1 F5
solution: E5
hint: The one empty point that touches both colours.
prompt: Fill the last neutral point.
success: E5. One point, and the last move of the game — after it there is nothing left but to pass. Under area scoring you never pass while a neutral point is open; it is a free point for whoever remembers it.
```

<p class="puzzle-intro">2 · Black to play. White insists the stones at B9–C9 are alive. Under area scoring the answer is not an argument. Capture them.</p>

```try
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9 D1 E5 B8
white: E2 E3 E4 E6 E7 E8 E9 E1 F5 B9 C9
solution: (C8 (pass A9)) (A9 (C8 C7) (pass C8))
expect: capture
hint: Two liberties. Take one, and the other when White has nothing to say.
prompt: Play it out.
success: C8 or A9, then the other liberty, and the stones are gone. It cost you nothing: every stone you played inside your own area is a point of area, and the points the white stones stood on are yours. When in doubt at the end of a game, capture — the count does not change, and the argument does.
```

<p class="puzzle-intro">3 · Black to play. Before you pass — is every border closed?</p>

```try
size: 9
black: D2 D3 D4 D6 D7 D8 D9 D1 B8
white: E2 E3 E4 E6 E7 E8 E9 E1 F5 E5
solution: D5
hint: Look for the empty point in your wall that a white stone is looking through.
prompt: Close the border.
success: D5. Without it the whole left side counts for nobody — the diagram above put a number on it. The last thing to do before passing is to walk every border and ask, of each empty point, which colour it touches. If the answer is both, and it is yours to close, close it.
```

## Remember

- Neutral points are worth a point each under area scoring — a two-point swing between the two players, in the counting lesson's terms. Fill them in turn; never pass with one open.
- A border with a gap is not a border. Walk them all before passing.
- Dead stones come off by agreement; if there is no agreement, capture them — it costs nothing under area scoring.
- The game ends with two passes in a row, and the count is what is on the board.

+++ Read more: area and territory, and why the two counts nearly always agree
Wikipedia's rules article sets the two systems side by side: area scoring counts your stones and the empty points you surround; territory scoring counts the empty points you surround minus the stones the opponent captured from you. They sound different and come to almost the same result, because in a finished game each side has played about the same number of stones, so counting stones adds nearly equal amounts to both — and captured stones, counted against you under territory rules, are stones missing from the board under area rules. The two counts differ by a point or so when one side has passed more often, or when neutral points are filled unevenly — one reason the komi differs between rule sets. Seki is the other difference: under Japanese rules the empty points in a seki count for nobody even when surrounded by one colour, under area rules the stones count as usual. This site counts by area, so everything in this track is in those terms.
+++
