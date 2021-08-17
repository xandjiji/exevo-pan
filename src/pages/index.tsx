import Head from 'next/head'
import { Title, Description } from 'components/Meta'
import { Main } from 'templates'
import { CurrentAuctions as CurrentAuctionsGrid } from 'modules/BazaarAuctions'

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <Title content="Exevo Pan - Current Auctions" />
        <Description content="Filter and search for Tibia characters on the official Char Bazaar!" />
      </Head>

      <Main>
        <CurrentAuctionsGrid />
      </Main>
    </div>
  )
}
