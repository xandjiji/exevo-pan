import Head from 'next/head'
import { Main } from 'templates'
import ErrorPage from 'modules/ErrorPage'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { common, error } from 'locales'

export default function Custom404(): JSX.Element {
  const { translations } = useTranslations()

  return (
    <div>
      <Head>
        <title>{translations.error.Meta.title}</title>
        <meta name="title" content={translations.error.Meta.title} />
        <meta property="og:site_name" content={translations.error.Meta.title} />
        <meta property="og:title" content={translations.error.Meta.title} />
        <meta
          property="twitter:title"
          content={translations.error.Meta.title}
        />

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
