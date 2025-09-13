import { useRef } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

function HoverAvatar() {
  return (
    <motion.div
      className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-2xl bg-white/5"
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Neon ring */}
      <div className="neon-ring absolute inset-0 rounded-2xl" aria-hidden />
      {/* Glow pulse layer */}
      <motion.div
        className="absolute -inset-3 rounded-[1.75rem] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,255,247,0.35),transparent)]"
        initial={{ opacity: 0.15, scale: 0.98 }}
        whileHover={{ opacity: 0.45, scale: 1.03 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        aria-hidden
      />
      {/* Avatar emoji */}
      <div className="relative z-10 flex h-full w-full items-center justify-center text-3xl text-white/80">👨‍💻</div>
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)
  const skills = [
    { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'] },
    { group: 'Backend', items: ['Node.js', 'Express'] },
    { group: 'Database', items: ['MongoDB', 'MySQL'] },
    { group: 'Tools', items: ['Git', 'Docker'] },
  ]

  return (
    <section ref={sectionRef} id="about" className="mx-auto max-w-7xl px-4 py-24">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* Profile Glass Card */}
        <div className="relative">
          <motion.div
            className="glass group relative overflow-hidden rounded-3xl p-6"
            whileHover={{ y: -6, rotateX: -2, rotateY: 2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <div className="absolute -inset-1 rounded-3xl opacity-30 blur-2xl" style={{ background: 'linear-gradient(120deg, rgba(0,255,247,0.15), rgba(162,89,255,0.15))' }} />
            {/* Sheen sweep */}
            <div className="pointer-events-none absolute inset-y-0 left-[-30%] w-1/3 -skew-x-12 bg-white/10 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
            <div className="relative flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5">
              <HoverAvatar />
              <div className="min-w-0 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold">About Me</h2>
                <p className="mt-2 text-white/70">
                  I’m Poorab, a full stack developer focused on building performant, scalable, and delightful web applications with modern tooling.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text + Skills */}
        <div>
          <p className="text-white/70">
            With experience across frontend and backend, I create seamless experiences from pixel to production. I love turning complex problems into elegant interfaces and resilient services.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {skills.map((s) => (
              <div
                key={s.group}
                className="glass rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(0,255,247,0.18)]"
              >
                <h3 className="text-sm font-semibold tracking-wide text-white/80">{s.group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 transition-transform duration-200 hover:-translate-y-0.5 hover:border-[color:var(--neon-cyan)]/30"
                      style={{ boxShadow: 'inset 0 0 12px rgba(255,255,255,0.03)' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
