/* eslint-disable */
import { Component } from 'react'
import ErrorPage from 'modules/ErrorPage'
import * as S from './styles'
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
        <S.Wrapper>
          <ErrorPage />
          <S.Background />
        </S.Wrapper>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
