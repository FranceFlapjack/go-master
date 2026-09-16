---
id: strategy/urgent-before-big
track: Direction of play
title: Urgent before big
lede: Every position has a biggest empty point and, often, a point that is not big at all but must be played now — a cut to defend, an eye to make, a stone to connect. The urgent one comes first, because the big point will still be there and the group will not.
level: 3
sources:
  - Wikipedia, "Go strategy and tactics" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_strategy_and_tactics — "One must choose which of these moves is more urgent to play based not only on the points it may gain, but on whether that move is sente"; and, on connection, "connected stones are stronger because they share their liberties"
  - Wikipedia, "Go proverb" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_proverb — the proverbs "Keep your stones connected" and "Even a moron connects against a peep"
  - The tactical claims here are machine-checked — the cut is real (the site's capture search shows the stones die if the reader plays elsewhere; `refute:` names the tempting big point), and the group needs the move (the site's life-and-death search) — but which point is *biggest* is a judgement, not a calculation; problem 4's accepted answers are the corner points named in the opening track, and nothing there was checked by an engine.
---

## Two kinds of point

A **big** point is worth many points of territory and can be played at leisure: the last empty corner, a long extension along a side. An **urgent** point is worth little by itself — one stone, one connection, one eye — but if you do not play it now, the opponent plays there and something of yours dies. The rule of the middlegame is short: **urgent points before big points**. A big point taken while your group dies is a big point you paid for with the group.

How do you tell them apart? Ask what happens if the opponent plays there first. If the answer is "I lose a few points", the point is big. If the answer is "my stones are captured" or "my group has one eye", the point is urgent.

```board
size: 9
black: E5 E4 G4 H5
white: D5 D4 E6 F5 F3 E2
highlight: F4
caption: Black's two stones at E4–E5 have two liberties, F4 and E3. The top-left is wide open and looks like the biggest area on the board. But if White plays F4 the two stones are in atari, and E3 does not save them: F3 and E2 are waiting. F4 is urgent; the top-left is only big.
```

## Problems

<p class="puzzle-intro">1 · The position above, Black to play. Which is it — the open corner or the connection?</p>

```try
size: 9
black: E5 E4 G4 H5
white: D5 D4 E6 F5 F3 E2
solution: F4
expect: escape
target: E5
unique: true
refute: C7 B7
hint: Count the liberties of E4–E5, and see what White's next move there would do.
prompt: Find the urgent move.
success: F4 connects the two stones to G4 and H5 — one chain with plenty of liberties. Had you taken the corner at C7 instead, White F4 puts the pair in atari and the ladder down E3 runs straight into F3 and E2. Two stones for a corner is a bad trade when the corner will still be there next move.
```

<p class="puzzle-intro">2 · White to play. The top-right is empty, and your corner group is one move from life or death.</p>

```try
size: 9
turn: w
white: A3 B3 C3 D3 D2 D1 E7
black: A4 B4 C4 D4 E4 E3 E2 E1 G3 G6
solution: (B2 (A2 C2) (C2 A2) (A1 A2) (B1 A1) (C1 C2)) (B1 (A2 B2) (B2 A2) (C2 A2) (A1 A2) (C1 A2))
expect: live
target: A3
hint: You met this shape in "Life in the corner": rectangular six, no outside liberties. Whoever moves first decides it.
prompt: Live first; the corner can wait.
success: B2 or B1, and the group has two eyes whatever Black tries. Any move in the top-right — however big it looks — and Black plays B2 and six stones die. That is the whole lesson: a group with one eye is not a group, it is a debt.
```

<p class="puzzle-intro">3 · Black to play, on 13×13. White has peeped at your one-point jump from both sides.</p>

```try
size: 13
black: E4 E6 D3 F3 G3 D2
white: D5 D6 F7 E8 D7 F5 G6
solution: E5
expect: escape
target: E6
unique: true
refute: K10 K4 D10
hint: The proverb is blunt about it — "even a moron connects against a peep".
prompt: Connect or be cut.
success: E5. Solid, unglamorous, and the only move: if you play anywhere else, White E5 cuts, and the stone at E6 has two liberties in a shape it cannot escape from. The star points on the right are worth more than one stone — but not more than one stone plus the cut, which leaves White strong in the middle of your side.
```

<p class="puzzle-intro">4 · Black to play. Nothing is urgent: every group on the board has room. Take the big point.</p>

```try
size: 13
black: K4 D4 D3 E3 F3 G3 H3
white: K10 K9 L9 M9 J9 H9 F10 F11 G10
solution: (D10) (C10) (D11) (C11)
hint: Where is the last empty corner?
prompt: Nothing is urgent. Find the biggest point.
success: The top-left corner — D10, C10, D11 or C11, whichever suits your style. When no group is in danger, the biggest empty area is the move, and the corners are the biggest of all. The skill is not in finding this point; it is in checking, first, that nothing on the board is urgent.
```

## Remember

- Urgent before big. Ask what the opponent's move on the point would do: capture or eye means urgent.
- A group with one eye is a debt, not a possession. Pay it before spending.
- Connect against a peep; defend the cutting point; then take the big point, which will still be there.

+++ Read more: sente, and why "urgent" is about tempo
Wikipedia's article on strategy puts the urgent-or-big question in terms of *sente*: a move is more urgent when the opponent has to answer it, or when leaving it lets the opponent play a move you would have to answer. A cutting point is urgent because the cut is sente for the opponent — you must respond, and by then the big point has gone to them as well. So the rule "urgent before big" is really a rule about who gets to make the next free move. Play the urgent point and you lose a tempo but keep everything; skip it and you may keep the tempo and lose the stones — and usually the tempo too, because you will have to answer the cut anyway.
+++
