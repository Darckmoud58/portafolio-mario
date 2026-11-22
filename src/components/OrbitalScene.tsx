import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

function Core() {
  const ref = useRef<Mesh>(null)
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.35
    ref.current.rotation.x += dt * 0.12
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.15, 1]} />
      <meshStandardMaterial
        color="#d4ff4f"
        emissive="#6b8f1a"
        emissiveIntensity={0.55}
        metalness={0.35}
        roughness={0.25}
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
}: {
  radius: number
  speed: number
  tilt: number
  color: string
}) {
  const group = useRef<Group>(null)
  useFrame((_, dt) => {
    if (!group.current) return
    group.current.rotation.z += dt * speed
  })
  return (
    <group ref={group} rotation={[tilt, 0.4, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 12, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <Float speed={2} floatIntensity={1.2}>
        <mesh position={[radius, 0, 0]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.7}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  )
}

function Nodes() {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = []
    for (let i = 0; i < 48; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 6,
      )
      arr.push(v)
    }
    return arr
  }, [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points)
    return g
  }, [points])

  return (
    <points geometry={geo}>
      <pointsMaterial size={0.035} color="#f5f5f0" transparent opacity={0.7} />
    </points>
  )
}

function SceneContents({ mouse }: { mouse: { x: number; y: number } }) {
  const root = useRef<Group>(null)
  useFrame(() => {
    if (!root.current) return
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      mouse.x * 0.35,
      0.05,
    )
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      mouse.y * 0.2,
      0.05,
    )
  })

  return (
    <group ref={root}>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 5]} intensity={40} color="#d4ff4f" distance={20} />
      <pointLight position={[-5, -2, -3]} intensity={25} color="#7ee8ff" distance={18} />
      <Stars radius={60} depth={40} count={1800} factor={3} saturation={0} fade speed={0.6} />
      <Core />
      <OrbitRing radius={2.1} speed={0.35} tilt={0.6} color="#d4ff4f" />
      <OrbitRing radius={2.8} speed={-0.22} tilt={-0.9} color="#7ee8ff" />
      <OrbitRing radius={3.5} speed={0.14} tilt={1.2} color="#ff9b6a" />
      <Nodes />
    </group>
  )
}

export function OrbitalScene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <SceneContents mouse={mouse} />
    </Canvas>
  )
}
