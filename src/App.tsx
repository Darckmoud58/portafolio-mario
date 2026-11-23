import { lazy, Suspense } from 'react'
import { CustomCursor } from './components/CustomCursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Work } from './components/Work'
import { Stack } from './components/Stack'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { useRoute, type PlayId } from './router'

const Filo = lazy(() => import('./experiences/Film').then((m) => ({ default: m.Filo })))
const Peso = lazy(() => import('./experiences/Film').then((m) => ({ default: m.Peso })))
const Trazo = lazy(() => import('./experiences/Film').then((m) => ({ default: m.Trazo })))
const Sala = lazy(() => import('./experiences/Sala').then((m) => ({ default: m.Sala })))
const Rosa = lazy(() => import('./experiences/Rosa').then((m) => ({ default: m.Rosa })))
const Anillo = lazy(() => import('./experiences/Anillo').then((m) => ({ default: m.Anillo })))
const Ola = lazy(() => import('./experiences/Ola').then((m) => ({ default: m.Ola })))

function Play({ id }: { id: PlayId }) {
  if (id === 'filo') return <Filo />
  if (id === 'peso') return <Peso />
  if (id === 'trazo') return <Trazo />
  if (id === 'sala') return <Sala />
  if (id === 'rosa') return <Rosa />
  if (id === 'anillo') return <Anillo />
  return <Ola />
}

export default function App() {
  const route = useRoute()

  return (
    <>
      <CustomCursor />
      {route === 'home' ? (
        <>
          <Nav />
          <main>
            <Hero />
            <Marquee />
            <Work />
            <Stack />
            <About />
            <Contact />
          </main>
        </>
      ) : (
        <Suspense fallback={<div className="exp-loading">Cargando la pieza…</div>}>
          <Play id={route} />
        </Suspense>
      )}
    </>
  )
}
