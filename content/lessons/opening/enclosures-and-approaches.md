---
id: opening/enclosures-and-approaches
track: The opening
title: Enclosures and approaches
lede: A 3-4 stone is half a corner. The second stone that finishes it is an enclosure; the opponent's stone on the same point is an approach. The two are the same idea from opposite sides, and the whole early opening is a race for them.
level: 3
sources:
  - Arthur Smith, The Game of Go (1908), chapter IV — "shimari", "a strong formation protecting the corner", the "kogeima" and "ogeima" (small and large knight's move) relations, and "kakari" — public domain, https://www.gutenberg.org/ebooks/66632
  - Wikipedia, "List of Go terms" (CC BY-SA 4.0), https://en.wikipedia.org/wiki/List_of_Go_terms — kakari at the 5-3 (low) and 5-4 (high) points
  - Game records — Gennan Inseki (W) v Shusaku (B), 1846, and AlphaGo (B) v Lee Sedol (W), 2016, game 2; see the `SO[]` line of each file. Both games are used here for their enclosures and approaches, which are facts of the record; the comments are ours.
  - The problems in this track are judgement, not calculation; the accepted answers are the standard points named in the sources, or the move played in the model game. Nothing here was checked by an engine.
---

## The enclosure (shimari)

A stone on the 3-4 point is low on one side and open on the other. One more stone on the open side, a knight's move away, closes the corner: the **small knight's enclosure**. One line further is the **large knight's enclosure** — a little bigger, a little thinner; a one-point jump is the tightest. After an enclosure the corner is close to territory, and the enclosure also faces along the side, where an extension from it is worth a lot.

```board
size: 13
white: K11 L9
black: D3 D5
labels: L8=a, K9=b
caption: Two enclosures. Top-right: White's 3-4 stone at K11 is three lines from the top and four from the right, so its open side runs down the right edge; L9 is the small knight's enclosure, a the large knight's, b the one-point. Bottom-left: Black's 3-4 stone at D3 is open up the left edge, and D5 is the one-point enclosure (the shape of Shusaku's E4 from C4 in 1846).
```

## The approach (kakari)

If the opponent gets to the open side first, it is an **approach**: a stone on the 5-3 point relative to the corner (the *low* approach) or the 5-4 point (the *high* approach). It stops the enclosure, contests the corner, and starts a local sequence — a joseki. The corner stone usually answers; leaving an approach unanswered twice usually loses the corner.

```sgf
file: gennan-shusaku-1846.sgf
start: 8
```

Follow the first eight moves: White 4 (P17) approaches R16; White 6 (C14) is a large knight's enclosure of D17; Black 7 (E4) is a one-point enclosure of C4; White 8 (R5) approaches Q3. Two enclosures and two approaches in eight moves — and both approaches were played rather than take a fifth "corner" that did not exist.

```sgf
file: alphago-lee-sedol-2016-g2.sgf
start: 10
```

In 2016: Black 5 (P4) approaches R4 and White attaches underneath at once; Black 9 (C6) approaches the 4-4 stone at D4, and White 10 (F3) answers with a knight's move on the other side. An approach to a 4-4 stone is played a line further out than to a 3-4 stone, because the 4-4 stone is higher.

## Which side to approach from

A 3-4 stone has one open side, so the approach goes there. A 4-4 stone is symmetrical, and the approach usually comes from the side where the approaching stone will also be doing something else — extending from a friendly stone, or reducing the side the opponent wants. In the 2016 game Black's C6 approaches D4 from the side of Black's own C16, so that the two stones begin to work together down the left edge.

## Problems

<p class="puzzle-intro">1 · From the 1846 game after move 5. White to play: enclose the top-left corner as Gennan did, or with either other standard enclosure.</p>

```try
size: 19
turn: w
white: D17 P17
black: R16 C4 Q3
solution: (C14) (C15) (D15)
hint: The 3-4 stone at D17 is low on the top side; the open side runs down the left edge.
prompt: Enclose the corner.
success: C14, the large knight's enclosure, was the game move; C15 (small knight) and D15 (one-point) are the other two. Each makes the top-left corner White's.
```

<p class="puzzle-intro">2 · Same game, after move 6. Black to play: enclose the bottom-left corner.</p>

```try
size: 19
black: R16 C4 Q3
white: D17 P17 C14
solution: (E4) (E3) (F3)
hint: C4 is low on the left; the open side runs along the bottom.
prompt: Enclose the corner.
success: E4, the one-point enclosure, was Shusaku's choice; E3 and F3 are the two knight's-move enclosures. Note that it faces White's enclosure above: the left side between them is now the biggest side, and neither player rushed there yet.
```

<p class="puzzle-intro">3 · Same game, after move 7. White to play: approach Black's corner stone at Q3.</p>

```try
size: 19
turn: w
white: D17 P17 C14
black: R16 C4 E4 Q3
solution: (R5) (Q5)
hint: Q3 is low on the bottom; its open side runs up the right edge. Low approach at 5-3, high at 5-4.
prompt: Approach the corner.
success: R5, the low approach, was the game move; Q5 is the high approach. Either one prevents the enclosure and asks Black a question in the corner.
```

<p class="puzzle-intro">4 · From the 2016 game after move 8. Black to play: approach White's 4-4 stone at D4, from the side where it works with your stone at C16.</p>

```try
size: 19
black: C16 Q16 P4 O3
white: D4 R4 P3 Q3
solution: (C6) (D6)
hint: Approach from above, so that the stone also looks up the left side towards C16.
prompt: Approach the 4-4 stone.
success: C6 was the game move (D6, the high approach, is the other). Approaching from the bottom side at F3 would also be an approach, but it would face White's R4 corner instead of your own C16.
```

## Remember

- Enclosure: a second stone on the open side of a 3-4 point — small knight, large knight or one-point. The corner is then nearly yours.
- Approach: the opponent's stone on that same side, low (5-3) or high (5-4). It must usually be answered.
- Approach a 4-4 stone from the side where your stone also works with something of yours.

+++ Read more: what an enclosure is worth
An enclosed corner is worth roughly the territory inside it plus the extension it makes possible along the side; that is why the enclosure is played early even though it takes two moves. An approach that is not answered lets the approacher play a second move in the corner — the *double approach* — after which the corner stone is under real pressure. So the reply to an approach is nearly always worth the move, and the classic opening rhythm goes: take corners; enclose or approach; answer approaches; then extend along the sides. The 1846 game is a textbook example of the rhythm, which is one reason it is still studied.
+++
