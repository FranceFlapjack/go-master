---
id: strategy/ko-fights
track: Direction of play
title: Ko fights and threats
lede: You learned the mechanics in First steps — threat, answer, retake. The fight is decided before it starts, by counting: how much the ko is worth, how much each threat is worth, and who has more of them.
level: 3
sources:
  - Wikipedia, "Ko fight" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Ko_fight — "Count ko threats"; "Favor situations which give you more ko threats and your opponent fewer"; "You should give absolute priority to local ko threats, which threaten to resolve the local situation in your favor regardless of the outcome of the ko"
  - Wikipedia, "Go strategy and tactics" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_strategy_and_tactics — "A ko threat is a move that forces one's opponent to respond, or risk a punishing blow"; "A good ko threat should threaten more damage to one's opponent's position than the value of losing the ko"
  - Every counted diagram is checked by the site's scorer (`score:`), so the value of the ko and of the threat are facts of the position, counting the stones as they stand; the problem trees are checked for legality and for ending in the capture they claim (`expect: capture`, with the pending ko set by `ko:`). Which threats a real game offers is not something a program here can judge.
---

## Before the fight: count

A ko is a fight over tempo. You take, the opponent cannot take back at once and must play a **ko threat** — a move you have to answer, or lose more than the ko is worth. You answer, they retake, and now *you* need a threat. Whoever runs out of threats first loses the ko. So Wikipedia's advice is a list of things to count before you start:

- **The ko itself.** How many points change hands if you win it rather than lose it? Count both endings.
- **Each threat.** A threat is only a threat if ignoring it costs more than the ko. Anything smaller can be ignored: the opponent connects the ko and takes the loss.
- **How many.** Favour fights where you have more threats than the opponent. If you have none, do not start.
- **Local threats first.** A threat that also settles the local situation — captures the stones around the ko, or makes the ko unnecessary — takes priority over everything.

## A ko, counted

```board
size: 9
black: D1 D2 D3 D4 D5 D6 D7 D8 D9 E4 E6 F5 F2 F3
white: G1 G2 G3 G4 G5 G6 G7 G8 G9 F4 F6 F1
ko: E5
highlight: E5
caption: Black has just captured at E5 and White may not retake. Black's F5 stone is in atari; Black's F2–F3 stones have two liberties, E2 and E3, and connect to the wall whenever they like. White to play.
```

```board
size: 9
black: D1 D2 D3 D4 D5 D6 D7 D8 D9 E4 E6 F2 F3
white: G1 G2 G3 G4 G5 G6 G7 G8 G9 F4 F6 F1 E5 F5
territory: true
score: B+0.5
caption: If White wins the ko: E5 and F5 are White's. Black 40, White 39.5 — Black wins by half a point.
```

```board
size: 9
black: D1 D2 D3 D4 D5 D6 D7 D8 D9 E4 E6 F2 F3 E5 F5
white: G1 G2 G3 G4 G5 G6 G7 G8 G9 F4 F6 F1
territory: true
score: B+4.5
caption: If Black wins it: Black 42, White 37.5. The ko is worth four points — the difference between the two endings.
```

## Problems

<p class="puzzle-intro">1 · White to play, in the position at the top. You may not retake at E5. Make a threat Black must answer, then retake.</p>

```try
size: 9
turn: w
white: G1 G2 G3 G4 G5 G6 G7 G8 G9 F4 F6 F1
black: D1 D2 D3 D4 D5 D6 D7 D8 D9 E4 E6 F5 F2 F3
ko: E5
solution: E3 (E2 E5) (E5 E2)
expect: capture
hint: Black's F2–F3 stones have two liberties. Take one of them.
prompt: Find the ko threat.
success: E3, atari on F2–F3. If Black answers at E2 — capturing your stone — you retake the ko at E5, and Black needs a threat of their own. If Black ignores you and connects at E5 instead, E2 captures the two stones. Either way you got what a threat is for: a free move while Black decides.
```

<p class="puzzle-intro">2 · Black to play. White has retaken at E5 and you may not take back at F5. White's two stones at C2–C3 have two liberties.</p>

```try
size: 9
black: D1 D2 D3 D4 D5 D6 D7 D8 D9 E4 E6 F2 F3 C1 C4
white: G1 G2 G3 G4 G5 G6 G7 G8 G9 F4 F6 F1 E5 C2 C3
ko: F5
solution: B3 (B2 F5) (F5 B2)
expect: capture
hint: Atari on the two stones from the side that leaves them nowhere good to go.
prompt: Find your ko threat.
success: B3. If White extends to B2 you retake at F5; if White ignores you and connects the ko at F5, B2 captures C2–C3 — more than the ko was worth. Counting your threats before the fight means counting positions like C2–C3 all over the board.
```

<p class="puzzle-intro">3 · Black to play. White has just played the threat at E3 from problem 1. Answer it, or ignore it and connect the ko? Count.</p>

```try
size: 9
black: D1 D2 D3 D4 D5 D6 D7 D8 D9 E4 E6 F5 F2 F3
white: G1 G2 G3 G4 G5 G6 G7 G8 G9 F4 F6 F1 E3
ko: E5
solution: E2
expect: capture
hint: The ko is worth four points. What are F2–F3 worth, with the point their captor would gain?
prompt: Answer or ignore?
success: E2 — answer, capturing the threat stone. The two diagrams below show why: ignore the threat and connect the ko, and White captures F2–F3 for a result of White by 1.5; answer it and lose the ko, and Black still wins by 2.5. The threat was bigger than the ko, so it was a real threat, and a real threat is answered.
```

```board
size: 9
black: D1 D2 D3 D4 D5 D6 D7 D8 D9 E4 E6 E5 F5
white: G1 G2 G3 G4 G5 G6 G7 G8 G9 F4 F6 F1 E3 E2
territory: true
score: W+1.5
caption: Black ignored the threat and connected at E5; White took F2–F3 with E2. White by 1.5.
```

```board
size: 9
black: D1 D2 D3 D4 D5 D6 D7 D8 D9 E4 E6 F2 F3 E2
white: G1 G2 G3 G4 G5 G6 G7 G8 G9 F4 F6 F1 E5 F5
territory: true
score: B+2.5
caption: Black answered at E2 and White won the ko. Black by 2.5 — four points better than ignoring.
```

## Remember

- Count the ko: the difference between winning it and losing it.
- A threat must be worth more than the ko, or it is not a threat — ignore it and connect.
- Count threats on both sides before you start. Local threats first.

+++ Read more: what a ko threat costs
Every threat that is answered costs the player who made it something: the answer usually leaves the threatening stone captured or useless, and the position it was played in is a little worse than before. So a ko fight burns threats on both sides, and the player with more of them — or with bigger ones — wins. This is why strong players avoid *making* ko threats early in the game where they can help it (a threat played is a threat spent) and why a position full of weaknesses is a position full of the opponent's ko threats. It is also why the biggest ko fights come at the end: by then everything else is settled, the threats that remain are countable, and the ko is often the last thing that decides the game.
+++
