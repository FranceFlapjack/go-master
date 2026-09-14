---
id: opening/the-9x9-opening
track: The opening
title: Opening on the small board
lede: On 9×9 the corners are four moves from the centre and every stone is near every other. Corner-side-centre still holds, but the centre comes early, and the third line is already the edge of the fight.
level: 3
sources:
  - Wikipedia, "Go opening theory" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/Go_opening_theory — the principle that corners are more efficient for territory, and the note on the centre point
  - The advice here is the common teaching for the small board; it is not backed by an engine, and the accepted answers in the problems are conventions, not calculations. Where a problem asks for a capture or an escape it is checked by the site's capture search (`expect:`), as in the capturing track.
---

## Same rules, smaller distances

The 9×9 board has the same corners, but a 3-3 point is two lines from the centre point's neighbours. Territory is made in the corners as always; the difference is that there is no room for the sides-and-frameworks stage. After two or three moves each, the game is a fight, and life and death decides it. Three habits serve well:

- **Start near the middle** — the centre point (E5) or one of the 4-4 / 5-4 points around it. A first move on the 3-3 point takes a corner at once but hands the rest of the board over.
- **Answer contact plays.** When the opponent attaches to your stone, the hane or the extension is nearly always right; ignoring an attachment loses the stone.
- **Count liberties before every move.** Ladders, nets and shortages of liberties happen by move ten on 9×9.

```board
size: 9
black: E5
white: C3
highlight: G7 C7 G3
caption: Black's first move at the centre point; White takes a corner at the 3-3 point. Black's next move will usually be a point like one of the marked ones — high, towards another corner — rather than answering at C3.
```

## Problems

<p class="puzzle-intro">1 · Black to play, the first move of the game. Play near the middle.</p>

```try
size: 9
solution: (E5) (D5) (F5) (E4) (E6) (D4) (F4) (D6) (F6)
hint: Any point on or next to the centre.
prompt: Play the first move.
success: The centre point, or any point of the 3×3 block around it. From here a stone looks at every corner. The 3-3 points are not wrong, only small.
```

<p class="puzzle-intro">2 · White has attached to your centre stone. Black to play: answer the attachment.</p>

```try
size: 9
black: E5
white: E4
solution: (D4) (F4) (D5) (F5) (E6)
hint: Hane round the stone, or extend.
prompt: Answer the attachment.
success: A hane at D4 or F4 presses on the white stone; an extension to D5, F5 or E6 keeps your stone solid. All are standard; leaving the stone alone is the only mistake.
```

<p class="puzzle-intro">3 · Black to play. White has cut, and your centre stone is in atari. Save it — count first.</p>

```try
size: 9
black: E5 C6 D4
white: E4 D5 F5
solution: E6
expect: escape
target: E5
unique: true
hint: One liberty left. Extend, and count what the chain has then.
prompt: Save the black stone at E5.
success: E6. The chain E5–E6 has three liberties, D6, F6 and E7, and White cannot keep it in atari. Any other move and White plays E6 and takes the stone.
```

<p class="puzzle-intro">4 · Black to play. The white stone in the centre has two liberties, and one ladder works. Which?</p>

```try
size: 9
black: D5 E6 F4
white: E5 G8
solution: F5 (E4 E3 (D4 C4 (D3 D2 (C3 B3 (C2 B2 (C1 B1 (D1 E1)))))))
expect: kill
target: E5
refute: E4
hint: Read both ladders to the edge. One of them runs into G8.
prompt: Capture the white stone.
success: F5. The ladder runs down to the bottom edge and the stone is taken at E1. The other atari, E4, would send White up and to the right — straight into the stone at G8. On 9×9 a ladder reaches the edge in a few moves, so read it every time.
```

## Remember

- 9×9: start near the middle, take the corners with 4-4 or 3-4 points second, answer attachments.
- The fight begins by move five. Count liberties before every move.
- Life and death decides small-board games; the eye-shape lessons apply from the first corner.

+++ Read more: how the computer opponent opens
In the runs we have watched, the Play page's computer opens on the centre point or one line from it: its random playouts win more often from the middle of the small board. That is not authority — it is a weak program with no knowledge of Go — but it is a fair illustration of the first principle above: on 9×9, the centre is a real place, not a last resort.
+++
