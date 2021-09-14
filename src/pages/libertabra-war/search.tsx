import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Main } from 'templates'
import { Header, SearchGrid } from 'modules/LibertabraWar'
import { GetStaticProps } from 'next'
import { buildUrl } from 'utils'
import { routes, endpoints, paths } from 'Constants'

const pageUrl = buildUrl(routes.LIBERTABRA_WAR_SEARCH)

export default function LibertabraWar(): JSX.Element {
  const { t } = useTranslation('war')

  return (
    <div>
      <Head>
        <title>{t('Meta.Search.title')}</title>
        <meta name="title" content={t('Meta.Search.title')} />
        <meta property="og:site_name" content={t('Meta.Search.title')} />
        <meta property="og:title" content={t('Meta.Search.title')} />
        <meta property="twitter:title" content={t('Meta.Search.title')} />

        <meta name="description" content={t('Meta.Search.description')} />
        <meta
          property="twitter:description"
          content={t('Meta.Search.description')}
        />
        <meta
          property="og:description"
          content={t('Meta.Search.description')}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.LIBERTABRA_WAR_SEARCH, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.LIBERTABRA_WAR_SEARCH, 'es')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <link
          rel="preload"
          href={`${endpoints.WAR_DATA}${paths.PUNE_DATA}`}
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${endpoints.WAR_DATA}${paths.BONES_DATA}`}
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>

      <Main>
        <main>
          <Header />
          <SearchGrid />
        </main>
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'war'])),
  },
})
