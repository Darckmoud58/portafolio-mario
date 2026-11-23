export function Marquee() {
  const items = [
    'PWAs',
    'E-commerce',
    'Sitios Angular',
    'Experiencias 3D',
    'Laravel',
    'Next.js',
    'Juegos kiosco',
    'Ultron',
    'Diseño vivo',
  ]
  const line = [...items, ...items]

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {line.map((t, i) => (
          <span key={`${t}-${i}`}>
            {t}
            <em>✦</em>
          </span>
        ))}
      </div>
    </div>
  )
}
