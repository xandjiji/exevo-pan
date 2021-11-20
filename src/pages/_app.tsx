import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ErrorBoundary from 'components/ErrorBoundary'
import { TranslationsProvider } from 'contexts/useTranslation'
import { ThemeProvider } from 'contexts/useTheme'
import { GlobalStyles } from 'styles'
import { AppProps } from 'next/app'
import { google } from 'Constants'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { translations } = pageProps
  const router = useRouter()

  const handleRouteChange = (url: string) => {
    ;(window as WindowObject).gtag('config', google.GTM_ID, {
      page_path: url,
    })
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <TranslationsProvider value={{ translations }}>
        <ErrorBoundary>
          <ThemeProvider>
            <Component {...pageProps} />
            <GlobalStyles />
          </ThemeProvider>
        </ErrorBoundary>
      </TranslationsProvider>
    </>
  )
}
export default MyApp
