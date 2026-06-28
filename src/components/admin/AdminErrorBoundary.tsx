import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  title?: string
}

interface State {
  hasError: boolean
  message: string
}

export class AdminErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Admin page error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-sm border border-red-200 bg-red-50 p-6">
          <h2 className="font-display font-bold text-lg text-red-800 uppercase mb-2">
            {this.props.title ?? 'Something went wrong'}
          </h2>
          <p className="text-red-700 text-sm mb-4">{this.state.message}</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, message: '' })}
            className="px-4 py-2 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-light transition-colors"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
