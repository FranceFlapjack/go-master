// The page's handle on the computer opponent. One worker, one request at a time; a request made while an
// older one is still running makes the older answer arrive as a rejection, so a stale move can never land
// on a board that has changed under it (new game, undo, size change).
export const LEVELS = [
  { id: 'quick', label: 'Quick', timeMs: 500 },
  { id: 'normal', label: 'Normal', timeMs: 1500 },
  { id: 'strong', label: 'Strong', timeMs: 4000 },
]

export class Bot {
  constructor() {
    this.worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })
    this.pending = null
    this.worker.onmessage = e => {
      const p = this.pending
      if (!p || e.data.id !== p.id) return
      this.pending = null
      p.resolve(e.data)
    }
    this.worker.onerror = e => { const p = this.pending; this.pending = null; if (p) p.reject(e.error || new Error(e.message || 'bot worker error')) }
    this.nextId = 1
  }
  /** pos = {size, board, turn, ko, komi, passes}; resolves {move (index or null), winrate, playouts, ms, ownership} */
  think(pos, { timeMs = 1500 } = {}) {
    this.cancel()
    const id = this.nextId++
    return new Promise((resolve, reject) => {
      this.pending = { id, resolve, reject }
      this.worker.postMessage({ id, pos: { size: pos.size, board: pos.board, turn: pos.turn, ko: pos.ko, komi: pos.komi, passes: pos.passes }, opts: { timeMs } })
    })
  }
  /** forget the running request: its answer will be ignored when it arrives */
  cancel() { const p = this.pending; this.pending = null; if (p) p.reject(new Error('cancelled')) }
  destroy() { this.cancel(); this.worker.terminate() }
}
