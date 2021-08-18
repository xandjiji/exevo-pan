import Head from 'next/head'
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
        <title>Exevo Pan - Overall Statistics</title>
        <meta name="title" content="Exevo Pan - Overall Statistics" />
        <meta
          property="og:site_name"
          content="Exevo Pan - Overall Statistics"
        />
        <meta property="og:title" content="Exevo Pan - Overall Statistics" />
        <meta
          property="twitter:title"
          content="Exevo Pan - Overall Statistics"
        />

        <meta
          name="description"
          content="Statistics, trends and data analytics about daily and historic Tibia Char Bazaar stats"
        />
        <meta
          property="twitter:description"
          content="Statistics, trends and data analytics about daily and historic Tibia Char Bazaar stats"
        />
        <meta
          property="og:description"
          content="Statistics, trends and data analytics about daily and historic Tibia Char Bazaar stats"
        />
        <meta property="og:type" content="website" />
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
