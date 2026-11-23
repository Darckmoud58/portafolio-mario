import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import type { Mesh } from 'three'
import * as THREE from 'three'
import { Shell } from './Shell'

const N = 4

function Block({
  position,
  marked,
  onToggle,
}: {
  position: THREE.Vector3
  marked: boolean
  onToggle: () => void
}) {
  const ref = useRef<Mesh>(null)
  const edge = position.length() > 1.5

  useFrame((state) => {
    const mesh = ref.current
    if (!mesh) return
    const open = 1 + Math.abs(state.pointer.x) * 1.2 + Math.abs(state.pointer.y) * 0.35
    mesh.position.copy(position).multiplyScalar(open)
    mesh.rotation.y = state.clock.elapsedTime * 0.12
  })

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
    >
      <boxGeometry args={[0.56, 0.56, 0.56]} />
      <meshBasicMaterial
        color={marked ? '#d4ff4f' : edge ? '#e7e2d4' : '#9a958a'}
        toneMapped={false}
      />
    </mesh>
  )
}

function Lattice({
  marks,
  onToggle,
}: {
  marks: Set<number>
  onToggle: (id: number) => void
}) {
  const cells = useMemo(() => {
    const list: THREE.Vector3[] = []
    const gap = 0.78
    const origin = (N - 1) / 2
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        for (let z = 0; z < N; z++) {
          list.push(new THREE.Vector3((x - origin) * gap, (y - origin) * gap, (z - origin) * gap))
        }
      }
    }
    return list
  }, [])

  return (
    <group>
      {cells.map((position, id) => (
        <Block
          key={id}
          position={position}
          marked={marks.has(id)}
          onToggle={() => onToggle(id)}
        />
      ))}
    </group>
  )
}

export function Cubit() {
  const [marks, setMarks] = useState<Set<number>>(() => new Set())
  const count = marks.size

  const toggle = (id: number) => {
    setMarks((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <Shell
      eyebrow="Experiencia 02"
      title="Cubit"
      hint={
        count
          ? `${count} bloque${count === 1 ? '' : 's'} marcado${count === 1 ? '' : 's'}. El cursor abre la retícula.`
          : 'Mueve el cursor para abrirla. Un clic marca un bloque.'
      }
    >
      <Canvas camera={{ position: [4.4, 3.1, 4.6], fov: 40 }} dpr={[1, 1.75]}>
        <color attach="background" args={['#10110e']} />
        <Lattice marks={marks} onToggle={toggle} />
        <OrbitControls enablePan={false} minDistance={4} maxDistance={11} autoRotate autoRotateSpeed={0.45} />
      </Canvas>
    </Shell>
  )
}
