import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Main } from 'templates'
import ErrorPage from 'modules/ErrorPage'
import { GetStaticProps } from 'next'

export default function Custom404(): JSX.Element {
  const { t } = useTranslation()

  return (
    <div>
      <Head>
        <title>{t('ErrorPage.Meta.title')}</title>
        <meta name="title" content={t('ErrorPage.Meta.title')} />
        <meta property="og:site_name" content={t('ErrorPage.Meta.title')} />
        <meta property="og:title" content={t('ErrorPage.Meta.title')} />
        <meta property="twitter:title" content={t('ErrorPage.Meta.title')} />

        <meta name="description" content={t('ErrorPage.Meta.description')} />
        <meta
          property="twitter:description"
          content={t('ErrorPage.Meta.description')}
        />
        <meta
          property="og:description"
          content={t('ErrorPage.Meta.description')}
        />
        <meta property="og:type" content="website" />
      </Head>

      <Main>
        <ErrorPage />
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
})
