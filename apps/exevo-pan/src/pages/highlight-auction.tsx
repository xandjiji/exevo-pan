import Head from 'next/head'
import { Main } from 'templates'
import { FormProvider, Form } from 'modules/Advertise'
import { AuctionsProvider } from 'modules/Advertise/contexts/useAuctions'
import SuggestedReading from 'components/SuggestedReading'
import { BlogClient, PreviewImageClient } from 'services'
import { AuctionsClient } from 'services/server'
import { useSession } from 'next-auth/react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl, buildPageTitle, pluckTCInvested } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, advertise } from 'locales'

type AdvertiseStaticProps = {
  initialAuctionData: PaginatedData<CharacterObject>
  suggestedPost: BlogPost
}

export default function Advertise({
  initialAuctionData,
  suggestedPost,
}: AdvertiseStaticProps) {
  const translations = useTranslations()
  const { locale } = useRouter()

  const pageName = translations.advertise.Meta.title
  const previewSrc = PreviewImageClient.getSrc({
    title: `${pageName} ✨`,
  })
  const pageUrl = buildUrl(routes.ADVERTISE, locale)
  const defaultPageUrl = buildUrl(routes.ADVERTISE)

  const pageTitle = buildPageTitle(pageName)

  const { page, ...pageData } = initialAuctionData

  const { data } = useSession()
  const isPro = !!data?.user.proStatus

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.advertise.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.advertise.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.advertise.Meta.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="alternate" hrefLang="en" href={defaultPageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.ADVERTISE, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.ADVERTISE, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.ADVERTISE, 'pl')}
        />
        <link rel="alternate" hrefLang="x-default" href={defaultPageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Main>
        <AuctionsProvider initialPage={page} initialPageData={pageData}>
          <FormProvider isPro={isPro}>
            <main className="inner-container py-4">
              <SuggestedReading
                className="mx-auto mb-8 w-fit"
                {...suggestedPost}
              />
              <Form />
            </main>
          </FormProvider>
        </AuctionsProvider>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const initialAuctionData = await AuctionsClient.fetchAuctionPage({
    history: false,
  })

  const suggestedPost = await BlogClient.getPostBySlug(
    'how-highlighting-works',
    locale,
  )

  const pluckedInitialAuctionData: typeof initialAuctionData = {
    ...initialAuctionData,
    page: initialAuctionData.page.map(pluckTCInvested),
  }

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        advertise: advertise[locale as RegisteredLocale],
      },
      initialAuctionData: pluckedInitialAuctionData,
      suggestedPost,
    },
  }
}
