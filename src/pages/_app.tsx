import ErrorBoundary from 'components/ErrorBoundary'
import { ThemeProvider } from 'contexts/useTheme'
import { DatabaseProvider } from 'contexts/useDatabase'
import { GlobalStyles } from 'styles'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <DatabaseProvider>
          <Component {...pageProps} />
          <GlobalStyles />
        </DatabaseProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
export default MyApp
