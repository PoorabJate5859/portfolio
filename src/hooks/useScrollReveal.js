import { useEffect } from 'react'

// Scroll-trigger animations for headings, paragraphs, and images.
// Runs once per element when it enters the viewport.
export default function useScrollReveal(sectionRef) {
  useEffect(() => {
    const el = sectionRef?.current
    if (!el) return

    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const userReduced = typeof window !== 'undefined' &&
      window.localStorage && window.localStorage.getItem('reduceMotion') === 'true'
    if (prefersReduced || userReduced) return

    let ctx
    ;(async () => {
      try {
        const gsapMod = await import('gsap')
        const stMod = await import('gsap/ScrollTrigger')
        const gsap = gsapMod.gsap || gsapMod.default || gsapMod
        const ScrollTrigger = stMod.ScrollTrigger || stMod.default
        gsap.registerPlugin(ScrollTrigger)

        const headings = el.querySelectorAll('h2, h3')
        const paras = el.querySelectorAll('p')
        const imgs = el.querySelectorAll('img')

        ctx = gsap.context(() => {
          headings.forEach((node) => {
            ScrollTrigger.create({
              trigger: node,
              start: 'top 85%',
              once: true,
              onEnter: () => {
                gsap.fromTo(node,
                  { opacity: 0, y: -24 },
                  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'opacity,transform' }
                )
              },
            })
          })

          gsap.utils.toArray(paras).forEach((node, i) => {
            ScrollTrigger.create({
              trigger: node,
              start: 'top 85%',
              once: true,
              onEnter: () => {
                gsap.fromTo(node,
                  { opacity: 0, x: -24 },
                  { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out', delay: (i % 5) * 0.2, clearProps: 'opacity,transform' }
                )
              },
            })
          })

          imgs.forEach((node) => {
            ScrollTrigger.create({
              trigger: node,
              start: 'top 85%',
              once: true,
              onEnter: () => {
                gsap.fromTo(node,
                  { opacity: 0, scale: 0.9 },
                  { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', clearProps: 'opacity,transform' }
                )
              },
            })
          })
        }, el)
      } catch (_) {}
    })()

    return () => { try { if (ctx) ctx.revert() } catch (_) {} }
  }, [sectionRef])
}
