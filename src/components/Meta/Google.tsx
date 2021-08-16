import { google } from 'Constants'
const Google = () => (
  <>
    <meta name="google-site-verification" content={google.SITE_VERIFICATION} />

    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${google.GTM_ID}`}
    />
    <script
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
