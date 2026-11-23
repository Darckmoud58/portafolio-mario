import { useEffect, useRef } from 'react'
import { Back } from './Back'

type Speck = { a: number; b: number; gem: boolean; rad: number }

export function Anillo() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const tilt = useRef(1.05)
  const drag = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const specks: Speck[] = []
    for (let i = 0; i < 2200; i++) {
      specks.push({
        a: Math.random() * Math.PI * 2,
        b: Math.random() * Math.PI * 2,
        gem: false,
        rad: 0.22 + Math.random() * 0.08,
      })
    }
    for (let i = 0; i < 700; i++) {
      specks.push({
        a: (Math.random() - 0.5) * 0.55,
        b: (Math.random() - 0.5) * 0.7,
        gem: true,
        rad: 0.16 + Math.random() * 0.2,
      })
    }
    let rot = 0
    let raf = 0
    const tick = () => {
      const c = canvas.current
      if (!c) {
        raf = requestAnimationFrame(tick)
        return
      }
      const ctx = c.getContext('2d')
      if (!ctx) return
      rot += drag.current ? 0.004 : 0.012
      const w = c.width
      const h = c.height
      ctx.fillStyle = '#070707'
      ctx.fillRect(0, 0, w, h)
      const cx = w * 0.5
      const cy = h * 0.46
      const scale = Math.min(w, h) * 0.28
      const R = 1.15
      const pts: { x: number; y: number; z: number; gem: boolean }[] = []
      for (const s of specks) {
        let x: number
        let y: number
        let z: number
        if (s.gem) {
          const u = s.a / 0.275
          const v = s.b / 0.35
          if (Math.abs(u) + Math.abs(v) > 1) continue
          x = u * 0.32
          y = 1.32 + v * 0.38
          z = 0.08
        } else {
          const ang = s.a + rot
          x = (R + s.rad * Math.cos(s.b)) * Math.cos(ang)
          y = s.rad * Math.sin(s.b)
          z = (R + s.rad * Math.cos(s.b)) * Math.sin(ang)
        }
        const cy0 = Math.cos(tilt.current)
        const sy = Math.sin(tilt.current)
        const y2 = y * cy0 - z * sy
        const z2 = y * sy + z * cy0
        pts.push({ x, y: y2, z: z2, gem: s.gem })
      }
      pts.sort((p, q) => p.z - q.z)
      for (const p of pts) {
        const px = cx + p.x * scale
        const py = cy - p.y * scale
        const shade = 0.35 + ((p.z + 1.6) / 3.2) * 0.65
        ctx.fillStyle = p.gem ? `rgba(230,245,255,${shade})` : `rgba(236,238,242,${shade})`
        ctx.fillRect(px, py, p.gem ? 2.2 : 1.6, p.gem ? 2.2 : 1.6)
      }
      if (Math.random() < 0.4) {
        ctx.fillStyle = '#fff'
        ctx.fillRect(cx + (Math.random() - 0.5) * w * 0.5, cy + (Math.random() - 0.5) * h * 0.4, 2, 2)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className="piece piece-ink"
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, y: e.clientY }
      }}
      onPointerUp={() => {
        drag.current = null
      }}
      onPointerMove={(e) => {
        if (!drag.current) return
        tilt.current += (e.clientY - drag.current.y) * 0.005
        drag.current = { x: e.clientX, y: e.clientY }
      }}
    >
      <canvas ref={canvas} className="piece-canvas" width={900} height={640} />
      <div className="piece-ui">
        <Back />
        <div>
          <p className="eyebrow">Anillo</p>
          <h1 className="exp-title">Gira</h1>
          <p className="exp-hint">Arrastra para inclinarlo. Solo se ve hecho de puntos.</p>
        </div>
      </div>
    </div>
  )
}
