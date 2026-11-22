import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { site } from '../data/site'

const OrbitalScene = lazy(() =>
  import('./OrbitalScene').then((m) => ({ default: m.OrbitalScene })),
)

export function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const stage = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      setMouse({
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: -(((e.clientY - r.top) / r.height) * 2 - 1),
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section className="hero" id="top" ref={stage}>
      <div className="hero-scene" aria-hidden>
        <Suspense fallback={null}>
          <OrbitalScene mouse={mouse} />
        </Suspense>
      </div>
      <div className="hero-veil" aria-hidden />
      <div className="hero-copy">
        <p className="eyebrow">{site.role}</p>
        <h1 className="hero-brand">
          {site.name.split(' ')[0]}
          <em> {site.name.split(' ').slice(1).join(' ')}</em>
        </h1>
        <p className="hero-line">{site.tagline}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#work" data-cursor="grow">
            Ver trabajo
          </a>
          <a className="btn btn-ghost" href="#contact" data-cursor="grow">
            Hablar
          </a>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden>
        <span>scroll</span>
        <i />
      </div>
    </section>
  )
}
