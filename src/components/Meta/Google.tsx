import { google } from 'Constants'

const Google = (): JSX.Element => (
  <>
    <meta name="google-site-verification" content={google.SITE_VERIFICATION} />

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
  </>
)

export default Google
