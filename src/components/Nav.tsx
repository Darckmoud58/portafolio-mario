import { site } from '../data/site'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  return (
    <header className="nav">
      <a className="nav-brand" href="#top" data-cursor="grow">
        {site.name.split(' ')[0]}
        <span>.</span>
      </a>
      <nav className="nav-links" aria-label="Principal">
        {links.map((l) => (
          <a key={l.href} href={l.href} data-cursor="grow">
            {l.label}
          </a>
        ))}
      </nav>
      <a
        className="nav-cta"
        href={site.github}
        target="_blank"
        rel="noreferrer"
        data-cursor="grow"
      >
        GitHub
      </a>
    </header>
  )
}
