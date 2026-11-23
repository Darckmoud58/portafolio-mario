import type { ReactNode } from 'react'
import { go } from '../router'

export function Shell({
  eyebrow,
  title,
  hint,
  children,
}: {
  eyebrow: string
  title: string
  hint: string
  children: ReactNode
}) {
  return (
    <div className="exp">
      <div className="exp-stage">{children}</div>
      <header className="exp-ui">
        <a
          className="exp-back"
          href="/"
          data-cursor="grow"
          onClick={(e) => {
            e.preventDefault()
            go('/')
          }}
        >
          ← Portafolio
        </a>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="exp-title">{title}</h1>
          <p className="exp-hint">{hint}</p>
        </div>
      </header>
    </div>
  )
}
