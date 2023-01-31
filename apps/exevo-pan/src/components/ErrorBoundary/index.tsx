/* eslint-disable */
import { Component, ErrorInfo } from 'react'
import ErrorPage from 'modules/ErrorPage'
import { isDevelopment } from 'utils'
import { ErrorBoundaryProps, State } from './types'

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError() {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (isDevelopment()) {
      console.log(error)
      return
    }
    /* log.error('clientError', { error, errorInfo })
    localStorage.clear() */
    setTimeout(() => window.location.reload(), 3000)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen">
          <ErrorPage />
          <div className="-z-1 bg-primary fixed top-0 left-0 h-screen w-screen" />
        </div>
      )
    } else {
      return this.props.children as any
    }
  }
}

export default ErrorBoundary
