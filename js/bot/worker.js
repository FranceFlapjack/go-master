// Web Worker for the computer opponent: keeps the search off the page's thread so the board stays responsive.
// Message in: {id, pos, opts} (see think() in mcts.js). Message out: {id, move, winrate, playouts, ms, ownership}.
import { think } from './mcts.js'

self.onmessage = e => {
  const { id, pos, opts } = e.data
  const r = think(pos, opts)
  self.postMessage({ id, move: r.move, winrate: r.winrate, playouts: r.playouts, ms: r.ms, ownership: r.ownership }, [r.ownership.buffer])
}
