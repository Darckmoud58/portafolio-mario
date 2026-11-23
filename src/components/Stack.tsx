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
        y: 24,
        opacity: 0,
        duration: 0.45,
        stagger: 0.035,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="stack" id="stack" ref={ref}>
      <p className="eyebrow">Toolkit</p>
      <h2>
        Con qué <em>fabrico</em>
      </h2>
      <ul className="chip-cloud">
        {site.skills.map((s) => (
          <li key={s} className="chip" data-cursor="grow">
            {s}
          </li>
        ))}
      </ul>
    </section>
  )
}
