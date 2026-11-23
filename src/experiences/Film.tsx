import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, RoundedBox } from '@react-three/drei'
import { useEffect, useRef, type MutableRefObject } from 'react'
import type { Group } from 'three'
import { go } from '../router'

export type Tone = 'ink' | 'paper' | 'lime'

export type Chapter = {
  num: string
  word: string
  line: string
  tone: Tone
}

type Kind = 'filo' | 'peso' | 'trazo'

const tones: Record<Tone, { bg: string; fg: string; mute: string; ribbon: string }> = {
  ink: { bg: '#090909', fg: '#f6f3ec', mute: 'rgba(246,243,236,0.66)', ribbon: '#d4ff4f' },
  paper: { bg: '#f3f0e7', fg: '#141414', mute: 'rgba(20,20,20,0.62)', ribbon: '#ff2d2d' },
  lime: { bg: '#d6ff4a', fg: '#14180b', mute: 'rgba(20,24,11,0.72)', ribbon: '#14180b' },
}

function Subject({
  kind,
  progress,
  pointer,
}: {
  kind: Kind
  progress: MutableRefObject<number>
  pointer: MutableRefObject<{ x: number; y: number }>
}) {
  const group = useRef<Group>(null)
  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    const p = progress.current
    const lift = kind === 'trazo' && p > 0.62 ? (p - 0.62) * 4.2 : 0
    const tx = Math.sin(p * Math.PI) * 1.25 + pointer.current.x
    const ty = 0.15 - p * 0.7 + lift - pointer.current.y
    g.position.x += (tx - g.position.x) * 0.08
    g.position.y += (ty - g.position.y) * 0.08
    g.rotation.y += dt * (0.45 + p * 0.8)
    g.rotation.z += (p * 0.6 - g.rotation.z) * 0.06
    g.rotation.x += (-0.35 + pointer.current.y - g.rotation.x) * 0.06
  })

  const metal = () => (
    <meshPhysicalMaterial color="#f2f0ea" metalness={1} roughness={0.16} clearcoat={0.6} />
  )

  return (
    <group ref={group} scale={kind === 'peso' ? 1.05 : 1.15}>
      {kind === 'filo' && (
        <mesh>
          <torusKnotGeometry args={[0.62, 0.18, 140, 16]} />
          {metal()}
        </mesh>
      )}
      {kind === 'peso' && (
        <group>
          <RoundedBox args={[1.15, 1.15, 1.15]} radius={0.12} smoothness={4}>
            {metal()}
          </RoundedBox>
          <mesh position={[0.15, -0.85, 0.4]} rotation={[0.4, 0.6, 0.2]}>
            <capsuleGeometry args={[0.16, 0.42, 8, 16]} />
            {metal()}
          </mesh>
        </group>
      )}
      {kind === 'trazo' && (
        <group rotation={[0.5, 0.2, -0.6]}>
          <mesh position={[0, 0.35, 0]}>
            <coneGeometry args={[0.42, 0.7, 24]} />
            <meshPhysicalMaterial color="#ff2d2d" metalness={0.2} roughness={0.35} />
          </mesh>
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.42, 0.5, 0.9, 24]} />
            {metal()}
          </mesh>
          <mesh position={[0, -0.85, 0]}>
            <capsuleGeometry args={[0.18, 0.28, 6, 12]} />
            <meshStandardMaterial color="#d4ff4f" />
          </mesh>
        </group>
      )}
    </group>
  )
}

function Stage({
  kind,
  progress,
  pointer,
}: {
  kind: Kind
  progress: MutableRefObject<number>
  pointer: MutableRefObject<{ x: number; y: number }>
}) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <directionalLight position={[-5, -2, -2]} intensity={0.8} color="#9ad4ff" />
      <Environment preset="city" />
      <Subject kind={kind} progress={progress} pointer={pointer} />
    </>
  )
}

export function Film({
  kind,
  title,
  chapters,
}: {
  kind: Kind
  title: string
  chapters: Chapter[]
}) {
  const track = useRef<HTMLDivElement>(null)
  const sticky = useRef<HTMLDivElement>(null)
  const word = useRef<HTMLHeadingElement>(null)
  const line = useRef<HTMLParagraphElement>(null)
  const num = useRef<HTMLParagraphElement>(null)
  const index = useRef<HTMLParagraphElement>(null)
  const stroke = useRef<SVGPathElement>(null)
  const progress = useRef(0)
  const tone = useRef<Tone>(chapters[0].tone)
  const pointer = useRef({ x: 0, y: 0 })
  const chapter = useRef(-1)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 0.7
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 0.45
    }
    window.addEventListener('pointermove', onMove)
    let raf = 0
    const tick = () => {
      const el = track.current
      const box = sticky.current
      if (el && box) {
        const total = el.offsetHeight - window.innerHeight
        const p = total <= 0 ? 0 : Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total))
        progress.current = p
        const i = Math.min(chapters.length - 1, Math.floor(p * chapters.length + 0.001))
        if (i !== chapter.current) {
          chapter.current = i
          const c = chapters[i]
          tone.current = c.tone
          const look = tones[c.tone]
          box.style.background = look.bg
          box.style.color = look.fg
          if (word.current) word.current.textContent = c.word
          if (line.current) line.current.textContent = c.line
          if (num.current) num.current.textContent = c.num
          if (index.current) index.current.textContent = `${c.num}  /  0${chapters.length}`
          if (stroke.current) stroke.current.style.stroke = look.ribbon
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [chapters])

  return (
    <div className="film">
      <div className="film-track" ref={track}>
        <div className="film-sticky" ref={sticky} style={{ background: tones[chapters[0].tone].bg, color: tones[chapters[0].tone].fg }}>
          <header className="film-bar">
            <a
              href="/"
              className="film-back"
              data-cursor="grow"
              onClick={(e) => {
                e.preventDefault()
                go('/')
              }}
            >
              ← Portafolio
            </a>
            <p className="film-name">{title}</p>
            <p className="film-index" ref={index}>
              {chapters[0].num}  /  0{chapters.length}
            </p>
          </header>
          <Canvas
            className="film-canvas"
            camera={{ position: [0, 0.15, 6.2], fov: 32 }}
            dpr={[1, 1.6]}
            gl={{ alpha: true, antialias: true }}
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          >
            <Stage kind={kind} progress={progress} pointer={pointer} />
          </Canvas>
          <svg className="film-stroke" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <path
              ref={stroke}
              d="M48 -8 C 62 12, 78 8, 70 28 S 46 38, 58 52 S 86 70, 64 88 S 30 104, 42 118"
              style={{ stroke: tones[chapters[0].tone].ribbon }}
            />
          </svg>
          <h1 className="film-word" ref={word}>
            {chapters[0].word}
          </h1>
          <p className="film-num" ref={num} aria-hidden>
            {chapters[0].num}
          </p>
          <p className="film-line" ref={line}>
            {chapters[0].line}
          </p>
          <p className="film-cue">Baja</p>
        </div>
      </div>
    </div>
  )
}

export function Filo() {
  return (
    <Film
      kind="filo"
      title="Filo"
      chapters={[
        { num: '01', word: 'Filo', line: 'Una forma cruza el tipo. No lo decora.', tone: 'ink' },
        { num: '02', word: 'Toque', line: 'Bajas y la página cambia de peso.', tone: 'paper' },
        { num: '03', word: 'Sigue', line: 'El objeto obedece al scroll.', tone: 'lime' },
      ]}
    />
  )
}

export function Peso() {
  return (
    <Film
      kind="peso"
      title="Peso"
      chapters={[
        { num: '01', word: 'Peso', line: 'Tipografía que ocupa la sala.', tone: 'ink' },
        { num: '02', word: 'Corte', line: 'Fondo claro. Un trazo rojo. Volumen de metal.', tone: 'paper' },
        { num: '03', word: 'Bloque', line: 'El cubo se queda. El resto se mueve.', tone: 'ink' },
      ]}
    />
  )
}

export function Trazo() {
  return (
    <Film
      kind="trazo"
      title="Trazo"
      chapters={[
        { num: '01', word: 'Trazo', line: 'Una línea que no se queda quieta.', tone: 'ink' },
        { num: '02', word: 'Rumbo', line: 'Del negro al papel, el mismo impulso.', tone: 'paper' },
        { num: '03', word: 'Salto', line: 'Al final, despega.', tone: 'lime' },
      ]}
    />
  )
}
