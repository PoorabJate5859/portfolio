import { useEffect } from 'react'
import { motion, useAnimation, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import BackgroundCanvas from './BackgroundCanvas.jsx'

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const heroImgControls = useAnimation()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const parallaxX = useTransform(mx, [-1, 1], [-8, 8])
  const parallaxY = useTransform(my, [-1, 1], [-6, 6])

  const headingVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : -24 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } },
  }

  // Smooth scroll to an anchor with header offset (re-usable)
  const scrollWithOffset = (href) => {
    const el = document.querySelector(href)
    if (!el) return
    const header = document.querySelector('header')
    const headerHeight = header ? header.getBoundingClientRect().height + 12 : 0
    const top = window.scrollY + el.getBoundingClientRect().top - headerHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const subContainer = {
    hidden: {},
    visible: prefersReduced ? { transition: { staggerChildren: 0 } } : { transition: { staggerChildren: 0.2 } },
  }

  const subItem = {
    hidden: { opacity: 0, x: prefersReduced ? 0 : -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
  }

  const imageVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16, scale: prefersReduced ? 1 : 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: 'backOut' } },
  }

  // kick off entrance, then a subtle continuous float after mount
  useEffect(() => {
    if (prefersReduced) return
    let cancelled = false
      ; (async () => {
        try {
          await heroImgControls.start('visible')
          if (cancelled) return
          heroImgControls.start({ y: [0, -6, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } })
        } catch { }
      })()
    return () => { cancelled = true }
  }, [heroImgControls, prefersReduced])
  return (
    <section id="home" className="relative flex min-h-[100dvh] items-center overflow-hidden">
      {/* Bloom/vignette overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(162,89,255,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(30%_30%_at_80%_20%,rgba(0,255,247,0.06),transparent)]" />
      </div>

      {/* Animated neon blobs background (progressive enhancement) */}
      <BackgroundCanvas className="pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2 md:place-items-center">
          {/* Intro text (second on mobile) */}
          <div className="max-w-3xl order-2 md:order-1">
            <p className="mb-4 text-sm tracking-widest text-white/60">FULL STACK DEVELOPER</p>

            <motion.h1
              className="neon-text text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
              variants={headingVariants}
              initial="hidden"
              animate="visible"
            >
              Hi, I’m <span className="text-[color:var(--neon-cyan)]">Poorab</span> —
              <br className="hidden sm:block" />
              I design & build modern web applications
            </motion.h1>

            <motion.div
              variants={subContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.p variants={subItem} className="mt-5 max-w-2xl text-base text-white/70 sm:text-lg">
                Turning ideas into scalable solutions across frontend, backend, and cloud — with a passion for performance and delightful UX.
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.a
                  variants={subItem}
                  href="#projects"
                  className="group relative inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white shadow-neon transition hover:shadow-[0_0_30px_rgba(0,255,247,0.35)]"
                >
                  <span
                    className="absolute inset-0 rounded-full opacity-0 blur-sm transition group-hover:opacity-100"
                    style={{ background: 'linear-gradient(90deg, rgba(0,255,247,0.25), rgba(162,89,255,0.25))' }}
                  />
                  <span className="relative">View My Work</span>
                </motion.a>
                {/* <motion.a
                  variants={subItem}
                  href="#contact"
                  className="relative inline-flex items-center rounded-full border border-[color:var(--neon-cyan)]/40 px-6 py-3 font-medium text-[color:var(--neon-cyan)] hover:text-white transition"
                  style={{ boxShadow: '0 0 20px rgba(0,255,247,0.15) inset, 0 0 20px rgba(0,255,247,0.15)' }}
                >
                  Contact Me
                </motion.a> */}
                <motion.a
                  variants={subItem}
                  href="/Jate_Poorab_CV.pdf"
                  download
                  className="group relative inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white shadow-neon transition hover:shadow-[0_0_30px_rgba(162,89,255,0.35)]"
                  title="Download CV"
                >
                  <span
                    className="absolute inset-0 rounded-full opacity-0 blur-sm transition group-hover:opacity-100"
                    style={{ background: 'linear-gradient(90deg, rgba(162,89,255,0.25), rgba(0,255,247,0.25))' }}
                  />
                  <span className="relative">Download CV</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Portrait/Image (first on mobile) */}
          <div
            className="relative mx-auto flex max-w-sm justify-center md:mx-0 md:justify-center order-1 md:order-2"
            onMouseMove={(e) => {
              if (prefersReduced) return
              const rect = e.currentTarget.getBoundingClientRect()
              const x = (e.clientX - rect.left) / rect.width // 0..1
              const y = (e.clientY - rect.top) / rect.height
              mx.set(x * 2 - 1) // -1..1
              my.set(y * 2 - 1)
            }}
            onMouseLeave={() => { mx.set(0); my.set(0) }}
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,255,247,0.15),transparent)] blur-2xl" />
            <motion.img
              src="/images/profile.png"
              alt="Poorab portrait"
              className="h-56 w-56 rounded-2xl object-cover ring-1 ring-white/10 shadow-[0_0_40px_rgba(0,255,247,0.2)] sm:h-64 sm:w-64 md:h-72 md:w-72"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/vite.svg';
                e.currentTarget.classList.add('bg-white/5', 'p-6');
              }}
              variants={imageVariants}
              initial="hidden"
              animate={heroImgControls}
              style={{ x: parallaxX, y: parallaxY }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#projects"
        onClick={(e) => { e.preventDefault(); scrollWithOffset('#projects') }}
        className="group pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ delay: 1.2, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to Projects"
      >
        <span className="mr-2 align-middle">Scroll</span>
        <svg className="inline h-4 w-4 align-middle opacity-80 transition group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 16a1 1 0 0 1-.707-.293l-6-6 1.414-1.414L12 13.586l5.293-5.293 1.414 1.414-6 6A1 1 0 0 1 12 16Z" />
        </svg>
      </motion.a>
    </section>
  )
}
