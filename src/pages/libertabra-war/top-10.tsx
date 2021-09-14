import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Main } from 'templates'
import { Header, Top10Grid } from 'modules/LibertabraWar'
import { ManageDataClient } from 'services'
import { GetStaticProps } from 'next'
import { buildUrl } from 'utils'
import { routes } from 'Constants'

const pageUrl = buildUrl(routes.LIBERTABRA_WAR_TOP_10)

export default function LibertabraWar({
  warData,
}: {
  warData: WarStatistics
}): JSX.Element {
  const { t } = useTranslation('war')

  return (
    <div>
      <Head>
        <title>{t('Meta.Top10.title')}</title>
        <meta name="title" content={t('Meta.Top10.title')} />
        <meta property="og:site_name" content={t('Meta.Top10.title')} />
        <meta property="og:title" content={t('Meta.Top10.title')} />
        <meta property="twitter:title" content={t('Meta.Top10.title')} />

        <meta name="description" content={t('Meta.Top10.description')} />
        <meta
          property="twitter:description"
          content={t('Meta.Top10.description')}
        />
        <meta property="og:description" content={t('Meta.Top10.description')} />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.LIBERTABRA_WAR_TOP_10, 'pt')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      </Head>

      <Main>
        <main>
          <Header />
          <Top10Grid warData={warData} />
        </main>
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const warData = await ManageDataClient.fetchWarStatisticsData()

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'war'])),
      warData,
    },
    revalidate: 600,
  }
}
