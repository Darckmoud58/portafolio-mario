import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls, Sparkles } from '@react-three/drei'
import { useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import { Shell } from './Shell'

function Scene({ hot, onIgnite }: { hot: boolean; onIgnite: () => void }) {
  const rig = useRef<Group>(null)
  const core = useRef<Mesh>(null)
  const heat = useRef(0)

  useFrame((state, dt) => {
    heat.current += ((hot ? 1 : 0) - heat.current) * Math.min(1, dt * 3)
    if (rig.current) {
      rig.current.rotation.y += dt * (0.18 + heat.current * 0.7)
      rig.current.rotation.x = state.pointer.y * 0.25
    }
    if (core.current) {
      const s = 1.15 + heat.current * 0.45 + Math.sin(state.clock.elapsedTime * 2) * 0.03
      core.current.scale.setScalar(s)
    }
  })

  const shards = [
    ['#7ee8ff', 2.1, 0.4, 0.2],
    ['#ff9b6a', -1.8, 0.9, 0.8],
    ['#d4ff4f', 0.4, -1.3, 1.6],
    ['#c4b5fd', -0.6, 1.4, -1.5],
    ['#fde047', 1.5, -0.6, -1.2],
    ['#fb7185', -1.4, -1.1, 0.4],
  ] as const

  return (
    <>
      <color attach="background" args={['#070806']} />
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 2, 4]} intensity={18} color="#d4ff4f" />
      <pointLight position={[-3, -1, -2]} intensity={8} color="#7ee8ff" />
      <Sparkles count={48} scale={7} size={2} speed={0.4} color="#d4ff4f" />
      <group ref={rig}>
        <Float speed={1.2} floatIntensity={0.6}>
          <mesh
            ref={core}
            onClick={(e) => {
              e.stopPropagation()
              onIgnite()
            }}
          >
            <icosahedronGeometry args={[1, 12]} />
            <MeshDistortMaterial
              color={hot ? '#f4ffc4' : '#d4ff4f'}
              emissive={hot ? '#d4ff4f' : '#3d4f10'}
              emissiveIntensity={hot ? 1.1 : 0.4}
              roughness={0.15}
              metalness={0.6}
              distort={hot ? 0.62 : 0.32}
              speed={hot ? 4 : 1.8}
            />
          </mesh>
        </Float>
        {shards.map(([color, x, y, z], i) => (
          <Float key={color} speed={1.4 + i * 0.15} floatIntensity={1.2}>
            <mesh position={[x, y, z]} scale={0.22 + (i % 3) * 0.05}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshPhysicalMaterial
                color={color}
                roughness={0.08}
                metalness={0.15}
                transmission={0.65}
                thickness={0.8}
                emissive={color}
                emissiveIntensity={hot ? 0.8 : 0.2}
              />
            </mesh>
          </Float>
        ))}
      </group>
      <OrbitControls enablePan={false} minDistance={3.2} maxDistance={8} />
    </>
  )
}

export function Nucleo() {
  const [hot, setHot] = useState(false)
  return (
    <Shell
      eyebrow="Experiencia 01"
      title="Núcleo"
      hint={hot ? 'Encendido. Vuelve a pulsar para apagarlo.' : 'Orbita con el arrastre. Pulsa el núcleo.'}
    >
      <Canvas camera={{ position: [0, 0.3, 5.4], fov: 42 }} dpr={[1, 1.75]}>
        <Scene
          hot={hot}
          onIgnite={() => setHot((v) => !v)}
        />
      </Canvas>
    </Shell>
  )
}
