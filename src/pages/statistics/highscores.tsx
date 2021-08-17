import Head from 'next/head'
import { Title, Description } from 'components/Meta'
import { Main } from 'templates'
import { Header, HighscoresGrid } from 'modules/Statistics'
import { ManageDataClient } from 'services'
import { GetStaticProps } from 'next'

export default function Highscores({
  statisticsData,
}: {
  statisticsData: StatisticsData
}): JSX.Element {
  return (
    <div>
      <Head>
        <Title content="Exevo Pan - Highscores" />
        <Description content="See rankings for the highest bids, top levels and best skills on Tibia Char Bazaar!" />
      </Head>

      <Main>
        <main>
          <Header />
          <HighscoresGrid statisticsData={statisticsData} />
        </main>
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const statisticsData = await ManageDataClient.fetchStatisticsData()

  return {
    props: { statisticsData },
  }
}
