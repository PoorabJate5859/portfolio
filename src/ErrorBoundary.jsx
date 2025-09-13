import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta && import.meta.env && import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('[ErrorBoundary] Caught error:', error, errorInfo)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="glass max-w-xl w-full rounded-2xl p-6 text-center">
            <h1 className="text-xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-white/70 mb-4">An unexpected error occurred. You can try reloading the page or continuing to browse.</p>
            {import.meta.env.DEV && this.state.error ? (
              <pre className="text-left whitespace-pre-wrap text-xs bg-white/5 rounded p-3 overflow-auto max-h-60 border border-white/10 mb-4">
                {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
              </pre>
            ) : null}
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={this.handleReload} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 hover:text-white">Reload</button>
              <button onClick={this.handleReset} className="rounded-full border border-[color:var(--neon-cyan)]/40 px-4 py-2 text-sm text-[color:var(--neon-cyan)] hover:text-white">Dismiss</button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
