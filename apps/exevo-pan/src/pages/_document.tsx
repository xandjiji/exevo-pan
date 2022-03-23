import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { google } from 'Constants'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/roboto-400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          <meta charSet="utf-8" />
          <meta name="robots" content="all" />
          <meta name="theme-color" content="#3F51B5" />
          <meta name="msapplication-navbutton-color" content="#3F51B5" />
          <link rel="icon" href="/favicon.ico" />

          <meta
            name="google-site-verification"
            content={google.SITE_VERIFICATION}
          />

          <script
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${google.ADSENSE_ID}`}
          />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${google.GTM_ID}`}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${google.GTM_ID}', { page_path: window.location.pathname });
            `,
            }}
          />
        </Head>
        <body>
          <script type="text/javascript" src="/loadTheme.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
