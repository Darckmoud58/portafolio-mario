import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export function Work() {
  const pin = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = pin.current
    const rail = track.current
    if (!section || !rail) return

    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, rail.scrollWidth - window.innerWidth)

      gsap.to(rail, {
        x: () => -getScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 0.65,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      gsap.from('.work-intro > *', {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      })
    }, section)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [])

  return (
    <section className="work" id="work" ref={pin}>
      <div className="work-intro">
        <p className="eyebrow">Selected work</p>
        <h2>
          Piezas que <em>se exploran</em>
        </h2>
        <p className="lede">Arrastra el scroll — el trabajo viaja contigo.</p>
      </div>

      <div className="work-viewport">
        <div className="work-track" ref={track}>
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="slide"
              style={{ ['--accent' as string]: p.accent }}
              data-cursor="grow"
            >
              <div className="slide-index">{String(i + 1).padStart(2, '0')}</div>
              <div className="slide-glow" aria-hidden />
              <p className="slide-year">
                {p.year} · {p.visibility}
              </p>
              <h3 className="slide-title">{p.title}</h3>
              <p className="slide-sub">{p.subtitle}</p>
              <p className="slide-desc">{p.description}</p>
              <ul className="slide-stack">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="slide-links">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer">
                    Abrir live
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer">
                    Código
                  </a>
                )}
                {!p.live && !p.repo && <span>Proyecto privado</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
