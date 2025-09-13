import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('#home')
  const [hideOnScroll, setHideOnScroll] = useState(false)
  const btnRef = useRef(null)
  const firstLinkRef = useRef(null)
  const headerRef = useRef(null)

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    // { href: '#experience', label: 'Experience' },
    // { href: '#contact', label: 'Contact' },
  ]

  // Close on ESC and lock scroll when menu is open
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      // focus first link for accessibility
      setTimeout(() => {
        firstLinkRef.current?.focus()
      }, 0)
      return () => {
        document.removeEventListener('keydown', onKey)
        document.body.style.overflow = prev
      }
    }
  }, [open])

  // Reveal/hide header on scroll direction (desktop only)
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > lastY && y > 80
      setHideOnScroll(goingDown)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Restore focus to button when menu closes
  useEffect(() => {
    if (!open) btnRef.current?.focus()
  }, [open])

  // Scrollspy: highlight link for section in view
  useEffect(() => {
    const sectionIds = links.map(l => l.href)
    const sections = sectionIds
      .map(id => document.querySelector(id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver((entries) => {
      // Pick the entry closest to viewport top that is intersecting
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) {
        const id = '#' + visible[0].target.id
        setActiveId(id)
      }
    }, {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: [0, 0.25, 0.5, 1],
    })

    sections.forEach(sec => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  // Smooth scroll with header offset
  const handleNavClick = (e, href) => {
    const el = document.querySelector(href)
    if (!el) return
    e.preventDefault()
    const header = headerRef.current
    const headerHeight = header ? header.getBoundingClientRect().height + 12 : 0
    const top = window.scrollY + el.getBoundingClientRect().top - headerHeight
    window.scrollTo({ top, behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header ref={headerRef} className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${hideOnScroll ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 bg-black/70 backdrop-blur-md border border-white/15">
          <a href="#home" className="flex items-center gap-3">
            <span className="inline-block h-3 w-3 rounded-full" style={{ boxShadow: '0 0 12px rgba(0,255,247,0.8)', background: 'var(--neon-cyan)' }} />
            <span className="font-semibold tracking-wide">Poorab</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className={`relative transition-colors ${activeId === l.href ? 'text-white' : 'text-white/80 hover:text-white'}`}
                aria-current={activeId === l.href ? 'page' : undefined}
              >
                <span style={{ textShadow: '0 0 10px rgba(0,255,247,0.25)' }}>{l.label}</span>
                {activeId === l.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full bg-[color:var(--neon-cyan)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="ml-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white shadow-neon hover:shadow-[0_0_24px_rgba(0,255,247,0.35)] transition"
            >
              Let’s Talk
            </a>
          </nav>

          <button
            ref={btnRef}
            className="md:hidden relative h-10 w-10 rounded-xl border border-white/10 bg-white/5 outline-none focus:ring-2 focus:ring-[color:var(--neon-cyan)]/40"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            {/* Hamburger morph */}
            <span className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-2 bg-white transition-transform duration-300 ${open ? 'translate-y-0 rotate-45' : ''}`} />
            <span className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 bg-white transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 translate-y-2 bg-white transition-transform duration-300 ${open ? 'translate-y-0 -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-nav"
          className={`md:hidden transition-[max-height] duration-300 overflow-hidden ${open ? 'max-h-96' : 'max-h-0'}`}
        >
          <div className="mt-2 glass rounded-2xl px-4 py-3">
            <nav className="flex flex-col">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  ref={i === 0 ? firstLinkRef : null}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="py-2 text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-[color:var(--neon-cyan)]/40 rounded"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
