import { useEffect, useRef } from 'react'

// Lightweight animated background: floating neon blobs rendered to canvas
// Progressive enhancement: respects prefers-reduced-motion and detaches on unmount
export default function BackgroundCanvas({ className = '' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })

    let width = 0
    let height = 0
    let time = 0

    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement || document.body
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = clientWidth
      height = clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement || document.body)

    const blobs = Array.from({ length: 3 }).map((_, i) => ({
      x: Math.random() * 1,
      y: Math.random() * 1,
      r: 200 + Math.random() * 180,
      hue: i === 0 ? 175 : i === 1 ? 270 : 200, // cyan / purple variants
      speed: 0.0006 + Math.random() * 0.0008,
      phase: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // subtle vignette background fill (very low alpha)
      const vignette = ctx.createRadialGradient(width / 2, height * 0.3, 0, width / 2, height * 0.3, Math.max(width, height))
      vignette.addColorStop(0, 'rgba(10,10,10,0.0)')
      vignette.addColorStop(1, 'rgba(10,10,10,0.35)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      blobs.forEach((b, idx) => {
        const px = (Math.sin(time * b.speed + b.phase) * 0.25 + 0.5) * width
        const py = (Math.cos(time * b.speed * 0.9 + b.phase) * 0.15 + 0.35) * height
        const grad = ctx.createRadialGradient(px, py, 0, px, py, b.r)
        const baseA = idx === 1 ? 0.10 : 0.12
        // cyan/purple glow
        grad.addColorStop(0, `hsla(${b.hue} 100% 60% / ${baseA})`)
        grad.addColorStop(1, 'hsla(0 0% 0% / 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, b.r, 0, Math.PI * 2)
        ctx.fill()
      })

      time += 16
      rafRef.current = requestAnimationFrame(draw)
    }

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
