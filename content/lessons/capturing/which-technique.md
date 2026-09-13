---
id: capturing/which-technique
track: Capturing techniques
title: Which technique? A problem set
lede: Six positions, no labels. Ladder, net, snapback, shortage of liberties, a race, an escape — the first job in every one is to see which it is.
level: 1
sources:
  - Positions composed for this course, turned and mirrored from the earlier lessons so that the shapes must be read rather than recognised. Ladders, nets and escapes are checked by the site's capture search; the rest by the rules engine and by hand.
---

## Before you click

For each problem, count the liberties of the chain you want to capture (or save), look for a stone of the running colour on any ladder path, and check whether the point you want to play would leave your own stone with one liberty. Then decide the technique, and only then the move.

<p class="puzzle-intro">1 · Capture the white stone.</p>

```try
size: 9
black: F5 E4 D4 F6
white: E5 C8 H2
solution: D6 (D5 C5 (E6 E7)) (E6 E7 (D5 C5))
expect: kill
target: E5
refute: D5 E6
hint: Both ladders run into a white stone. Which technique needs no ladder?
prompt: Capture the white stone.
success: The net at D6. The ataris at D5 and E6 both start ladders that break on the white stones at C8 and H2.
```

<p class="puzzle-intro">2 · Capture the white stone.</p>

```try
size: 9
black: F5 E4 D6
white: E5 B2
solution: D5 (E6 E7 (F6 G6 (F7 F8 (G7 H7 (G8 H8 (G9 F9 (H9 J9)))))))
expect: kill
target: E5
refute: E6
hint: One ladder path passes the white stone at B2; the other reaches the top edge.
prompt: Capture the white stone.
success: D5 starts the ladder that runs up and to the right and ends at J9. The other atari would have run into B2.
```

<p class="puzzle-intro">3 · Capture the white chain on the first line.</p>

```try
size: 9
black: G2 F3 E3 D3 C2 C1
white: G1 F2 E2 D2 D1
solution: F1 (E1 F1)
expect: capture
hint: Two liberties, side by side. One of them touches a white stone that is not part of the chain.
prompt: Capture the four white stones.
success: Snapback: F1, White captures at E1, F1 again takes five stones.
```

<p class="puzzle-intro">4 · Capture a white stone.</p>

```try
size: 9
black: F5 E6 F3 E2
white: E5 E3
solution: E4 (D5 D3) (D3 D5)
expect: capture
hint: Two stones, one point next to both.
prompt: Capture a white stone.
success: E4 is a double atari. White saves one stone; Black takes the other.
```

<p class="puzzle-intro">5 · Capture the three white stones on the first line — without losing your own.</p>

```try
size: 9
black: J2 H2 H1 G2 F2 E2 D2 D3 B1 B2 B3
white: J3 H3 G3 F3 E3 D4 C2 C3 C4 B4 A4 F1 E1 D1
solution: C1 (pass G1)
expect: kill
target: F1
refute: G1
safe: J2
hint: Count your own liberties before you atari.
prompt: Capture the white stones.
success: C1, the liberty that is White's alone. Playing the shared point G1 first would have been self-atari.
```

<p class="puzzle-intro">6 · Your stone is in atari. Save it.</p>

```try
size: 9
black: E5 A7
white: F5 E6 D4 E4
solution: D5
expect: escape
target: E5
unique: true
hint: You have a stone on the ladder's path.
prompt: Save the black stone.
success: D5. The ladder runs up and to the left, and the chain connects to A7 before it reaches the edge.
```

## Remember

- Two liberties and a diagonal stone: think ladder, then read the path.
- Ladder broken: think net.
- Two adjacent liberties, one hemmed in: think snapback.
- Two enemy stones with a common empty neighbour: think double atari.
- Before any atari: count your own liberties.
