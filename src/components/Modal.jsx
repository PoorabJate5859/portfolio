import { useEffect, useRef } from 'react'

export default function Modal({ open, onClose, title, children, actions }) {
  const dialogRef = useRef(null)
  const lastFocusedRef = useRef(null)

  // Close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Focus trap
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      lastFocusedRef.current = document.activeElement
      // Focus first focusable element
      const focusable = dialog.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      ;(focusable || dialog).focus()
    } else if (lastFocusedRef.current) {
      lastFocusedRef.current.focus()
    }
  }, [open])

  // Prevent background scroll when open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      <div
        ref={dialogRef}
        className="glass relative m-4 w-full max-w-2xl rounded-3xl p-6 outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id="modal-title" className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="mt-4 text-white/80">
          {children}
        </div>
        {actions ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {actions}
          </div>
        ) : null}
      </div>
    </div>
  )
}
