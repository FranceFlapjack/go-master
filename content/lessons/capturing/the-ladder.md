---
id: capturing/the-ladder
track: Capturing techniques
title: The ladder
lede: Atari, extend, atari, extend, in a zigzag to the edge, where the running stones die. Unless a friendly stone waits on the path. Read it to the end before you play the first atari.
level: 1
sources:
  - Arthur Smith, The Game of Go (1908), chapter III, on "shicho" (the ladder) — public domain, https://www.gutenberg.org/ebooks/66632
  - Wikipedia, "Ladder (Go)" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Ladder_(Go)
  - Positions composed for this lesson; every ladder here is read to the end by the site's capture search (scripts/check-content.mjs, `expect: kill` / `expect: escape`).
---

## The shape

A white stone with two liberties, and a black stone on the diagonal. Black plays atari; White extends to the only liberty; the new chain has two liberties again, and again Black can atari so that the extension has only two. The chain runs diagonally across the board until it hits the edge, where the last extension has one liberty and the whole chain is captured.

```board
size: 9
black: D5 E6 F4
white: E5
highlight: F5 E4
caption: Two ataris are possible, F5 and E4. Each starts a ladder in a different direction.
```

Play through one of them:

```sgf
(;GM[1]FF[4]SZ[9]AB[de][ed][ff]AW[ee]PL[B]C[Black to play. The ladder starts with F5.];B[fe]C[Atari. White's only liberty is E4.];W[ef]C[White extends; the chain has two liberties, D4 and E3.];B[eg]C[Atari again, from below: now D4 is the only liberty. The stone at F4 is what makes this work: without it, White's extension to E4 would have had three liberties.];W[df];B[cf];W[dg];B[dh];W[cg];B[bg];W[ch];B[bh];W[ci];B[bi]C[The chain has reached the edge. White's only liberty is D1.];W[di]C[The last extension. E1 is the only liberty.];B[ei]C[Fifteen stones captured. Every move of the ladder was forced.])
```

## The rule of the ladder

**If the ladder works, the running stones are dead where they stand;** there is no need to play it out, and playing it out only fills your own territory. **If it does not work, do not start it:** every atari you play is a stone the opponent runs through, and when the chain breaks out, all those stones are cutting points and weaknesses.

A ladder fails when the path runs into a stone of the running colour, a **ladder breaker**: the chain connects to it, or captures one of the chasing stones, and has three liberties. Before every ladder, follow the diagonal with your eye to the edge and check both sides of it.

```board
size: 9
black: D5 E6 F4
white: E5 H8
highlight: F5
caption: With a white stone at H8, the ladder that starts with E4 (running up and right) fails: the chain reaches H7, connects, and escapes. The ladder that starts with F5 (down and left) still works. Read both before choosing.
```

## Problems

<p class="puzzle-intro">1 · One atari starts a working ladder, the other runs into the stone at H8. Choose, then play the ladder to the end.</p>

```try
size: 9
black: D5 E6 F4
white: E5 H8
solution: F5 (E4 E3 (D4 C4 (D3 D2 (C3 B3 (C2 B2 (C1 B1 (D1 E1)))))))
expect: kill
target: E5
refute: E4
hint: Follow each diagonal to the edge. One of them passes H7.
prompt: Capture the white stone in a ladder.
success: F5, and the ladder runs to the bottom edge with a capture at E1. The other ladder would have reached H7 next to the white stone at H8, connected, and escaped with three liberties.
```

<p class="puzzle-intro">2 · Now the breaker is at B2. Read again.</p>

```try
size: 9
black: D5 E6 F4
white: E5 B2
solution: E4 (F5 G5 (F6 F7 (G6 H6 (G7 G8 (H7 J7 (H8 J8 (H9 G9 (pass J9))))))))
expect: kill
target: E5
refute: F5
hint: The ladder that goes down and left passes B2. The other one goes up and right.
prompt: Capture the white stone in a ladder.
success: E4 starts the ladder that runs up and to the right, to the top edge, where the chain is captured at J9. The white stone at B2 would have broken the other one at C2.
```

<p class="puzzle-intro">3 · The full board is longer. White has a stone at L11. Which atari works?</p>

```try
size: 13
black: D5 E6 F4
white: E5 L11
solution: F5 (E4 E3 (D4 C4 (D3 D2 (C3 B3 (C2 B2 (C1 B1 (D1 E1)))))))
expect: kill
target: E5
refute: E4
hint: The ladder going up and right would pass through L11 on its way to the edge.
prompt: Capture the white stone in a ladder.
success: F5. The ladder down and left ends at the bottom edge; the one up and right would have hit L11. On 19×19 a ladder can cross the whole board, and the breaker can be a stone played thirty moves earlier — which is why strong players place a stone on a ladder's path as a threat.
```

<p class="puzzle-intro">4 · Your stone is in atari, in a ladder — but you have a stone on the path. Run.</p>

```try
size: 9
black: E5 J7
white: D5 E6 F4 E4
solution: F5
expect: escape
target: E5
unique: true
hint: The ladder runs up and to the right, towards J7.
prompt: Save the black stone.
success: F5. White can atari at G5 and F6 in turn, but the chain reaches H7 and connects to J7 with liberties to spare. A ladder breaker is worth checking for before you give a stone up.
```

## Remember

- Ladder: atari, extend, atari, extend, on a diagonal to the edge. The stone on the diagonal is what makes each extension have two liberties.
- Read the whole path before the first atari. A stone of the running colour on the path breaks the ladder.
- A working ladder need not be played out; a broken one must not be started.

+++ Read more: the ladder in the whole game
Because a ladder crosses the board, anything on its path matters, and a move that would break a ladder is a threat even when it looks like an ordinary move elsewhere. Professionals play such moves deliberately: a stone that extends along the side *and* breaks a ladder forces the opponent to capture the laddered stone at once (one more move spent) or lose it. The reverse also holds: if you have laddered a stone and left it on the board, your opponent may look for a breaker, and you must answer every one.

On the 9×9 board ladders are short and easy to read. Practise there until you can follow the zigzag without moving your eyes stone by stone; on 19×19 you will need to see the whole diagonal at once.
+++
