import { site } from '../data/site'

export function About() {
  return (
    <section className="about" id="about">
      <div className="about-grid">
        <div>
          <p className="eyebrow">Sobre mí</p>
          <h2>
            No una lista de links.
            <br />
            Una <em>experiencia</em>.
          </h2>
        </div>
        <div className="about-copy">
          <p>{site.blurb}</p>
          <p>
            PWAs, e-commerce, sitios Angular, piezas visuales y un ente local (Ultron) con HUD 3D.
            Tipografía con intención, movimiento con propósito, cero relleno.
          </p>
          <p className="about-loc">
            {site.location} · @{site.handle}
          </p>
        </div>
      </div>
    </section>
  )
}
