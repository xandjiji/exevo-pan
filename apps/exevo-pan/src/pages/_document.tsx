/* eslint-disable react/no-danger */
import { Html, Head, Main, NextScript } from 'next/document'
import { google } from 'Constants'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="all" />
        <meta id="address-bar-1" name="theme-color" content="#3F51B5" />
        <meta
          id="address-bar-2"
          name="msapplication-navbutton-color"
          content="#3F51B5"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/favicon.ico" />

        <meta
          name="google-site-verification"
          content={google.SITE_VERIFICATION}
        />

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
      </Head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '!function(t){const e="light"===t?"#3F51B5":"#9857E7";document.documentElement.setAttribute("data-theme",t),document.getElementById("address-bar-1")?.setAttribute("content",e),document.getElementById("address-bar-2")?.setAttribute("content",e)}(function(){if("undefined"!=typeof window){const t=window.localStorage.getItem("data-theme");if(t)return t;if(window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}return"light"}());',
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
