/* eslint-disable */
import { Component } from 'react'
import ErrorPage from 'modules/ErrorPage'
import { isDevelopment } from 'utils'
import { NotifyErrorClient } from 'services/client'
import { ErrorBoundaryProps, State } from './types'

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    NotifyErrorClient.setMessage(error)
    console.log(error)
    return { hasError: true }
  }

  public componentDidCatch(): void {
    if (isDevelopment()) return
    localStorage.clear()
    setTimeout(() => window.location.reload(), 3000)
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="h-screen">
          <ErrorPage />
          <div className="-z-1 bg-primary fixed top-0 left-0 h-screen w-screen" />
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
