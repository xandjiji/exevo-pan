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

        <link rel="icon" href="/favicon.ico" />

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
          /* minified version of `public/loadTheme.js` */
          dangerouslySetInnerHTML={{
            __html:
              'function getInitialTheme(){if("undefined"!=typeof window){const e=window.localStorage.getItem("data-theme");if(e)return e;if(window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}return"light"}function injectCssVariables(e){const t="light"===e?"#3F51B5":"#8B63E3";document.documentElement.setAttribute("data-theme",e),document.getElementById("address-bar-1")?.setAttribute("content",t),document.getElementById("address-bar-2")?.setAttribute("content",t)}injectCssVariables(getInitialTheme());',
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
