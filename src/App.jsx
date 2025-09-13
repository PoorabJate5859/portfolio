import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Timeline from './components/Timeline.jsx'
import Contact from './components/Contact.jsx'
import BackToTop from './components/BackToTop.jsx'

function App() {
  return (
    <div className="min-h-screen">
      {/* Skip to content for keyboard users */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only fixed top-3 left-3 z-[60] rounded-full border border-white/10 bg-white/10 px-4 py-2 text-white backdrop-blur focus:ring-2 focus:ring-[color:var(--neon-cyan)]/40"
      >
        Skip to content
      </a>
      <Nav />
      <main id="content" className="pt-20 md:pt-24">
        <Hero />
        <About />
        <Projects />
        {/* <Timeline /> */}
        <Contact />
      </main>
      <BackToTop />
      <footer className="border-t border-white/10 py-10 text-center text-white/50">
        © {new Date().getFullYear()} Poorab.
      </footer>
    </div>
  )
}

export default App
