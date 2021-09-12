import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Main } from 'templates'
import { Header, SearchGrid } from 'modules/LibertabraWar'
import { endpoints, paths } from 'Constants'
import { GetStaticProps } from 'next'

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
  revalidate: 600,
})
