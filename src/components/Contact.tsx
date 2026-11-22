import { site } from '../data/site'

export function Contact() {
  return (
    <section className="contact" id="contact">
      <p className="eyebrow">Siguiente</p>
      <h2 className="contact-title">
        ¿Construimos algo
        <br />
        <em>inesperado</em>?
      </h2>
      <div className="contact-actions">
        <a className="btn btn-primary" href={`mailto:${site.email}`} data-cursor="grow">
          {site.email}
        </a>
        <a
          className="btn btn-ghost"
          href={site.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="grow"
        >
          Ver GitHub
        </a>
      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Hecho con React · Three.js · GSAP</span>
      </footer>
    </section>
  )
}
