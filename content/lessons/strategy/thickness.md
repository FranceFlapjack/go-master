---
id: strategy/thickness
track: Direction of play
title: Thickness — use it, do not enclose with it
lede: A thick position is one the opponent cannot attack. Its value is not the points in front of it, which are yours anyway, but everything it lets you do elsewhere — attack harder, invade deeper, run towards it when in trouble.
level: 3
sources:
  - Wikipedia, "Go strategy and tactics" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_strategy_and_tactics — the definition ("An outward-facing position that cannot be attacked … is called thick"), "Thick positions are important as they radiate influence across the board", "An error that is often made by weaker players is to make territory in front of their thick position", "Thickness is better used from a distance, as support for other actions", and the two uses quoted in the text (a weak group runs towards the thick group; an invader is pushed towards it)
  - The tactical claims are machine-checked — the ladder into the wall (`expect: kill`, with the other atari refuted), the escape towards the wall (`expect: escape`, with the moves away from it refuted), and the invasion that is dead even with White to move (`life:`, the site's life-and-death search). Where to extend from a wall is a judgement following the quoted rule; no engine judged it.
---

## What thick means

Wikipedia's definition is exact: **an outward-facing position that cannot be attacked** — one that can make two eyes or connect whenever it needs to, and so never has to answer a move played near it. A wall of connected stones facing the open board is the usual example. Such a position *radiates influence*: every fight nearby is tilted towards it, because your stones there never need defending and the opponent's always do.

The classic mistake is to **make territory in front of it**. The points in front of a thick wall are the points you are most likely to get anyway; a stone played there to "secure" them is a stone that did nothing. Thickness is better used **from a distance**: extend far along the side, invade the opponent's area knowing you have somewhere to run, attack a weak group knowing it will be driven towards your wall.

```board
size: 9
black: C3 C4 C5 C6 C7
white: G7 H4
labels: D5=a, F4=b, G5=c
caption: Black's wall is thick. a, in front of it, takes points that were Black's already. b or c, far from the wall, uses it — a stone there is backed by the wall and threatens the white stones, and the space between is Black's to fight over from strength.
```

## Three uses of a wall

```board
size: 9
black: C1 C2 C3 C4 A5 B5 C5
white: B2
life: B2 dead
caption: Too small to live. White's stone at the 2-2 point is dead even if White moves next — the site's search reads it out. A two-line strip along a thick wall has no room for two eyes; the wall's influence is what makes the invasion pointless.
```

- **The ladder that works.** An invading stone near your wall runs out of room: the ladder runs into your stones. Problem 1.
- **Somewhere to run.** When a group of yours is in trouble near a thick wall, run *towards* it — every move that way is a move into safety. Problem 2.
- **Not in front of it.** Extend from the wall to the far side of the board, not to the point in front of it. Problem 3.

## Problems

<p class="puzzle-intro">1 · Black to play. White's stone at E4 has two liberties. One atari drives it into your wall; the other lets it out.</p>

```try
size: 9
black: C3 C4 C5 C6 C7 E5 F4 G7
white: E4 G2
solution: E3 (D4 D5 (D3 D2))
expect: kill
target: E4
refute: D4
hint: Which direction runs into the C-column?
prompt: Capture the white stone with the ladder that runs into your wall.
success: E3. White extends to D4, D5 keeps it in atari, D3 runs into the wall and D2 takes the last liberty. The other atari, D4, sends White down towards G2 — the wall is behind it, doing nothing. Thickness decides ladders.
```

<p class="puzzle-intro">2 · Black to play. Your two stones at F4–F5 are short of liberties. Run.</p>

```try
size: 9
black: C3 C4 C5 C6 C7 F5 F4
white: G5 G4 F6 F3 E7 E2 G6 G3
solution: (E5) (E4) (D5) (D4) (E6) (E3)
expect: escape
target: F5
refute: H5 H4 H6 H3
hint: Towards the wall, not away from it.
prompt: Save the two stones.
success: Any move towards the wall works — E5 or E4 extend, D5 or D4 reach out to it, E6 or E3 turn the corner — because the wall is there to connect to. Every move towards the right, where the white stones are, leaves the pair in a ladder it cannot win. A thick group is where your weak groups go to live.
```

<p class="puzzle-intro">3 · Black to play. Use the wall from a distance: extend, but not in front of it.</p>

```try
size: 9
black: C3 C4 C5 C6 C7
white: G7 H4
solution: (F4) (G5) (F5) (G4) (F3)
hint: The points next to the wall are yours already. Where is a stone backed by the wall and *threatening* something?
prompt: Extend from the wall.
success: F4, G5 or a point near them: far from the wall, next to White's stones, and backed by everything behind it. D5 or E5 would have taken points that were never in doubt. The rule from the article is worth repeating: thickness is better used from a distance.
```

## Remember

- Thick: outward-facing and unattackable. Its value is influence, not the points in front of it.
- Do not make territory in front of thickness; extend far, invade, attack — the wall backs all of it.
- Ladders and escapes are decided by what is at the end of them. Run towards your wall; drive the opponent into it.

+++ Read more: thick, light and heavy
The article pairs thickness with two other words. A **light** group is also hard to attack, but for the opposite reason: it has few stones in it, none of them important, so it can give some up and still come out ahead — sacrifice is built in. A **heavy** group is the bad case, a weak group with too many stones to abandon, which therefore has to be defended at any cost and becomes the target of the whole middlegame. Beginners make heavy groups by adding stones to a weak one hoping it will become thick; it only becomes bigger. If a group cannot be made thick in one move, consider whether it could be made light instead — that is, whether some of it can be given away.
+++
