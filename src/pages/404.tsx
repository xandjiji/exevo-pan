import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Main } from 'templates'
import ErrorPage from 'modules/ErrorPage'
import { GetStaticProps } from 'next'
import { common, error } from 'locales'

export default function Custom404(): JSX.Element {
  const { t } = useTranslation('404')

  return (
    <div>
      <Head>
        <title>{t('Meta.title')}</title>
        <meta name="title" content={t('Meta.title')} />
        <meta property="og:site_name" content={t('Meta.title')} />
        <meta property="og:title" content={t('Meta.title')} />
        <meta property="twitter:title" content={t('Meta.title')} />

        <meta name="description" content={t('Meta.description')} />
        <meta property="twitter:description" content={t('Meta.description')} />
        <meta property="og:description" content={t('Meta.description')} />
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
    translations: {
      common: common[locale as RegisteredLocale],
      error: error[locale as RegisteredLocale],
    },
  },
})
