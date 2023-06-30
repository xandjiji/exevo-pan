/* eslint-disable react/no-danger */
import { Head, Html, Main, NextScript } from 'next/document'

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
      </Head>
      <body>
        <script
          /* minified version of `public/loadTheme.js` */
          dangerouslySetInnerHTML={{
            __html:
              'function getInitialTheme(){if("undefined"!=typeof window){const e=window.localStorage.getItem("data-theme");if(e)return e;if(window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}return"light"}function injectCssVariables(e){const t="light"===e?"#3F51B5":"#8B63E3";document.documentElement.setAttribute("data-theme",e),document.getElementById("address-bar-1")?.setAttribute("content",t),document.getElementById("address-bar-2")?.setAttribute("content",t)}injectCssVariables(getInitialTheme());',
          }}
        />
        <script
          data-cfasync="false"
          type="text/javascript"
          id="clever-core"
          dangerouslySetInnerHTML={{
            __html: `/* <![CDATA[ */
                                    (function (document, window) {
                                        var a, c = document.createElement("script"), f = window.frameElement;

                                        c.id = "CleverCoreLoader70802";
                                        c.src = "https://scripts.cleverwebserver.com/766d56588bb3504688e266dcc4c359cd.js";

                                        c.async = !0;
                                        c.type = "text/javascript";
                                        c.setAttribute("data-target", window.name || (f && f.getAttribute("id")));
                                        c.setAttribute("data-callback", "put-your-callback-function-here");
                                        c.setAttribute("data-callback-url-click", "put-your-click-macro-here");
                                        c.setAttribute("data-callback-url-view", "put-your-view-macro-here");

                                        try {
                                            a = parent.document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
                                        } catch (e) {
                                            a = !1;
                                        }

                                        a || (a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
                                        a.parentNode.insertBefore(c, a);
                                    })(document, window);
                                    /* ]]> */`,
          }}
        />

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
