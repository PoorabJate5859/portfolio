import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

// Dev-only: filter noisy errors from browser extensions so your console stays clean.
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (e) => {
    try {
      const reason = e.reason || {}
      const text = String(reason?.stack || reason?.message || reason)
      // Ignore common extension noise
      if (text.toLowerCase().includes('auth required') || text.includes('content.bundle.js')) {
        return
      }
      // eslint-disable-next-line no-console
      console.error('[UnhandledRejection]', reason)
    } catch (_) {}
  })

  window.addEventListener('error', (e) => {
    try {
      const src = e?.filename || ''
      const msg = String(e?.message || '')
      if (src.includes('content.bundle.js') || msg.toLowerCase().includes('auth required')) {
        // ignore extension-originated errors in dev
        e.preventDefault()
        return false
      }
    } catch (_) {}
    return undefined
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
