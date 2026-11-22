import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, type Project } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const filters = [
  { id: 'all', label: 'Todo' },
  { id: 'web', label: 'Web' },
  { id: 'pwa', label: 'PWA' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'game', label: 'Juegos' },
  { id: 'ai', label: 'AI' },
] as const

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className="project"
      style={{ ['--accent' as string]: project.accent }}
      data-cursor="grow"
    >
      <div className="project-meta">
        <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="project-year">{project.year}</span>
        <span className={`badge badge-${project.visibility}`}>{project.visibility}</span>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-sub">{project.subtitle}</p>
      <p className="project-desc">{project.description}</p>
      <ul className="project-stack">
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="project-links">
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer">
            Live ↗
          </a>
        )}
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer">
            Repo ↗
          </a>
        )}
        {!project.live && !project.repo && (
          <span className="muted">Cliente / privado</span>
        )}
      </div>
    </article>
  )
}

export function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const rail = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)

  const list =
    filter === 'all' ? projects : projects.filter((p) => p.kind === filter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-head', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: section.current, start: 'top 75%' },
      })
      gsap.from('.project', {
        y: 60,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: rail.current, start: 'top 80%' },
      })
    }, section)
    return () => ctx.revert()
  }, [filter])

  return (
    <section className="work" id="work" ref={section}>
      <div className="work-head">
        <p className="eyebrow">Seleccionado</p>
        <h2>
          Trabajo que <em>se siente</em>
        </h2>
        <p className="lede">
          Sitios, PWAs, sistemas Oracle y experimentos. Minimal. Interactivo. Un poco inesperado.
        </p>
        <div className="filters" role="tablist" aria-label="Filtrar proyectos">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={filter === f.id ? 'is-active' : ''}
              onClick={() => setFilter(f.id)}
              data-cursor="grow"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="work-rail" ref={rail}>
        {list.map((p, i) => (
          <ProjectPanel key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
