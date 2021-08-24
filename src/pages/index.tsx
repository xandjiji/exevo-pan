import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { Main } from 'templates'
import { CurrentAuctions as CurrentAuctionsGrid } from 'modules/BazaarAuctions'
import { GetStaticProps } from 'next'
import { endpoints, paths } from 'Constants'

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Exevo Pan - Current Auctions</title>
        <meta name="title" content="Exevo Pan - Current Auctions" />
        <meta property="og:site_name" content="Exevo Pan - Current Auctions" />
        <meta property="og:title" content="Exevo Pan - Current Auctions" />
        <meta property="twitter:title" content="Exevo Pan - Current Auctions" />

        <meta
          name="description"
          content="Filter and search for Tibia characters on the official Char Bazaar!"
        />
        <meta
          property="twitter:description"
          content="Filter and search for Tibia characters on the official Char Bazaar!"
        />
        <meta
          property="og:description"
          content="Filter and search for Tibia characters on the official Char Bazaar!"
        />
        <meta property="og:type" content="website" />

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
        <CurrentAuctionsGrid />
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
})
