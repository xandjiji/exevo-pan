import Head from 'next/head'
import { Main } from 'templates'
import ErrorPage from 'modules/ErrorPage'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildPageTitle } from 'utils'
import { common, error } from 'locales'

export default function Custom404() {
  const translations = useTranslations()

  const pageTitle = buildPageTitle(translations.error.Meta.title)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.error.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.error.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.error.Meta.description}
        />
        <meta property="og:type" content="website" />
      </Head>

      <Main>
        <ErrorPage />
      </Main>
    </>
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
