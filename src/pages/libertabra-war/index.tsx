import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Main } from 'templates'
import { Header, OverallGrid } from 'modules/LibertabraWar'
import { ManageDataClient } from 'services'
import { GetStaticProps } from 'next'
import { buildUrl } from 'utils'
import { routes } from 'Constants'
import { common, war } from 'locales'

const pageUrl = buildUrl(routes.LIBERTABRA_WAR)

export default function LibertabraWar({
  warData,
}: {
  warData: WarStatistics
}): JSX.Element {
  const { t } = useTranslation('war')

  return (
    <div>
      <Head>
        <title>{t('Meta.Overall.title')}</title>
        <meta name="title" content={t('Meta.Overall.title')} />
        <meta property="og:site_name" content={t('Meta.Overall.title')} />
        <meta property="og:title" content={t('Meta.Overall.title')} />
        <meta property="twitter:title" content={t('Meta.Overall.title')} />

        <meta name="description" content={t('Meta.Overall.description')} />
        <meta
          property="twitter:description"
          content={t('Meta.Overall.description')}
        />
        <meta
          property="og:description"
          content={t('Meta.Overall.description')}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.LIBERTABRA_WAR, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.LIBERTABRA_WAR, 'es')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
      war: war[locale as RegisteredLocale],
    },
    warData: await ManageDataClient.fetchWarStatisticsData(),
  },
  revalidate: 60,
})
