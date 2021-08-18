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
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="robots" content="all" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://static.tibia.com/" />
          <link rel="preconnect" href="https://exevopan-data.netlify.app/" />
          <link
            rel="preconnect"
            href="https://exevopan-history-data.netlify.app/"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,600,700"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />

          <link rel="canonical" href="https://exevopan.com/" />
          <meta property="og:url" content="https://exevopan.com/" />
          <meta property="twitter:url" content="https://exevopan.com/" />

          <meta property="og:image" content="/preview.png" />
          <meta property="twitter:image" content="/preview.png" />
          <meta property="twitter:card" content="summary_large_image" />

          <meta
            name="google-site-verification"
            content={google.SITE_VERIFICATION}
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
