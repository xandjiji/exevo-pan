import Head from 'next/head'
import { Stamina, Template, useRoutes } from 'modules/Calculators'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { PreviewImageClient } from 'services'
import { buildPageTitle, buildUrl } from 'utils'
import { jsonld, routes } from 'Constants'
import { calculators, common } from 'locales'

const pageRoute = routes.STAMINA
const pageUrl = buildUrl(pageRoute)

export default function Calculator() {
  const translations = useTranslations()

  const pageName = translations.calculators.Meta.Stamina.title

  const pageTitle = buildPageTitle(pageName)

  const { getRoute } = useRoutes()
  const routeData = getRoute(pageRoute)

  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: routeData?.hero,
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
          content={translations.calculators.Meta.Stamina.description}
        />
        <meta
          property="twitter:description"
          content={translations.calculators.Meta.Stamina.description}
        />
        <meta
          property="og:description"
          content={translations.calculators.Meta.Stamina.description}
        />
        <meta property="og:type" content="website" />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link rel="alternate" hrefLang="pt" href={buildUrl(pageRoute, 'pt')} />
        <link rel="alternate" hrefLang="es" href={buildUrl(pageRoute, 'es')} />
        <link rel="alternate" hrefLang="pl" href={buildUrl(pageRoute, 'pl')} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Template
        currentRoute={pageRoute}
        className="md:child:shrink-0 grid items-start justify-center gap-6 md:flex"
      >
        <Stamina />
      </Template>
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
