import Head from 'next/head'
import { Title } from 'components/Meta'
import { Main } from 'templates'
import { CurrentAuctions as CurrentAuctionsGrid } from 'modules/BazaarAuctions'

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <Title content="Exevo Pan - Current Auctions" />
      </Head>

      <Main>
        <CurrentAuctionsGrid />
      </Main>
    </div>
  )
}
