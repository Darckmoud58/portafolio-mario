import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '../data/site'

gsap.registerPlugin(ScrollTrigger)

export function Stack() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chip', {
        scale: 0.85,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="stack" id="stack" ref={ref}>
      <p className="eyebrow">Toolkit</p>
      <h2>
        Con lo que <em>juego</em>
      </h2>
      <ul className="chip-cloud">
        {site.skills.map((s) => (
          <li key={s} className="chip" data-cursor="grow">
            {s}
          </li>
        ))}
      </ul>
      <div className="stats">
        {site.stats.map((st) => (
          <div key={st.label} className="stat">
            <strong>{st.value}</strong>
            <span>{st.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
