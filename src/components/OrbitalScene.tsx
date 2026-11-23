import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

function Core() {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.28
    ref.current.rotation.x = Math.sin(t * 0.35) * 0.25
    ref.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.03)
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#d4ff4f"
        emissive="#5c7a12"
        emissiveIntensity={0.7}
        metalness={0.4}
        roughness={0.2}
        wireframe
      />
    </mesh>
  )
}

function OrbitRing({
  radius,
  speed,
  tilt,
  color,
  size = 0.16,
}: {
  radius: number
  speed: number
  tilt: number
  color: string
  size?: number
}) {
  const group = useRef<Group>(null)
  useFrame((_, dt) => {
    if (!group.current) return
    group.current.rotation.z += dt * speed
  })
  return (
    <group ref={group} rotation={[tilt, 0.35, 0.15]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.006, 12, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} />
      </mesh>
      <Float speed={2.2} floatIntensity={1.4}>
        <mesh position={[radius, 0, 0]}>
          <octahedronGeometry args={[size, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.85}
            metalness={0.7}
            roughness={0.15}
          />
        </mesh>
      </Float>
    </group>
  )
}

function Nodes() {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = []
    for (let i = 0; i < 64; i++) {
      arr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 5.5,
          (Math.random() - 0.5) * 7,
        ),
      )
    }
    return arr
  }, [])

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  return (
    <points geometry={geo}>
      <pointsMaterial size={0.03} color="#f5f5f0" transparent opacity={0.65} sizeAttenuation />
    </points>
  )
}

function SceneContents({ mouse }: { mouse: { x: number; y: number } }) {
  const root = useRef<Group>(null)
  useFrame(() => {
    if (!root.current) return
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, mouse.x * 0.42, 0.05)
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, mouse.y * 0.22, 0.05)
  })

  return (
    <group ref={root}>
      <ambientLight intensity={0.28} />
      <pointLight position={[4, 3, 5]} intensity={55} color="#d4ff4f" distance={22} />
      <pointLight position={[-5, -2, -3]} intensity={32} color="#7ee8ff" distance={20} />
      <pointLight position={[0, 4, -2]} intensity={18} color="#ff9b6a" distance={16} />
      <Stars radius={70} depth={45} count={2200} factor={3.2} saturation={0} fade speed={0.55} />
      <Core />
      <OrbitRing radius={2.05} speed={0.38} tilt={0.55} color="#d4ff4f" />
      <OrbitRing radius={2.75} speed={-0.24} tilt={-0.85} color="#7ee8ff" size={0.13} />
      <OrbitRing radius={3.45} speed={0.15} tilt={1.15} color="#ff9b6a" size={0.11} />
      <Nodes />
    </group>
  )
}

export function OrbitalScene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 7], fov: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <SceneContents mouse={mouse} />
    </Canvas>
  )
}
