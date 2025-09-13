import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 backdrop-blur transition-all duration-300 hover:text-white hover:bg-white/20 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-[color:var(--neon-cyan)]/40 shadow-[0_0_24px_rgba(0,255,247,0.15)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
    >
      {/* Up Arrow Icon */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
        <path d="M12 5.5a1 1 0 0 1 .7.29l6 6a1 1 0 1 1-1.4 1.42L13 9.41V18a1 1 0 1 1-2 0V9.41l-4.3 4.3a1 1 0 0 1-1.4-1.42l6-6A1 1 0 0 1 12 5.5Z" />
      </svg>
    </button>
  )
}
