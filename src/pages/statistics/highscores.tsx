import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
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
        <title>Exevo Pan - Highscores</title>
        <meta name="title" content="Exevo Pan - Highscores" />
        <meta property="og:site_name" content="Exevo Pan - Highscores" />
        <meta property="og:title" content="Exevo Pan - Highscores" />
        <meta property="twitter:title" content="Exevo Pan - Highscores" />

        <meta
          name="description"
          content="See rankings for the highest bids, top levels and best skills on Tibia Char Bazaar!"
        />
        <meta
          property="twitter:description"
          content="See rankings for the highest bids, top levels and best skills on Tibia Char Bazaar!"
        />
        <meta
          property="og:description"
          content="See rankings for the highest bids, top levels and best skills on Tibia Char Bazaar!"
        />
        <meta property="og:type" content="website" />
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const statisticsData = await ManageDataClient.fetchStatisticsData()

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      statisticsData,
    },
  }
}
