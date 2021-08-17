import Head from 'next/head'
import { Title, Description } from 'components/Meta'
import { Main } from 'templates'
import { Header, OverallGrid } from 'modules/Statistics'
import { ManageDataClient } from 'services'
import { GetStaticProps } from 'next'

export default function Statistics({
  statisticsData,
}: {
  statisticsData: StatisticsData
}): JSX.Element {
  return (
    <div>
      <Head>
        <Title content="Exevo Pan - Overall Statistics" />
        <Description content="Statistics, trends and data analytics about daily and historic Tibia Char Bazaar stats" />
      </Head>

      <Main>
        <main>
          <Header />
          <OverallGrid statisticsData={statisticsData} />
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
