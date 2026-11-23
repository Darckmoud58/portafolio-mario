import { go } from '../router'

export function Back() {
  return (
    <a
      href="/"
      className="film-back piece-back"
      data-cursor="grow"
      onClick={(e) => {
        e.preventDefault()
        go('/')
      }}
    >
      ← Portafolio
    </a>
  )
}
