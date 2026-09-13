---
id: capturing/capturing-races
track: Capturing techniques
title: Capturing races
lede: Two chains, neither with two eyes, each surrounding the other. One of them will be captured. Count the liberties, and you know which — before either side plays a stone.
level: 1
sources:
  - Wikipedia, "Capturing race" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Capturing_race
  - Positions composed for this lesson; every line is checked by the site's rules engine (`expect: capture`), and each race was counted by hand — the capture search does not read races.
---

## Counting

A **capturing race** (Japanese *semeai*) is decided by counting. With no shared liberties and no eyes, the rule is:

> Count each chain's liberties. If you have **more**, you win even if the opponent moves first. If you have **the same number**, whoever moves first wins. If you have fewer, you lose, and should not add stones.

```board
size: 9
black: D5 E5 D3 E3
white: D4 E4 D6 E6
labels: C5=a, F5=b, C4=x, F4=y
caption: Black's chain has liberties a and b; White's has x and y. Two against two, Black to play: Black fills x, White fills a, Black fills y and captures. Had White been to play, White would have won the same way.
```

**Shared liberties** — points that touch both chains — change the count, because filling one takes a liberty from yourself as well. Fill the opponent's outside liberties first and the shared ones last; a chain with more outside liberties than the opponent wins a race with shared liberties even more comfortably, because the opponent can never approach.

## Problems

<p class="puzzle-intro">1 · The position above. Two liberties each, Black to play.</p>

```try
size: 9
black: D5 E5 D3 E3
white: D4 E4 D6 E6
solution: (C4 (C5 F4) (F5 F4)) (F4 (C5 C4) (F5 C4))
expect: capture
hint: Take one of White's liberties; White takes one of yours; take the last.
prompt: Win the race.
success: Two against two with the move: fill, fill, capture. Note that adding a stone inside your own chain, or playing elsewhere, would have handed White the same win.
```

<p class="puzzle-intro">2 · One shared liberty at D1. Black's stones have A1 and D1; White's have D1 and G1. Black to play.</p>

```try
size: 9
black: B1 C1 E2 F2
white: B2 C2 E1 F1
solution: G1 (D1 D2) (D2 D1) (A1 D1)
expect: capture
hint: The shared liberty is the last one to fill. Which liberty is White's alone?
prompt: Win the race.
success: G1. Now White's only liberty is the shared point, and White cannot play there: it would be self-atari with nothing captured. Whatever White does, Black captures. Had Black filled D1 first, White would simply have extended to G1 and run out with three liberties, and Black's own stones would then have needed defending.
```

<p class="puzzle-intro">3 · Three liberties against two. Black wins even though White is to move next — but play it correctly.</p>

```try
size: 9
black: D5 E5 F5 D3 E3 F3
white: D4 E4 F4 D6 F6
solution: (C4 (C5 G4) (E6 G4) (G5 G4)) (G4 (C5 C4) (E6 C4) (G5 C4))
expect: capture
hint: Black's liberties are C5, E6 and G5; White's are C4 and G4. Start filling.
prompt: Win the race.
success: Three against two: Black fills one, White fills one, Black captures with a liberty to spare. Counting told you the result before the first stone; the moves only confirm it.
```

## Remember

- No eyes, no shared liberties: more liberties wins; equal liberties, the player to move wins.
- Fill the opponent's outside liberties first, shared liberties last.
- If the count says you lose, do not add stones: every stone you add is one more prisoner.

+++ Read more: eyes, throw-ins and seki
Three refinements, each with its own lesson later. First, **an eye counts extra**: a chain with one eye beats a chain with none in a race with shared liberties, because the eyeless side cannot fill the shared points without putting itself in atari, while the eyed side can. Second, a **throw-in** — a stone played inside the opponent's liberty that they must capture — can cost them a liberty, or a move, and turn a lost count into a won one. Third, when two chains face each other with shared liberties and neither can approach, nobody plays: the position is **seki**, both live, and the shared points count for no one. The life-and-death track treats seki on its own; the endgame track returns to the throw-in.
+++
