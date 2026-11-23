import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Shell } from './Shell'

type Ripple = { x: number; y: number; t: number }

function Sea({ onDrop }: { onDrop: () => void }) {
  const geom = useRef<THREE.PlaneGeometry>(null)
  const base = useRef<Float32Array | null>(null)
  const ripples = useRef<Ripple[]>([])
  const last = useRef(0)

  const drop = (uv: THREE.Vector2, time: number, force = false) => {
    const now = performance.now()
    if (!force && now - last.current < 80) return
    last.current = now
    ripples.current.push({
      x: (uv.x - 0.5) * 8.5,
      y: (uv.y - 0.5) * 8.5,
      t: time,
    })
    if (ripples.current.length > 8) ripples.current.shift()
    if (force) onDrop()
  }

  useFrame(() => {
    const g = geom.current
    if (!g) return
    const pos = g.attributes.position as THREE.BufferAttribute
    if (!base.current) base.current = new Float32Array(pos.array)
    const src = base.current
    const time = (performance.now() - started.current) / 1000
    for (let i = 0; i < pos.count; i++) {
      const x = src[i * 3]
      const y = src[i * 3 + 1]
      let h =
        Math.sin(x * 0.85 + time * 0.55) * Math.sin(y * 0.7 - time * 0.4) * 0.22
      for (const r of ripples.current) {
        const age = time - r.t
        if (age < 0 || age > 8) continue
        const d = Math.hypot(x - r.x, y - r.y)
        const ring = Math.sin(d * 2.8 - age * 2.2)
        const crest = Math.exp(-d * 0.55) * Math.exp(-age * 0.35)
        h += ring * crest * 0.95
      }
      pos.setZ(i, src[i * 3 + 2] + h)
    }
    pos.needsUpdate = true
  })

  const started = useRef(performance.now())
  const now = () => (performance.now() - started.current) / 1000

  return (
    <mesh
      rotation-x={-Math.PI / 2}
      onPointerMove={(e) => {
        if (!e.uv) return
        drop(e.uv, now())
      }}
      onClick={(e) => {
        e.stopPropagation()
        if (!e.uv) return
        drop(e.uv, now(), true)
      }}
    >
      <planeGeometry ref={geom} args={[8.5, 8.5, 72, 72]} />
      <meshBasicMaterial color="#d4ff4f" wireframe toneMapped={false} />
    </mesh>
  )
}

export function Marea() {
  const [waves, setWaves] = useState(0)
  return (
    <Shell
      eyebrow="Experiencia 03"
      title="Marea"
      hint={
        waves
          ? `${waves} ola${waves === 1 ? '' : 's'} en la superficie.`
          : 'Desliza sobre la superficie. Cada paso deja una ola.'
      }
    >
      <Canvas camera={{ position: [0.4, 4.2, 6.8], fov: 40 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#050605']} />
        <Sea onDrop={() => setWaves((n) => n + 1)} />
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.15} minDistance={3} maxDistance={9} />
      </Canvas>
    </Shell>
  )
}
