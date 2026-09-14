---
id: life-and-death/seki
track: Life and death
title: "Seki: mutual life"
lede: Two groups, neither with two eyes, each holding the other's last liberties. Whoever fills first is captured, so nobody fills, and both stay on the board. It is the one way to live without eyes.
level: 2
sources:
  - Wikipedia, "Seki" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Seki
  - Arthur Smith, The Game of Go (1908), chapter III, where the position is explained under its Japanese name — public domain, https://www.gutenberg.org/ebooks/66632
  - Positions composed for this lesson; both chains of every seki are checked by the site's life-and-death search (`expect: seki`), and the listed wrong moves are checked to lose.
---

## The standoff

```board
size: 9
white: A2 B2 C2 D2 E2 F2 F1
black: A3 B3 C3 D3 E3 F3 G2 G1 B1 C1 D1
life: A2 alive
labels: A1=a, E1=b
caption: Three black stones inside a white group. The black chain has two liberties, a and b. So has the white chain — the same two. If Black plays a, White plays b and captures three stones. If White plays a, Black plays b and captures seven. Neither side can afford to start, so neither does. This is seki.
```

```board
size: 9
white: A2 B2 C2 D2 E2 F2 F1
black: A3 B3 C3 D3 E3 F3 G2 G1 B1 C1 D1
life: B1 alive
caption: The same position from Black's side: the three stones inside cannot be killed either. The search behind these lessons confirms both — whoever moves first, nobody dies.
```

At the end of the game, a seki stays as it is. Under area scoring the stones count for their owners as usual, and the two shared points count for nobody, because they touch both colours.

## When it is not seki

The balance is exact, and one extra liberty tips it. If one side has an eye, that side can fill the shared liberties, because its last liberty is the eye, which the other side can never take. **One eye beats no eye.**

```board
size: 9
white: B1 C1 D1
black: A2 B2 C2 D2 E2 F2 F1 G1 G2 H2 A3 B3 C3 D3 E3 F3 G3 H3
labels: A1=a, E1=b
highlight: H1
life: B1 dead
caption: Three white stones inside a black group that has an eye at H1. White's liberties are a and b; Black's are a, b and the eye. Black fills a. White cannot answer at b: that stone would have no liberties and capture nothing. Black fills b and takes the three stones. Because of the eye, this is a kill, not a seki.
```

## Problems

<p class="puzzle-intro">1 · The first position, White to play. Black's stones inside share their last two liberties with you. What now?</p>

```try
size: 9
turn: w
white: A2 B2 C2 D2 E2 F2 F1
black: A3 B3 C3 D3 E3 F3 G2 G1 B1 C1 D1
solution: pass
expect: seki
target: A2 B1
refute: A1 E1
hint: Count what each side has left. Then count what you would have left after playing inside.
prompt: Play elsewhere (pass) or fill?
success: Pass — play elsewhere. Filling A1 or E1 leaves your group with one liberty and Black captures seven stones. Left alone, the position is seki and your stones are safe.
```

<p class="puzzle-intro">2 · Black to play, same position. The three stones inside look lost. Are they?</p>

```try
size: 9
white: A2 B2 C2 D2 E2 F2 F1
black: A3 B3 C3 D3 E3 F3 G2 G1 B1 C1 D1
solution: pass
expect: seki
target: A2 B1
refute: A1 E1
hint: The same count from the other side.
prompt: Play elsewhere (pass) or fill?
success: Pass. Your three stones have the same two liberties as the white chain, and White cannot fill either without dying. They are alive in seki, and they are worth points: the white group cannot make territory around them.
```

<p class="puzzle-intro">3 · One eye against none. Black to play and capture.</p>

```try
size: 9
black: A2 B2 C2 D2 E2 F2 F1 G1 G2 H2 A3 B3 C3 D3 E3 F3 G3 H3
white: B1 C1 D1
solution: (A1 (pass E1)) (E1 (pass A1))
expect: capture
hint: You have an eye at H1, so you can fill a shared liberty without fear.
prompt: Capture the three white stones.
success: Fill either shared liberty; White cannot fill the other, and you take the stones with your next move. With an eye of your own, the standoff is no standoff.
```

<p class="puzzle-intro">4 · Three shared liberties, Black to play. What is safe?</p>

```try
size: 9
white: A3 B3 C3 D3 E3 F3 F2 F1
black: A1 B1 C1 D1 B2 C2 D2 A4 B4 C4 D4 E4 F4 G3 G2 G1
solution: (pass) (A2) (E1) (E2)
expect: seki
target: A3 B1
hint: After one fill, two shared liberties remain. After two, one remains, and the next stone captures.
prompt: Play elsewhere (pass), or fill?
success: Passing is simplest, and filling one liberty is also safe: two shared liberties remain and the position is seki again. What you must never do is fill the second. Count your own liberties after the move, every time.
```

## Remember

- Seki: two chains, no eyes, sharing their last liberties. Whoever fills first dies. Nobody fills.
- Under area scoring the shared points count for nobody; the stones count as usual.
- One eye beats no eye: with an eye of your own, fill the shared liberties and capture.

+++ Read more: seki in real games
Seki turns up when a group that could not make two eyes is nonetheless too strong to capture — typically after a capturing race in which the liberties came out equal and neither side could approach. Beginners often lose a seki by filling: the position looks like a race, and filling the opponent's liberties has been the right habit all game. The habit that saves you is counting *your own* liberties after the move. Under Japanese rules there is a further subtlety, that points in seki are not territory even if surrounded; under the area scoring used here the rule is simpler, and it is only the shared liberties that count for nobody.
+++
