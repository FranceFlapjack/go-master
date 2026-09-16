---
id: strategy/good-and-bad-shape
track: Direction of play
title: Good shape, bad shape
lede: Shape is not aesthetics. A good shape is a group of stones with more liberties, fewer cutting points and more eye potential than another arrangement of the same stones; a bad shape has fewer of all three. The names are worth learning because the counting is always the same.
level: 3
sources:
  - Wikipedia, "Shape (Go)" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Shape_(Go) — good shape as "efficient use of stones in outlining territory, the strength of a group in a prospective fight, or making eye shapes"; the empty triangle as "an undesirable formation of three stones that inefficiently removes liberties"; the bamboo joint as "safe and can only be cut if short of liberties"; the tiger's mouth, so called "because an attacking stone would be under atari immediately if played directly in the mouth of the group"; the turn at the head of two stones "used to seize the initiative and to create a thick position"
  - Wikipedia, "Go proverb" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_proverb — "Don't make empty triangles", "Hane at the head of two stones", "Never try to cut bamboo joints", "Ponnuki is worth 30 points"
  - Wikipedia, "Go strategy and tactics" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_strategy_and_tactics — the empty triangle "where the stones are arranged so that they share fewer liberties than if they were deployed in a straight line"
  - The liberty counts in the text were computed with the site's rules engine. Problems 1, 2 and 4 are checked by the site's oracles (`expect: capture`; `expect: escape` with the shapely-looking alternatives refuted); problem 3 accepts the point the proverb names, and no engine judged it.
---

## Count, then name

Take three stones. In a straight line they have **eight** liberties; bent into an L — the **empty triangle**, three stones around an empty point — they have **seven**, and the point in the middle of the L is one that all three stones are already touching, so it does nothing for them. Same stones, one liberty fewer, one wasted point: that is what "bad shape" means, and every shape proverb comes down to a count like it.

```board
size: 9
black: B3 C3 D3 F3 G3 F4
labels: G4=x
caption: Left, a straight three: eight liberties. Right, an empty triangle: seven, and the point x is touched by all three stones, so a fourth stone there would add nothing. Wikipedia's proverb — "Don't make empty triangles" — is a proverb about liberties.
```

Three shapes worth knowing by name, because they come up in every game:

- **Tiger's mouth** (hanging connection): three stones around a point so that an enemy stone played into it is in atari at once. A connection that also threatens.
- **Bamboo joint**: two pairs of stones side by side with a one-point gap between them. It cannot be cut unless the pairs are short of liberties — so, the proverb says, never try.
- **Hane at the head of two stones**: when two enemy stones stand side by side and yours are alongside, the turn around their end is the move — it takes their liberties and leaves them facing the wrong way.

## Problems

<p class="puzzle-intro">1 · Black to play. Connect D4 and E5 with a tiger's mouth, so that White's cut is captured on the spot.</p>

```try
size: 9
black: D4 E5 G6
white: C4 D6 C6 G3
solution: F4 (E4 E3)
expect: capture
hint: Three black stones around E4, so that a white stone there has one liberty.
prompt: Make the hanging connection.
success: F4. Now D4, F4 and E5 form the mouth around E4: if White cuts there, the stone has one liberty at E3 and you take it. The solid connection at D5 would also have connected — but F4 connects and reaches towards G6 at the same time, and that is the difference between a shape and a stone.
```

<p class="puzzle-intro">2 · Black to play. White has pushed into your bamboo joint at E4. Show why the proverb says never to.</p>

```try
size: 9
black: D4 D5 F4 F5 E3 C7
white: E4 C3 G3 E7
solution: E5
expect: capture
hint: The cutting stone has one liberty.
prompt: Capture the cutting stone.
success: E5, and the stone that tried to cut is gone. A bamboo joint can be cut only when the pairs are short of liberties; here they were not, and the cut was a gift. Do not cut bamboo joints, and do not defend them either — they hold on their own.
```

<p class="puzzle-intro">3 · Black to play. White's two stones at E4–E5 stand beside your D4–D5. Hane at their head.</p>

```try
size: 9
black: D4 D5 C7
white: E4 E5 G3
solution: (E6) (E3)
hint: The head of two stones is the point past their end.
prompt: Play the hane at the head.
success: E6 or E3 — the turn around the end of the two stones. It takes a liberty, bends your stones around theirs, and leaves White the choice of extending into a low position or being pressed further. The proverb is one of the few that professionals repeat without qualification.
```

<p class="puzzle-intro">4 · Black to play. Your pair at D4–E4 has two liberties. The proverb says not to make an empty triangle. Count first.</p>

```try
size: 9
black: D4 E4 D6
white: C4 F4 E3 D3 F5 E6
solution: D5
expect: escape
target: D4
unique: true
refute: E5 C5
hint: Which move gives the pair the most liberties — and connects it to D6?
prompt: Save the pair.
success: D5 — an empty triangle, and the only move. It connects the pair to D6 and the three-stone chain has room. E5 looks better shaped and dies at once (White D5); C5 dies the same way. Shape proverbs are shorthand for counting liberties; when the count says otherwise, the count wins.
```

## Remember

- Shape is liberties, cutting points and eye potential — count them.
- Empty triangle: one liberty fewer and a wasted point. Tiger's mouth: a connection that ataris. Bamboo joint: uncuttable unless short of liberties.
- Hane at the head of two stones.
- The proverb is the default, the count is the decision.

+++ Read more: ponnuki, and why a captured stone is worth so much
The most famous shape is the one left after a capture of a single stone: four stones in a diamond around an empty point, the *ponnuki*. The proverb says it is worth thirty points, which nobody should take as arithmetic; what it means is that the shape is perfect. Wikipedia's article describes it as having high defensive capabilities and exerting influence in every direction — four stones with no cutting point, eye shape built in, and liberties on all sides. Compare it with four stones in a square (the "dango", another proverb's bad shape): the same number of stones with a fraction of the reach. When you are offered a stone to capture in the middle of the board, the stone is not the point; the ponnuki is.
+++
