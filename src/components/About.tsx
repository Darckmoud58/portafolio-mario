import { site } from '../data/site'

export function About() {
  return (
    <section className="about" id="about">
      <div className="about-grid">
        <div>
          <p className="eyebrow">About</p>
          <h2>
            Odio los sitios <em>aburridos</em>
          </h2>
        </div>
        <div className="about-copy">
          <p>{site.blurb}</p>
          <p>
            Este portafolio no es una lista de links: es una pequeña experiencia. Tipografía con
            intención, movimiento con propósito, y proyectos que se sienten vivos en el navegador.
          </p>
          <p className="about-loc">
            {site.location} · @{site.handle}
          </p>
        </div>
      </div>
    </section>
  )
}
