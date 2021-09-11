import Head from 'next/head'
import { Main } from 'templates'
import { Header, OverallGrid } from 'modules/LibertabraWar'
import { ManageDataClient } from 'services'
import { GetStaticProps } from 'next'

export default function LibertabraWar({
  warData,
}: {
  warData: WarStatistics
}): JSX.Element {
  return (
    <div>
      <Head>
        <title>Exevo Pan - Libertabra War</title>
        <meta name="title" content="Exevo Pan - Libertabra War" />
        <meta property="og:site_name" content="Exevo Pan - Libertabra War" />
        <meta property="og:title" content="Exevo Pan - Libertabra War" />
        <meta property="twitter:title" content="Exevo Pan - Libertabra War" />

        <meta
          name="description"
          content="Follow live data and statistics from Libertabra War!"
        />
        <meta
          property="twitter:description"
          content="Follow live data and statistics from Libertabra War!"
        />
        <meta
          property="og:description"
          content="Follow live data and statistics from Libertabra War!"
        />
        <meta property="og:type" content="website" />
      </Head>

      <Main>
        <main>
          <Header />
          <OverallGrid warData={warData} />
        </main>
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const warData = await ManageDataClient.fetchWarStatisticsData()

  return {
    props: { warData },
    revalidate: 600,
  }
}
