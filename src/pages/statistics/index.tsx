import Head from 'next/head'
import { Title, Description } from 'components/Meta'
import { Main } from 'templates'
import { Header, OverallGrid } from 'modules/Statistics'

export default function Statistics(): JSX.Element {
  return (
    <div>
      <Head>
        <Title content="Exevo Pan - Overall Statistics" />
        <Description content="Statistics, trends and data analytics about daily and historic Tibia Char Bazaar stats" />
      </Head>

      <Main>
        <main>
          <Header />
          <OverallGrid />
        </main>
      </Main>
    </div>
  )
}
