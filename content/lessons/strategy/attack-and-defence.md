---
id: strategy/attack-and-defence
track: Direction of play
title: Attack to gain, not to kill
lede: A weak group is not a target to be killed; it is a handle. Push it where you want it to go, and take territory and strength on the way. If it dies, it dies of its own accord — usually against something thick of yours.
level: 3
sources:
  - Wikipedia, "Go strategy and tactics" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_strategy_and_tactics — "in most cases the goal of an attack is not to kill the attacked group, but to gain territory or influence"; and, on thickness, "if White tries to invade near a thick group, Black can try to push White towards its thick group"
  - Wikipedia, "Go proverb" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_proverb — "In a fight, contact plays strengthen the underdog"; "You only have one weak group. Your other weak groups are dead."
  - Where a problem ends in a capture, the site's capture search confirms it (`expect: kill`) and the uniqueness of the move; where a diagram says a group is alive, the life-and-death search confirms it (`life:`). Which side to attack from is a judgement: the accepted answers follow the rules quoted above, and no engine judged them.
---

## What an attack is for

The middlegame is mostly spent attacking weak groups — groups without two eyes, without a base, with few liberties. Beginners attack to kill, and usually fail: a group that can run or make an eye will do so, and the attacker is left with a row of stones that did nothing. Wikipedia's article puts the goal plainly: **the goal of an attack is not to kill, but to gain territory or influence.**

So the question before you attack is not "can I kill this?" but **"where do I want it to go?"** Push the weak group towards your thickness, and it either dies there or lives small while you take the other side. Push it towards your own weak stones and you have two fights instead of one. And do not touch it: **contact plays strengthen the underdog** — a stone attached to a weak stone gives it something to push against and makes it stronger.

```board
size: 9
black: C3 C4 C5 C6 C7 G3 G7
white: E5
labels: F5=a, D5=b
caption: Black's wall on the left is thick. White's stone at E5 is weak. Attack from a, the side away from the wall: White is pushed towards the wall and Black's stones on the right grow into territory as they attack. The contact play at b does the opposite — it pushes White out to the right, where your stones are thin.
```

## Problems

<p class="puzzle-intro">1 · The position above, Black to play. Attack the white stone from the side that pushes it towards your wall.</p>

```try
size: 9
black: C3 C4 C5 C6 C7 G3 G7
white: E5
solution: (F5) (F4) (F6)
hint: Which side is thick? Attack from the other one.
prompt: Attack — from the right side.
success: F5 (or F4, F6): a stone between White and the open right side. White must now make shape towards your wall, where there is no room, and every move you make chasing it is also a move on your right side. D5 would have been the wrong side — a contact play that pushes White out into the open and gives it a stone to lean on.
```

<p class="puzzle-intro">2 · White ran along the wall and you played hane on both sides. Now the group has two liberties. Black to play.</p>

```try
size: 9
black: C3 C4 C5 C6 C7 D4 D6 F5 G3 G7
white: E5 D5 H8
solution: (E6 (E4 F4) (F6 E4)) (E4 (E6 F6) (F4 E6))
expect: kill
target: E5
hint: An atari from either side — check that the extension runs into your stones.
prompt: You did not set out to kill it. Kill it anyway.
success: E6 or E4: atari, and whichever way White extends, the next atari finishes it against your wall and your stone at F5. This is what "attack to gain" looks like when it goes well: you took the right side, White ran into thickness, and the capture came by itself.
```

<p class="puzzle-intro">3 · Black to play. Two of your groups: the wall on the left is thick, the two stones on the right are not. Which way do you push White?</p>

```try
size: 9
black: C3 C4 C5 C6 C7 H4 H6
white: E4 E5
solution: (F5) (F4) (F6) (F3)
hint: You only have one weak group — do not send White towards it.
prompt: Attack from the correct side.
success: From the right, F5 or nearby: White is driven left towards the wall, and your two stones at H4–H6 gain a stone in front of them. Attacking from the left, D5 or D4, pushes White straight at H4–H6, and then it is your stones that are being attacked.
```

<p class="puzzle-intro">4 · Black to play. The white group in the top-right has two eyes. Where is the move?</p>

```try
size: 9
black: E7 E8 E9 F6 G6 H6 J6 C4
white: F7 G7 H7 J7 F8 H8 F9 G9 F3
solution: (E3) (E4) (F4) (D2) (E2)
hint: Nothing you play against the top-right changes it. Look at the white stone at F3 instead.
prompt: Do not attack a live group.
success: Anything sensible against the white stone at F3 — E3, E4, F4, D2 or E2. The group in the top-right has two eyes at G8 and J8–J9: moves against it are wasted stones. A weak stone is worth attacking; a live group is worth exactly nothing to attack.
```

```board
size: 9
black: E7 E8 E9 F6 G6 H6 J6
white: F7 G7 H7 J7 F8 H8 F9 G9
life: G7 alive
caption: The group from problem 4. Two eyes, G8 and the corner pair J8–J9. Alive whatever Black plays: the site's search confirms it.
```

## Remember

- Attack to gain territory or influence; a kill is a bonus that happens against thickness.
- Push weak groups towards your thick stones, away from your weak ones.
- Do not attach to a weak stone: contact plays strengthen the underdog.
- Never attack what is already alive.

+++ Read more: leaning, and why the direction is the whole decision
A weak group has to run somewhere, and the attacker chooses where by playing on the other side. This is why the first move of an attack is so often *not* next to the group: it is a stone placed on the escape route, one or two lines away, so that the group's every move towards it is a move into your strength. Professionals speak of *leaning* on a strong group to attack a weak one — playing against the strong group so that the resulting stones face the weak one — and of *splitting attacks* that keep two weak groups apart so neither can help the other. All of it comes back to the same decision: not whether to attack, but from which side, and the side is the one that sends the group where you want it to end up.
+++
