import Head from 'next/head'
import { Main, Hero } from 'templates'
import { Header, ImbuementsCost, pages } from 'modules/Calculators'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { PreviewImageClient } from 'services'
import { buildUrl, buildPageTitle, loadRawSrc } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, calculators } from 'locales'

const pageUrl = buildUrl(routes.IMBUEMENTS_COST)
const { hero } = pages.ImbuementsCost

export default function Calculator() {
  const { translations } = useTranslations()

  const pageName = translations.calculators.Meta.ImbuementsCost.title

  const pageTitle = buildPageTitle(pageName)

  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: loadRawSrc(hero),
  })

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.calculators.Meta.ImbuementsCost.description}
        />
        <meta
          property="twitter:description"
          content={translations.calculators.Meta.ImbuementsCost.description}
        />
        <meta
          property="og:description"
          content={translations.calculators.Meta.ImbuementsCost.description}
        />
        <meta property="og:type" content="website" />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.IMBUEMENTS_COST, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.IMBUEMENTS_COST, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.IMBUEMENTS_COST, 'pl')}
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
        <Header />
        <Hero title={pageName} src={hero} offset />
        <ImbuementsCost />
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
