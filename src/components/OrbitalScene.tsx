import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

function Blob() {
  const ref = useRef<Mesh>(null)
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.18
    ref.current.rotation.z += dt * 0.06
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.1}>
      <mesh ref={ref} scale={1.55}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#d4ff4f"
          emissive="#3d4f10"
          emissiveIntensity={0.45}
          roughness={0.18}
          metalness={0.55}
          distort={0.38}
          speed={2.2}
        />
      </mesh>
    </Float>
  )
}

function GlassOrb({
  position,
  color,
  scale = 0.35,
}: {
  position: [number, number, number]
  color: string
  scale?: number
}) {
  return (
    <Float speed={2 + scale} floatIntensity={1.6} rotationIntensity={0.8}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.2}
          transmission={0.55}
          thickness={0.6}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  )
}

function Ribbon() {
  const ref = useRef<Group>(null)
  const curve = useMemo(() => {
    const pts = []
    for (let i = 0; i < 40; i++) {
      const t = (i / 39) * Math.PI * 2
      pts.push(
        new THREE.Vector3(Math.cos(t) * 2.6, Math.sin(t * 2) * 0.55, Math.sin(t) * 2.6),
      )
    }
    return new THREE.CatmullRomCurve3(pts, true)
  }, [])

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.12
  })

  return (
    <group ref={ref}>
      <mesh>
        <tubeGeometry args={[curve, 160, 0.025, 8, true]} />
        <meshBasicMaterial color="#7ee8ff" transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

function SceneContents({ mouse }: { mouse: { x: number; y: number } }) {
  const root = useRef<Group>(null)
  useFrame(() => {
    if (!root.current) return
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      mouse.x * 0.45,
      0.06,
    )
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      mouse.y * 0.22,
      0.06,
    )
  })

  return (
    <group ref={root}>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 8, 18]} />
      <ambientLight intensity={0.25} />
      <spotLight
        position={[6, 8, 4]}
        intensity={80}
        angle={0.45}
        penumbra={0.7}
        color="#d4ff4f"
      />
      <pointLight position={[-4, -2, -3]} intensity={35} color="#7ee8ff" />
      <pointLight position={[2, -3, 4]} intensity={20} color="#ff9b6a" />
      <Blob />
      <Ribbon />
      <GlassOrb position={[2.4, 1.1, 0.4]} color="#d4ff4f" scale={0.28} />
      <GlassOrb position={[-2.2, -0.6, 1]} color="#7ee8ff" scale={0.4} />
      <GlassOrb position={[0.6, -1.6, 1.6]} color="#ff9b6a" scale={0.22} />
      <GlassOrb position={[-1.4, 1.5, -1]} color="#fde047" scale={0.18} />
      <Sparkles count={60} scale={9} size={2.5} speed={0.35} color="#f5f5f0" opacity={0.55} />
    </group>
  )
}

export function OrbitalScene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 6.4], fov: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <SceneContents mouse={mouse} />
    </Canvas>
  )
}
