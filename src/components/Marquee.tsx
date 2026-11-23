export function Marquee() {
  const line =
    'SITIOS · PWAs · 3D · MOTION · COMMERCE · EXPERIENCIAS · CÓDIGO CON CARÁCTER · '
  return (
    <section className="marquee" aria-hidden>
      <div className="marquee-track">
        <span>{line.repeat(4)}</span>
        <span>{line.repeat(4)}</span>
      </div>
    </section>
  )
}
