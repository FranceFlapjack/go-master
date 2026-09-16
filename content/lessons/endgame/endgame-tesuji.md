---
id: endgame/endgame-tesuji
track: The endgame
title: Endgame tesuji
lede: A tesuji is a clever local move — one that gains more than the plain move because of a tactical point the opponent cannot answer. Three that decide close games — the monkey jump, the placement on the first line, and knowing when a hane simply dies.
level: 3
sources:
  - Wikipedia, "Go proverb" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_proverb — "The monkey jump is worth 8 points"; "Strange things happen at the 1–2 points"
  - Wikipedia, "Go strategy and tactics" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_strategy_and_tactics — the endgame as maximising one's own boundaries while minimising the opponent's
  - Machine-checked: the monkey-jump stone cannot be captured once played (`expect: escape` with `target: move`, the capture search); the cut at F1 is caught (`capture-explore`: after Black's F2 the cutting stone cannot escape); the crawl-back continuations are read by hand and checked for legality only; the two counted diagrams that give its value here are checked by the scorer (`score:`); the hane that dies and the placement that kills are checked by the capture search (`expect: capture`, `expect: kill`). The proverb's "8 points" is the proverb's; the value in *this* position is the one the diagrams show.
---

## The monkey jump

From a stone on the second line, jump to the first line three points along — a large knight's move under the opponent's third-line stones. The stone looks cut off. In the standard lines it is not: the opponent blocks and it crawls back, or the opponent cuts and the cutting stone is caught — and on the way it destroys most of the first- and second-line territory. The proverb says it is worth eight points, which is a rule of thumb; count it in the position in front of you.

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9
white: E3 E4 E5 E6 E7 E8 E9 F3 G3 H3 J3
labels: G1=a, E2=b
caption: White's stones are on the third line; the first and second lines under them are White's territory — ten points. Black's monkey jump at a, from D2, undermines them. The plain push at b takes far less.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9 D1
white: E3 E4 E5 E6 E7 E8 E9 F3 G3 H3 J3 E2 E1
territory: true
score: W+16.5
caption: If White gets to defend first (E2, then E1 after Black's D1), the ten points stay White's. White by 16.5.
```

```board
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9 G1 F1 E1 D1
white: E3 E4 E5 E6 E7 E8 E9 F3 G3 H3 J3 H1 F2 E2
territory: true
score: W+6.5
caption: The monkey jump, in one standard line: G1, White blocks H1, Black F1, White F2, Black E1, White E2, Black connects D1. White by 6.5 — ten points better for Black than the diagram above, in these lines. The proverb's eight is the usual figure; here it is more, because White's whole first line was open.
```

## Problems

<p class="puzzle-intro">1 · Black to play. Monkey jump, and connect back whatever White tries.</p>

```try
size: 9
black: D2 D3 D4 D5 D6 D7 D8 D9
white: E3 E4 E5 E6 E7 E8 E9 F3 G3 H3 J3
solution: G1 (H1 F1 (F2 E1 (E2 D1))) (F2 F1 (E2 E1 (H1 D1))) (F1 F2 (E1 E2 (D1 C1)) (G2 E1))
expect: escape
target: move
hint: From D2, the large knight's move to the first line.
prompt: Play the monkey jump and bring it home.
success: G1. If White blocks at H1 you crawl back — F1, E1, D1 — and White must answer each one. If White attaches on top at F2, the same crawl. If White tries to cut underneath at F1, atari it from above with F2: the cutting stone cannot escape — if White extends to E1 you play E2, and D1 is then a stone with one liberty. The jump itself is safe (the site's search confirms G1 cannot be captured with White to move) and so is the cutting stone's fate (the same search: after F2 it cannot escape); the crawl-back lines are read by hand and checked for legality.
```

<p class="puzzle-intro">2 · White to play. Black has played the hane at E1 — but this time White's stone at F1 is already there.</p>

```try
size: 9
turn: w
white: E2 E3 E4 E5 E6 E7 E8 F2 F1
black: D2 D3 D4 D5 D6 D7 D8 E1
solution: D1
expect: capture
hint: The hane stone has one liberty.
prompt: Capture the hane.
success: D1. With F1 in place the hane at E1 had a single liberty, and D1 takes it — White gains the stone and the corner point behind it. The hane-and-connect from the sente lesson worked because F1 was empty; the same move with F1 occupied is a gift. Before every first-line hane, look at the stone next to it.
```

<p class="puzzle-intro">3 · Black to play. White's five stones along the second line have three liberties on the first line. One placement kills them.</p>

```try
size: 9
black: A3 B3 C3 D3 E3 E2 E1
white: A2 B2 C2 D2 D1
solution: B1 (C1 A1) (A1 C1)
expect: kill
target: A2
hint: Not the atari — the point in the middle of the three liberties.
prompt: Kill the white stones.
success: B1, the placement. Whichever side White takes, you take the other and the whole chain is captured: after C1, A1 is the last liberty; after A1, C1 is. An atari from either end would have let White extend along the first line. The 1–2 points are where strange things happen, as the proverb says — and where endgame problems are usually decided.
```

## Remember

- Monkey jump: second line to first line, three along. In the standard lines it connects back, and it takes the first and second lines.
- Before a first-line hane, look at the stone beside it. If the hane would have one liberty, it dies.
- On the first line, the placement in the middle of the liberties often beats the atari at the end.

+++ Read more: the throw-in, and why it is not here as a problem
The capturing-races lesson promised the throw-in for this track. A *throw-in* is a stone played deliberately into atari — into a one-point gap in the opponent's shape — so that capturing it costs a move and leaves a shortage of liberties or a false eye behind. It is the classic first-line tesuji: it reduces a two-point eye to one, forces a connection to be made at the wrong moment, or takes one liberty off a group in a race. It is not among the problems because the site's capture search does not read it — a throw-in is captured at once, and the search stops there, before the shortage it created has done its work. A problem whose answer the checker cannot confirm does not go in. When you meet one in a game, the test is the same as for every tesuji here: play it out both ways and count.
+++
