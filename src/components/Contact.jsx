import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Contact() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.name?.value || '').trim()
    const fromEmail = (form.email?.value || '').trim()
    const phone = (form.phone?.value || '').trim()
    const message = (form.message?.value || '').trim()

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS env vars missing. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY')
      alert('Email service is not configured. Please try again later.')
      return
    }

    const templateParams = {
      from_name: name || 'Visitor',
      from_email: fromEmail,
      phone,
      message,
      subject: `Portfolio Contact from ${name || 'Visitor'}`,
      to_email: 'jatepoorab@gmail.com',
    }

    try {
      setLoading(true)
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      setSent(true)
      form.reset()
    } catch (err) {
      console.error('Failed to send message via EmailJS:', err)
      alert('Failed to send message. Please try again later.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!sent) return
    const t = setTimeout(() => setSent(false), 2600)
    return () => clearTimeout(t)
  }, [sent])
  return (
    <section ref={sectionRef} id="contact" className="mx-auto max-w-7xl px-4 py-24">
      {/* Success toast */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
            role="status"
            aria-live="polite"
          >
            <div className="glass rounded-full border border-white/10 px-4 py-2 text-sm text-white shadow-neon">
              Message sent successfully! I’ll reply soon.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-2 self-center">
          <h2 id="contact-title" className="text-2xl font-semibold">Let’s build something great</h2>
          <p className="mt-3 text-white/70">
            Have an idea, role, or collaboration in mind? Drop a message — I’ll get back within 24–48 hours.
          </p>
          <div className="mt-6 space-y-2 text-sm text-white/70">
            <p><span className="text-white/90">Email:</span> jatepoorab@gmail.com</p>
            <div className="flex items-center gap-3 pt-2">
              <motion.a
                href="https://github.com/poorabjate5859"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/0 text-white/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--neon-cyan)]/40 hover:text-white hover:bg-[color:var(--neon-cyan)]/15 hover:border-[color:var(--neon-cyan)]/30"
                title="GitHub"
              >
                <span className="absolute inset-0 rounded-full opacity-0 transition group-hover:opacity-100" style={{ boxShadow: 'inset 0 0 12px rgba(255,255,255,0.06), 0 0 24px rgba(0,255,247,0.15)' }} />
                {/* GitHub icon */}
                <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.486 2 12.017c0 4.426 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.865-.014-1.697-2.782.605-3.369-1.342-3.369-1.342-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.532 2.341 1.089 2.91.833.091-.647.35-1.089.636-1.34-2.221-.253-4.556-1.114-4.556-4.957 0-1.095.39-1.99 1.029-2.692-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.748-1.026 2.748-1.026.545 1.378.202 2.397.1 2.65.64.702 1.027 1.597 1.027 2.692 0 3.852-2.338 4.701-4.566 4.949.359.31.678.92.678 1.855 0 1.338-.012 2.417-.012 2.745 0 .268.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.486 17.523 2 12 2Z" clipRule="evenodd" />
                </svg>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/poorab-jate/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/0 text-white/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--neon-cyan)]/40 hover:text-white hover:bg-[color:var(--neon-cyan)]/15 hover:border-[color:var(--neon-cyan)]/30"
                title="LinkedIn"
              >
                <span className="absolute inset-0 rounded-full opacity-0 transition group-hover:opacity-100" style={{ boxShadow: 'inset 0 0 12px rgba(255,255,255,0.06), 0 0 24px rgba(0,255,247,0.15)' }} />
                {/* LinkedIn icon */}
                <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="currentColor" aria-hidden>
                  <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5ZM.5 8h4V23h-4V8Zm7.5 0h3.84v2.051h.054c.536-1.016 1.846-2.086 3.8-2.086 4.065 0 4.806 2.677 4.806 6.158V23h-3.999v-6.62c0-1.579-.028-3.61-2.201-3.61-2.205 0-2.542 1.72-2.542 3.5V23H8V8Z" />
                </svg>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/poorab_jate32/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/0 text-white/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--neon-cyan)]/40 hover:text-white hover:bg-[color:var(--neon-cyan)]/15 hover:border-[color:var(--neon-cyan)]/30"
                title="Instagram"
              >
                <span className="absolute inset-0 rounded-full opacity-0 transition group-hover:opacity-100" style={{ boxShadow: 'inset 0 0 12px rgba(255,255,255,0.06), 0 0 24px rgba(0,255,247,0.15)' }} />
                {/* Instagram icon */}
                <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="currentColor" aria-hidden>
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <form className="glass rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-0.5" onSubmit={onSubmit} aria-labelledby="contact-title">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm text-white/80">Name</label>
                <input id="name" name="name" type="text" required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[color:var(--neon-cyan)]/50 focus:border-[color:var(--neon-cyan)]/40 transition" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-white/80">Email</label>
                <input id="email" name="email" type="email" required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[color:var(--neon-cyan)]/50 focus:border-[color:var(--neon-cyan)]/40 transition" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm text-white/80">Mobile Number</label>
                <input id="phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel" pattern="^\\+?91[\\s-]?[0-9]{10}$" title="Use Indian format: +91 9876543210" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[color:var(--neon-cyan)]/50 focus:border-[color:var(--neon-cyan)]/40 transition" placeholder="+91 98765 43210" />
              </div>
              
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="mb-1 block text-sm text-white/80">Message</label>
              <textarea id="message" name="message" rows={5} required className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[color:var(--neon-cyan)]/50 focus:border-[color:var(--neon-cyan)]/40 transition" placeholder="Tell me about your project..." />
            </div>
            <div className="mt-6">
              <motion.button
                type="submit"
                disabled={loading}
                className="group relative inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white shadow-neon disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <span className="absolute inset-0 rounded-full opacity-0 blur-sm transition group-hover:opacity-100" style={{ background: 'linear-gradient(90deg, rgba(0,255,247,0.25), rgba(162,89,255,0.25))' }} />
                <span className="relative">{loading ? 'Sending…' : 'Send Message'}</span>
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
