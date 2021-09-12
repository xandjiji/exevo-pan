import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation('statistics')

  return (
    <div>
      <Head>
        <title>{t('Meta.Statistics.title')}</title>
        <meta name="title" content={t('Meta.Statistics.title')} />
        <meta property="og:site_name" content={t('Meta.Statistics.title')} />
        <meta property="og:title" content={t('Meta.Statistics.title')} />
        <meta property="twitter:title" content={t('Meta.Statistics.title')} />

        <meta name="description" content={t('Meta.Statistics.description')} />
        <meta
          property="twitter:description"
          content={t('Meta.Statistics.description')}
        />
        <meta
          property="og:description"
          content={t('Meta.Statistics.description')}
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const statisticsData = await ManageDataClient.fetchStatisticsData()

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'statistics',
      ])),
      statisticsData,
    },
    revalidate: 3600,
  }
}
