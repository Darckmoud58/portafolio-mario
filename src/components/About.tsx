import { site } from '../data/site'

export function About() {
  return (
    <section className="about" id="about">
      <div className="about-grid">
        <div>
          <p className="eyebrow">Sobre mí</p>
          <h2>
            Programador de sistemas <em>y</em> de experiencias
          </h2>
        </div>
        <div className="about-copy">
          <p>{site.blurb}</p>
          <p>
            En Grupo Kasto y proyectos propios he llevado desde reportes BIP y portales APEX hasta
            tiendas Next.js, sitios Angular y un ente local (Ultron) que indexa el conocimiento del
            equipo. Me interesa que el producto se sienta vivo: tipografía con intención, movimiento
            con propósito, cero relleno.
          </p>
          <p className="about-loc">{site.location} · @{site.handle}</p>
        </div>
      </div>
    </section>
  )
}
