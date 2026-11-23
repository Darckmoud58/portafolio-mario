import { CustomCursor } from './components/CustomCursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Work } from './components/Work'
import { Stack } from './components/Stack'
import { About } from './components/About'
import { Contact } from './components/Contact'

export default function App() {
  return (
    <>
      <CustomCursor />
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
  )
}
