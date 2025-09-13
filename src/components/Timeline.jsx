import { useEffect, useRef } from 'react'

export default function Timeline() {
  const items = [
    {
      title: 'Full Stack Developer — Company X',
      period: '2024 — Present',
      body: 'Building scalable web apps with React, Node.js, and cloud services. Focused on performance, DX, and accessibility.',
    },
    {
      title: 'Intern — Startup Y',
      period: '2023',
      body: 'Led implementation of a feature from design to deployment, improving engagement by 18%.',
    },
  ]

  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let ctx
    let ScrollTrigger

    // Dynamic import so the app doesn't crash if gsap isn't installed yet
    ;(async () => {
      try {
        const gsapMod = await import('gsap')
        const stMod = await import('gsap/ScrollTrigger')
        const gsap = gsapMod.gsap || gsapMod.default || gsapMod
        ScrollTrigger = stMod.ScrollTrigger || stMod.default
        gsap.registerPlugin(ScrollTrigger)

        const el = sectionRef.current
        if (!el) return

        const cards = el.querySelectorAll('[data-tl-card]')
        const dots = el.querySelectorAll('[data-tl-dot]')

        ctx = gsap.context(() => {
          // baseline state
          gsap.set(cards, { opacity: 0, y: 48 })
          gsap.set(dots, { scale: 0.6, opacity: 0.5 })

          // stagger in cards as they enter viewport with smoother cubic ease
          cards.forEach((card, i) => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            })
          })

          // glow pulse for dots on scroll
          dots.forEach((dot) => {
            gsap.to(dot, {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'back.out(2.2)',
              scrollTrigger: {
                trigger: dot,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            })
          })

          // subtle pin/parallax for the line on large screens
          if (window.innerWidth >= 1024) {
            const spine = el.querySelector('[data-tl-spine]')
            if (spine) {
              ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                end: 'bottom center',
                pin: spine,
                pinSpacing: false,
                // gentle scrub for cinematic cohesion while scrolling
                scrub: 0.3,
              })
            }
          }
        }, sectionRef)
      } catch (_) {
        // GSAP not installed yet; no-op to keep UI functional
      }
    })()

    return () => {
      try {
        if (ctx) ctx.revert()
        if (ScrollTrigger && ScrollTrigger.getAll) {
          ScrollTrigger.getAll().forEach((t) => t.kill())
        }
      } catch (_) {}
    }
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="mx-auto max-w-7xl px-4 py-24">
      <h2 className="mb-10 text-2xl font-semibold">Experience & Achievements</h2>
      <div className="relative">
        <div data-tl-spine className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2" />
        <div className="space-y-8" role="list">
          {items.map((it, idx) => {
            const right = idx % 2 === 1
            return (
              <div key={idx} role="listitem" className="relative md:grid md:grid-cols-2 md:items-center md:gap-8">
                <div className={`relative ${right ? 'md:col-start-2 md:pl-10' : 'md:col-start-1 md:pr-10'}`}>
                  <div
                    data-tl-dot
                    className="absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full md:left-1/2"
                    style={{ background: 'var(--electric-purple)', boxShadow: '0 0 16px rgba(162,89,255,0.6)' }}
                  />
                  <div data-tl-card className="glass rounded-2xl p-5">
                    <h3 className="text-lg font-semibold">{it.title}</h3>
                    <p className="mt-1 text-sm text-white/60">{it.period}</p>
                    <p className="mt-3 text-white/70">{it.body}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
