import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Main } from 'templates'
import { Header, OverallGrid } from 'modules/Statistics'
import { ManageDataClient } from 'services'
import { GetStaticProps } from 'next'
import { buildUrl } from 'utils'
import { routes } from 'Constants'
import { common, statistics } from 'locales'

const pageUrl = buildUrl(routes.STATISTICS)

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

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.STATISTICS, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.STATISTICS, 'es')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
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
      translations: {
        common: common[locale as RegisteredLocale],
        statistics: statistics[locale as RegisteredLocale],
      },
      statisticsData,
    },
    revalidate: 3600,
  }
}
