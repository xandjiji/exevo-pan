import Head from 'next/head'
import { Main } from 'templates'
import { CurrentAuctions as CurrentAuctionsGrid } from 'modules/BazaarAuctions'

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
      </Head>

      <Main>
        <CurrentAuctionsGrid />
      </Main>
    </div>
  )
}
