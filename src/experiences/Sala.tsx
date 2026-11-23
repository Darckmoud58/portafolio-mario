import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useState, type MutableRefObject } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import { projects } from '../data/projects'
import { Back } from './Back'

const cards = projects.filter((p) => p.featured && p.id !== 'sala').slice(0, 9)

function textureFor(title: string, subtitle: string, accent: string) {
  const c = document.createElement('canvas')
  c.width = 640
  c.height = 400
  const g = c.getContext('2d')
  if (!g) return new THREE.CanvasTexture(c)
  g.fillStyle = '#10151f'
  g.fillRect(0, 0, 640, 400)
  g.fillStyle = accent
  g.fillRect(0, 0, 640, 8)
  g.fillStyle = '#f4f1ea'
  g.font = '700 64px Syne, sans-serif'
  g.fillText(title, 40, 190)
  g.fillStyle = 'rgba(244,241,234,0.72)'
  g.font = '28px Manrope, sans-serif'
  g.fillText(subtitle.slice(0, 36), 40, 250)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function Look({
  pointer,
  active,
  onPick,
}: {
  pointer: MutableRefObject<{ x: number; y: number }>
  active: number
  onPick: (i: number) => void
}) {
  const { camera } = useThree()
  const spin = useRef<Group>(null)
  const meshes = useRef<(Mesh | null)[]>([])
  const tex = useMemo(() => cards.map((p) => textureFor(p.title, p.subtitle, p.accent)), [])

  useFrame(() => {
    camera.position.x += (pointer.current.x * 1.5 - camera.position.x) * 0.045
    camera.position.y += (0.35 - pointer.current.y * 0.5 - camera.position.y) * 0.045
    camera.lookAt(0, 0.1, -1.4)
    if (spin.current) spin.current.rotation.y += 0.0012
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return
      const s = i === active ? 1.14 : 1
      mesh.scale.x += (s - mesh.scale.x) * 0.12
      mesh.scale.y += (s - mesh.scale.y) * 0.12
    })
  })

  return (
    <group ref={spin}>
      {cards.map((p, i) => {
        const a = (i / cards.length) * Math.PI * 1.7 - Math.PI * 0.85
        const y = ((i % 3) - 1) * 0.7
        return (
          <mesh
            key={p.id}
            ref={(n) => {
              meshes.current[i] = n
              n?.lookAt(0, y, 0)
            }}
            position={[Math.sin(a) * 4.3, y, -Math.cos(a) * 3.4]}
            onClick={(e) => {
              e.stopPropagation()
              onPick(i)
            }}
          >
            <planeGeometry args={[1.8, 1.12]} />
            <meshBasicMaterial map={tex[i]} toneMapped={false} />
          </mesh>
        )
      })}
    </group>
  )
}

function Stars() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const pts = new Float32Array(500 * 3)
    for (let i = 0; i < 500; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 16
      pts[i * 3 + 1] = Math.random() * 5 + 0.4
      pts[i * 3 + 2] = -Math.random() * 9
    }
    g.setAttribute('position', new THREE.BufferAttribute(pts, 3))
    return g
  }, [])
  return (
    <points geometry={geo}>
      <pointsMaterial color="#d7e4ff" size={0.03} />
    </points>
  )
}

export function Sala() {
  const pointer = useRef({ x: 0, y: 0 })
  const [active, setActive] = useState(0)
  const chosen = cards[active]

  return (
    <div
      className="piece"
      onPointerMove={(e) => {
        pointer.current.x = e.clientX / window.innerWidth - 0.5
        pointer.current.y = e.clientY / window.innerHeight - 0.5
      }}
    >
      <Canvas camera={{ position: [0, 0.4, 1.1], fov: 50 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#070b14']} />
        <fog attach="fog" args={['#070b14', 7, 15]} />
        <Look pointer={pointer} active={active} onPick={setActive} />
        <mesh position={[0, -1.8, -2]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[8, 48]} />
          <meshBasicMaterial color="#14306e" />
        </mesh>
        <mesh position={[0, 0.15, -3.4]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshBasicMaterial color="#4d8cff" />
        </mesh>
        <Stars />
      </Canvas>
      <div className="piece-ui">
        <Back />
        <div>
          <p className="eyebrow">Sala</p>
          <h1 className="exp-title">{chosen?.title}</h1>
          <p className="exp-hint">Mueve el cursor para mirar. Pulsa un panel.</p>
        </div>
      </div>
    </div>
  )
}
