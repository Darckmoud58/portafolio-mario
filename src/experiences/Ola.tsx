import { projects } from '../data/projects'
import { Back } from './Back'

const names = projects.filter((p) => p.featured).slice(0, 8)

export function Ola() {
  return (
    <div className="ola">
      <div className="ola-fixed">
        <Back />
      </div>
      <section className="ola-hero">
        <p className="ola-kicker">Landing</p>
        <h1>Una página que se recorre como una tienda.</h1>
        <p className="ola-lead">
          Titular grande, marcas que flotan y una franja de prueba. La estructura de un sitio que vende, armada con el trabajo real.
        </p>
        <div className="ola-float" aria-hidden>
          {['React', 'Three.js', 'Laravel', 'PWA', 'GSAP', 'WebGL'].map((chip, i) => (
            <span key={chip} style={{ animationDelay: `${i * 0.35}s` }}>
              {chip}
            </span>
          ))}
        </div>
      </section>
      <section className="ola-band">
        <h2>Ya están en la mesa.</h2>
        <ul>
          {names.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      </section>
      <section className="ola-grid">
        <article>
          <p>01</p>
          <h3>Se entiende en un pantallazo.</h3>
          <p>El primer pliegue dice qué es. El resto confirma.</p>
        </article>
        <article>
          <p>02</p>
          <h3>La prueba va en el medio.</h3>
          <p>Nombres, no adornos. Lo que ya existe se muestra junto.</p>
        </article>
        <article>
          <p>03</p>
          <h3>El cierre pide un paso.</h3>
          <p>Una sola acción. El correo ya está en el portafolio.</p>
        </article>
      </section>
      <section className="ola-end">
        <h2>Del negro al mostrador.</h2>
        <a href="mailto:alberto_glez04@hotmail.com" data-cursor="grow">
          Escribir
        </a>
      </section>
    </div>
  )
}
