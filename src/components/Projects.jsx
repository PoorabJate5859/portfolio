import { useEffect, useMemo, useRef, useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
// Modal removed for minimal list

export default function Projects() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)
  const projects = useMemo(() => [
    {
      title: 'City Care Hospital Management',
      desc: 'A comprehensive hospital management system built with modern web technologies, offering functionality for multi-role users (Admin, Doctor, Nurse, Patient) to handle appointments, billing, medical records, and staff operations.',
      stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT Authentication', 'Bcrypt', 'Axios', 'React Router', 'Formik & Yup'],
      image: '/images/City%20Care%20Hospital%20Management.png',
      noTilt: true,
      links: {
        live: '',
        github: 'https://github.com/PoorabJate5859/City-Care-Hospital-Management',
      },
    },
    {
      title: 'BlogSphere Admin',
      desc: 'A role-based blog administration panel that allows admins and managers to manage posts, categories, and users efficiently.',
      stack: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Bootstrap', 'JavaScript', 'CSS'],
      image: '/images/BlogSphere%20Admin.png',
      noTilt: true,
      links: {
        live: '',
        github: 'https://github.com/PoorabJate5859/BlogSphere-Admin',
      },
    },

  ], [])

  const [Motion, setMotion] = useState(null)

  // Dynamic import of framer-motion; graceful fallback
  useEffect(() => {
    let mounted = true
      ; (async () => {
        try {
          const mod = await import('framer-motion')
          if (!mounted) return
          setMotion({
            m: mod.motion,
            AnimatePresence: mod.AnimatePresence,
          })
        } catch (_) {
          // framer-motion not installed yet; render without animations
          if (!mounted) return
          setMotion(null)
        }
      })()
    return () => { mounted = false }
  }, [])

  const isMotion = !!(Motion && Motion.m)
  const CardWrapper = isMotion ? Motion.m.div : 'div'
  const GridWrapper = isMotion ? Motion.m.div : 'div'
  const Presence = isMotion ? Motion.AnimatePresence : ({ children }) => children

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const gridVariants = isMotion ? {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.14 }
    },
  } : undefined

  const itemVariants = isMotion ? {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.01 : 0.8,
        ease: prefersReduced ? 'linear' : [0.22, 1, 0.36, 1],
      },
    },
  } : undefined

  const gridMotionProps = isMotion ? {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.2 },
    variants: gridVariants,
  } : {}

  const cardMotionProps = isMotion ? { variants: itemVariants } : {}
  const cardHoverProps = isMotion ? { whileHover: {} } : {}

  // Motion helpers for skills and buttons
  const Badge = isMotion ? Motion.m.span : 'span'
  const Btn = isMotion ? Motion.m.a : 'a'
  const BadgeContainer = isMotion ? Motion.m.div : 'div'
  const BtnContainer = isMotion ? Motion.m.div : 'div'
  const badgeContainerProps = isMotion ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.3 }, variants: { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } } } : {}
  const badgeItemVariants = isMotion ? { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } } } : undefined
  const btnContainerProps = isMotion ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.3 }, variants: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } } } : {}
  const btnItemVariants = isMotion ? { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } } : undefined

  return (
    <section ref={sectionRef} className="mx-auto max-w-7xl px-4 py-24">
      <div id="projects"></div>
      <h2 className="mb-2 text-2xl font-semibold">Projects</h2>
      <p className="text-white/70">Turning ideas into fast, reliable, and delightful products.</p>

      <GridWrapper
        className="mt-8 flex flex-col gap-14"
        {...gridMotionProps}
      >
        {projects.map((p, idx) => (
          <CardWrapper
            key={p.title}
            className="group relative transition"
            {...cardMotionProps}
            {...cardHoverProps}
            // No click-to-open behavior (minimal list)
            data-tilt={p.noTilt ? 'off' : 'on'}
            onMouseMove={(e) => {
              if (prefersReduced) return
              if (e.currentTarget.dataset.tilt === 'off') return
              const el = e.currentTarget
              const inner = el.querySelector('.tilt-inner')
              if (!inner) return
              const rect = el.getBoundingClientRect()
              const x = (e.clientX - rect.left) / rect.width // 0..1
              const y = (e.clientY - rect.top) / rect.height
              const rx = (0.5 - y) * 8 // max 8deg
              const ry = (x - 0.5) * 10 // max 10deg
              inner.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
            }}
            onMouseLeave={(e) => {
              const inner = e.currentTarget.querySelector('.tilt-inner')
              if (inner) inner.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
            }}
            aria-label={`Open ${p.title} details`}
          >

            <div
              className="relative tilt-inner"
              style={{
                transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)',
                backfaceVisibility: 'hidden',
                willChange: p.noTilt ? 'auto' : 'transform',
              }}
            >
              <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:items-center md:gap-12 ">
                {/* Image side */}
                <div
                  className={`relative flex items-center justify-center h-56 sm:h-72 md:h-[22rem] lg:h-[26rem] ${idx % 2 === 1 ? 'md:order-2' : ''}`}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className={`rounded-2xl ring-1 ring-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] ${p.noTilt ? 'object-cover md:object-contain' : 'object-cover'} transition duration-300 ease-out`}
                      style={{ imageRendering: 'auto', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                    />
                  ) : null}
                  {/* Top gradient overlay to improve contrast over light images */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-24 sm:h-28 md:h-32 lg:h-40 bg-gradient-to-b from-black/60 to-transparent" />
                  </div>
                </div>

                {/* Details side */}
                <div className={`${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">{p.title}</h3>
                  <p className="mt-4 text-white/70 leading-relaxed">{p.desc}</p>
                  <BadgeContainer className="mt-5 flex flex-wrap gap-2" {...badgeContainerProps}>
                    {p.stack.map((t) => (
                      <Badge key={t} variants={badgeItemVariants} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">{t}</Badge>
                    ))}
                  </BadgeContainer>
                  {(p.links?.github || p.links?.live) ? (
                    <BtnContainer className="mt-6 flex flex-wrap gap-3" {...btnContainerProps}>
                      {p.links?.github ? (
                        <Btn
                          {...(isMotion ? { variants: btnItemVariants, whileHover: { y: -2, scale: 1.02 } } : {})}
                          href={p.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 hover:text-white"
                        >
                          GitHub
                        </Btn>
                      ) : null}
                      {p.links?.live ? (
                        <Btn
                          {...(isMotion ? { variants: btnItemVariants, whileHover: { y: -2, scale: 1.02 } } : {})}
                          href={p.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-[color:var(--neon-cyan)]/40 px-4 py-2 text-sm text-[color:var(--neon-cyan)] hover:text-white"
                          style={{ boxShadow: '0 0 12px rgba(0,255,247,0.15)' }}
                        >
                          Live Demo
                        </Btn>
                      ) : null}
                    </BtnContainer>
                  ) : null}
                </div>
              </div>
            </div>
          </CardWrapper>
        ))}
      </GridWrapper>

      {/* Modal removed for minimal list */}
    </section>
  )
}
