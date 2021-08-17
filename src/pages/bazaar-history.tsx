import Head from 'next/head'
import { Main } from 'templates'
import { BazaarHistory as BazaarHistoryGrid } from 'modules/BazaarAuctions'

export default function BazaarHistory(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Exevo Pan - Bazaar History</title>
        <meta name="title" content="Exevo Pan - Bazaar History" />
        <meta property="og:site_name" content="Exevo Pan - Bazaar History" />
        <meta property="og:title" content="Exevo Pan - Bazaar History" />
        <meta property="twitter:title" content="Exevo Pan - Bazaar History" />

        <meta
          name="description"
          content="Filter and search through all Tibia Char Bazaar historic data and statistics!"
        />
        <meta
          property="twitter:description"
          content="Filter and search through all Tibia Char Bazaar historic data and statistics!"
        />
        <meta
          property="og:description"
          content="Filter and search through all Tibia Char Bazaar historic data and statistics!"
        />
        <meta property="og:type" content="website" />
      </Head>

      <Main>
        <BazaarHistoryGrid />
      </Main>
    </div>
  )
}
