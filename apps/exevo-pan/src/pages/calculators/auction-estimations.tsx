import Head from 'next/head'
import { AuctionEstimation, Template, useRoutes } from 'modules/Calculators'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslations } from 'contexts/useTranslation'
import SuggestedReading from 'components/SuggestedReading'
import { BlogClient, PreviewImageClient } from 'services'
import { buildPageTitle, buildUrl } from 'utils'
import { jsonld, routes } from 'Constants'
import { calculators, common } from 'locales'

const pageRoute = routes.AUCTION_ESTIMATION

type CalculatorProps = {
  suggestedPost?: BlogPost
}

export default function Calculator({ suggestedPost }: CalculatorProps) {
  const translations = useTranslations()
  const { locale } = useRouter()

  const pageName = translations.calculators.Meta.AuctionEstimation.title

  const pageTitle = buildPageTitle(pageName)

  const { getRoute } = useRoutes()
  const routeData = getRoute(pageRoute)

  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: routeData?.hero,
  })
  const pageUrl = buildUrl(pageRoute, locale)
  const defaultPageUrl = buildUrl(pageRoute)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.calculators.Meta.AuctionEstimation.description}
        />
        <meta
          property="twitter:description"
          content={translations.calculators.Meta.AuctionEstimation.description}
        />
        <meta
          property="og:description"
          content={translations.calculators.Meta.AuctionEstimation.description}
        />
        <meta property="og:type" content="website" />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={defaultPageUrl} />
        <link rel="alternate" hrefLang="pt" href={buildUrl(pageRoute, 'pt')} />
        <link rel="alternate" hrefLang="es" href={buildUrl(pageRoute, 'es')} />
        <link rel="alternate" hrefLang="pl" href={buildUrl(pageRoute, 'pl')} />
        <link rel="alternate" hrefLang="x-default" href={defaultPageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.webApplication({
              name: pageName,
              url: pageUrl,
              description:
                translations.calculators.Meta.AuctionEstimation.description,
            }),
          }}
        />
      </Head>

      <Template currentRoute={pageRoute}>
        <AuctionEstimation />
        {suggestedPost && (
          <SuggestedReading
            className="mx-auto mt-6 md:w-min md:whitespace-nowrap"
            thumbnail={suggestedPost.thumbnail}
            title={suggestedPost.title}
            slug={suggestedPost.slug}
          />
        )}
      </Template>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const suggestedPost = await BlogClient.getPostBySlug(
    '3-mistakes-bazaar',
    locale,
  )

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
