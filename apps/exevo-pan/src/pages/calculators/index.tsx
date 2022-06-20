import Head from 'next/head'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, calculators } from 'locales'

const pageUrl = buildUrl(routes.CALCULATORS)

export default function Statistics() {
  const { translations } = useTranslations()

  return (
    <>
      <Head>
        <title>{translations.calculators.Meta.Calculators.title}</title>
        <meta
          name="title"
          content={translations.calculators.Meta.Calculators.title}
        />
        <meta
          property="og:title"
          content={translations.calculators.Meta.Calculators.title}
        />
        <meta
          property="twitter:title"
          content={translations.calculators.Meta.Calculators.title}
        />

        <meta
          name="description"
          content={translations.calculators.Meta.Calculators.description}
        />
        <meta
          property="twitter:description"
          content={translations.calculators.Meta.Calculators.description}
        />
        <meta
          property="og:description"
          content={translations.calculators.Meta.Calculators.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.CALCULATORS, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.CALCULATORS, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.CALCULATORS, 'pl')}
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
        <main>content</main>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
      calculators: calculators[locale as RegisteredLocale],
    },
  },
})
