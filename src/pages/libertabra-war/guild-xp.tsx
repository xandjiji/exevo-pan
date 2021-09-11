import Head from 'next/head'
import { Main } from 'templates'
import { Header, GuildXPGrid } from 'modules/LibertabraWar'
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
        <title>Exevo Pan - Libertabra War Guild XP</title>
        <meta name="title" content="Exevo Pan - Libertabra War Guild XP" />
        <meta
          property="og:site_name"
          content="Exevo Pan - Libertabra War Guild XP"
        />
        <meta
          property="og:title"
          content="Exevo Pan - Libertabra War Guild XP"
        />
        <meta
          property="twitter:title"
          content="Exevo Pan - Libertabra War Guild XP"
        />

        <meta
          name="description"
          content="Compare daily guild XP differences from Libertabra War!"
        />
        <meta
          property="twitter:description"
          content="Compare daily guild XP differences from Libertabra War!"
        />
        <meta
          property="og:description"
          content="Compare daily guild XP differences from Libertabra War!"
        />
        <meta property="og:type" content="website" />
      </Head>

      <Main>
        <main>
          <Header />
          <GuildXPGrid warData={warData} />
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
