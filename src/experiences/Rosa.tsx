import { useEffect, useRef, useState } from 'react'
import { Back } from './Back'

const COLS = 72
const ROWS = 46

function field(x: number, y: number) {
  const px = (x / (COLS - 1)) * 2 - 1
  const py = 1 - (y / (ROWS - 1)) * 2
  const dx = px * 0.95
  const dy = py - 0.32
  const ang = Math.atan2(dy, dx)
  const rad = Math.hypot(dx, dy)
  const head = Math.exp(-(dx * dx + dy * dy) / 0.045)
  const petal = 0.3 + 0.08 * Math.cos(6 * ang)
  const rim = Math.exp(-((rad - petal) ** 2) / 0.0028)
  const bloom = Math.max(head, rim * 0.95) * (dy > -0.2 ? 1 : 0)
  const stem = Math.exp(-(px * px) / 0.0016) * (py < 0.22 && py > -0.92 ? 1 : 0)
  const leafL = Math.exp(-(((px + 0.16) ** 2) / 0.01 + ((py + 0.15) ** 2) / 0.02))
  const leafR = Math.exp(-(((px - 0.18) ** 2) / 0.012 + ((py + 0.02) ** 2) / 0.018))
  return { bloom, stem: Math.max(stem, leafL * 0.85, leafR * 0.85) }
}

export function Rosa() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [bloom, setBloom] = useState(0)
  const grown = useRef(0)
  const start = useRef(performance.now())

  useEffect(() => {
    let raf = 0
    let last = 0
    const tick = (now: number) => {
      grown.current = Math.min(1, (now - start.current) / 2800)
      if (now - last > 200) {
        last = now
        setBloom(grown.current)
      }
      const c = canvas.current
      if (!c) {
        raf = requestAnimationFrame(tick)
        return
      }
      const ctx = c.getContext('2d')
      if (!ctx) return
      const w = c.width
      const h = c.height
      ctx.fillStyle = '#070707'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${Math.floor(h / ROWS)}px ui-monospace, monospace`
      ctx.textBaseline = 'top'
      const cw = w / COLS
      const ch = h / ROWS
      const tilt = pointer.current.x * 4
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const cell = field(x + tilt, y + pointer.current.y * 2)
          const order = ((x * 13 + y * 7) % 100) / 100
          if (order > grown.current) continue
          const v = Math.max(cell.bloom, cell.stem)
          if (v < 0.18) {
            if ((x * 17 + y * 9) % 47 === 0 && grown.current > 0.7) {
              ctx.fillStyle = 'rgba(255,255,255,0.55)'
              ctx.fillText('+', x * cw, y * ch)
            }
            continue
          }
          const chs = cell.bloom > cell.stem ? (cell.bloom > 0.65 ? '@' : '*') : '|'
          ctx.fillStyle = cell.bloom > cell.stem ? '#ff3b55' : '#3ddc6a'
          ctx.globalAlpha = Math.min(1, v)
          ctx.fillText(chs, x * cw, y * ch)
          ctx.globalAlpha = 1
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className="piece piece-ink"
      onPointerMove={(e) => {
        pointer.current.x = e.clientX / window.innerWidth - 0.5
        pointer.current.y = e.clientY / window.innerHeight - 0.5
      }}
      onClick={() => {
        start.current = performance.now()
      }}
    >
      <canvas ref={canvas} className="piece-canvas" width={900} height={640} />
      <div className="piece-ui">
        <Back />
        <div>
          <p className="eyebrow">Rosa</p>
          <h1 className="exp-title">Florece</h1>
          <p className="exp-hint">
            {bloom > 0.98 ? 'Un clic y vuelve a abrirse.' : 'Los caracteres van armando la flor.'}
          </p>
        </div>
      </div>
    </div>
  )
}
