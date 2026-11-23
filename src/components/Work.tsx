import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { featuredProjects, projects, type Project } from '../data/projects'
import { go } from '../router'

gsap.registerPlugin(ScrollTrigger)

function StageCard({
  project,
  index,
  active,
}: {
  project: Project
  index: number
  active: boolean
}) {
  return (
    <article
      className={`stage-card${active ? ' is-active' : ''}`}
      style={{ ['--accent' as string]: project.accent }}
      data-cursor="grow"
    >
      <div className="stage-glow" aria-hidden />
      <div className="stage-top">
        <span className="stage-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="stage-year">{project.year}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="stage-sub">{project.subtitle}</p>
      <p className="stage-desc">{project.description}</p>
      <ul className="stage-stack">
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="stage-links">
        {project.live && (
          <a
            href={project.live}
            target={project.live.startsWith('/') ? undefined : '_blank'}
            rel={project.live.startsWith('/') ? undefined : 'noreferrer'}
            onClick={
              project.live.startsWith('/')
                ? (e) => {
                    e.preventDefault()
                    go(project.live!)
                  }
                : undefined
            }
          >
            {project.live.startsWith('/') ? 'Entrar ↗' : 'Live ↗'}
          </a>
        )}
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer">
            Code ↗
          </a>
        )}
        {!project.live && !project.repo && <span className="muted">Privado · cliente</span>}
      </div>
    </article>
  )
}

export function Work() {
  const pin = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const list = featuredProjects.length ? featuredProjects : projects.slice(0, 6)

  useEffect(() => {
    const section = pin.current
    const rail = track.current
    if (!section || !rail) return

    const cards = gsap.utils.toArray<HTMLElement>('.stage-card', rail)
    const mm = gsap.matchMedia()

    mm.add('(min-width: 860px)', () => {
      const tween = gsap.to(rail, {
        x: () => -(rail.scrollWidth - window.innerWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${rail.scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(cards.length - 1, Math.floor(self.progress * cards.length))
            setActive(i)
          },
        },
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    mm.add('(max-width: 859px)', () => {
      gsap.from('.stage-card', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      })
    })

    return () => mm.revert()
  }, [list.length])

  return (
    <section className="work" id="work" ref={pin}>
      <div className="work-head">
        <p className="eyebrow">Selected work</p>
        <h2>
          Cosas que <em>quieres</em> explorar
        </h2>
        <p className="lede">Arrastra el scroll — el trabajo se mueve contigo.</p>
        <div className="work-progress" aria-hidden>
          <span>
            {String(active + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
          </span>
          <div className="work-bar">
            <i style={{ width: `${((active + 1) / list.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="work-viewport">
        <div className="work-track" ref={track}>
          {list.map((p, i) => (
            <StageCard key={p.id} project={p} index={i} active={i === active} />
          ))}
        </div>
      </div>

      <div className="work-more">
        <p className="eyebrow">También</p>
        <ul className="more-list">
          {projects
            .filter((p) => !p.featured)
            .map((p) => (
              <li key={p.id}>
                <span className="more-title">{p.title}</span>
                <span className="more-sub">{p.subtitle}</span>
                <span className="more-year">{p.year}</span>
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" data-cursor="grow">
                    ↗
                  </a>
                )}
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
