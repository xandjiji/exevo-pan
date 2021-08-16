import Head from 'next/head'
import { Title, Description } from 'components/Meta'
import { Main } from 'templates'
import { BazaarHistory as BazaarHistoryGrid } from 'modules/BazaarAuctions'

export default function BazaarHistory(): JSX.Element {
  return (
    <div>
      <Head>
        <Title content="Exevo Pan - Bazaar History" />
        <Description content="Filter and search through all Tibia Char Bazaar historic data and statistics!" />
      </Head>

      <Main>
        <BazaarHistoryGrid />
      </Main>
    </div>
  )
}
