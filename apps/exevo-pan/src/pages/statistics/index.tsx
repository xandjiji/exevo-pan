import Head from 'next/head'
import { Main } from 'templates'
import { Header, OverallGrid } from 'modules/Statistics'
import { OverallData } from 'modules/Statistics/components/OverallGrid/types'
import { HistoryStatisticsClient } from 'services/server'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl, buildPageTitle } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, statistics } from 'locales'

const pageUrl = buildUrl(routes.STATISTICS)

export default function Statistics({
  overallData,
}: {
  overallData: OverallData
}) {
  const { translations } = useTranslations()

  const pageTitle = buildPageTitle(
    translations.statistics.Meta.Statistics.title,
  )

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.statistics.Meta.Statistics.description}
        />
        <meta
          property="twitter:description"
          content={translations.statistics.Meta.Statistics.description}
        />
        <meta
          property="og:description"
          content={translations.statistics.Meta.Statistics.description}
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
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.STATISTICS, 'pl')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Main>
        <main>
          <Header />
          <OverallGrid overallData={overallData} />
        </main>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { totalRevenue, totalTibiaCoins, successRate, vocationPercentage } =
    await HistoryStatisticsClient.fetchStatisticsData()

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        statistics: statistics[locale as RegisteredLocale],
      },
      overallData: {
        totalRevenue,
        totalTibiaCoins,
        successRate,
        vocationPercentage,
      },
    },
  }
}
