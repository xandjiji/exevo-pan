import Head from 'next/head'
import { Main } from 'templates'
import AdvertiseGrid from 'modules/Advertise'
import { GetStaticProps } from 'next'
import { buildUrl } from 'utils'
import { endpoints, paths, routes } from 'Constants'
import { common, homepage } from 'locales'

const pageUrl = buildUrl(routes.ADVERTISE)

export default function Advertise(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Exevo Pan - Advertise</title>
        <meta name="title" content="Exevo Pan - Advertise" />
        <meta property="og:site_name" content="Exevo Pan - Advertise" />
        <meta property="og:title" content="Exevo Pan - Advertise" />
        <meta property="twitter:title" content="Exevo Pan - Advertise" />

        <meta
          name="description"
          content="Highlight your own auction and get higher bids!"
        />
        <meta
          property="twitter:description"
          content="Highlight your own auction and get higher bids!"
        />
        <meta
          property="og:description"
          content="Highlight your own auction and get higher bids!"
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.ADVERTISE, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.ADVERTISE, 'es')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <link
          rel="preload"
          href={`${endpoints.BASE_DATA}${paths.CHARACTER_DATA}`}
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${endpoints.BASE_DATA}${paths.SERVER_DATA}`}
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${endpoints.BASE_DATA}${paths.ITEMS_DATA}`}
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>

      <Main>
        <AdvertiseGrid />
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
      homepage: homepage[locale as RegisteredLocale],
    },
  },
})
