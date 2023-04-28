import Head from 'next/head'
import { Template, CharmDamage, useRoutes } from 'modules/Calculators'
import SuggestedReading from 'components/SuggestedReading'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { BlogClient, PreviewImageClient } from 'services'
import { buildUrl, buildPageTitle, loadRawSrc } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, calculators } from 'locales'

const pageRoute = routes.CHARM_DAMAGE
const pageUrl = buildUrl(pageRoute)

type CalculatorProps = {
  suggestedPost: BlogPost
}

export default function Calculator({ suggestedPost }: CalculatorProps) {
  const { translations } = useTranslations()

  const pageName = translations.calculators.Meta.CharmDamage.title

  const pageTitle = buildPageTitle(pageName)

  const { getRoute } = useRoutes()
  const routeData = getRoute(pageRoute)

  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: routeData ? loadRawSrc(routeData.hero) : undefined,
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
          content={translations.calculators.Meta.CharmDamage.description}
        />
        <meta
          property="twitter:description"
          content={translations.calculators.Meta.CharmDamage.description}
        />
        <meta
          property="og:description"
          content={translations.calculators.Meta.CharmDamage.description}
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
        className="child:max-w-fit child:mx-auto grid gap-8"
      >
        <CharmDamage />

        <SuggestedReading
          thumbnail={suggestedPost.thumbnail}
          title={suggestedPost.title}
          slug={suggestedPost.slug}
        />
      </Template>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const suggestedPost = await BlogClient.getPostBySlug('best-charms', locale)

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        calculators: calculators[locale as RegisteredLocale],
      },
      suggestedPost,
    },
  }
}
