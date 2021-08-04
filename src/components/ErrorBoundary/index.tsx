import { Component } from 'react'
import ErrorPage from '../ErrorPage'
import { ErrorBoundaryProps, State } from './types'

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(): void {
    localStorage.clear()
    setTimeout(() => window.location.reload(), 3000)
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorPage
          mainMessage="ERROR"
          paragraphs={[
            'oops! something unexpected happened',
            'lets try again...',
          ]}
        />
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
