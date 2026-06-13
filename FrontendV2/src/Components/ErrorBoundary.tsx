import { Component } from "react"
import type { ReactNode, ErrorInfo } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f0e17] flex items-center justify-center p-10">
          <div className="bg-red-900/80 text-white p-8 rounded-2xl max-w-2xl">
            <h1 className="text-3xl font-bold mb-4">Error en la aplicación</h1>
            <p className="text-lg mb-4">Ocurrió un error inesperado:</p>
            <pre className="bg-black/50 p-4 rounded-xl text-sm overflow-auto">
              {this.state.error?.message}
            </pre>
            <pre className="bg-black/50 p-4 rounded-xl text-sm overflow-auto mt-2">
              {this.state.error?.stack}
            </pre>
            <button
              className="mt-6 px-6 py-3 bg-white text-black rounded-xl font-bold cursor-pointer hover:bg-gray-200"
              onClick={() => window.location.reload()}
            >
              Recargar página
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
