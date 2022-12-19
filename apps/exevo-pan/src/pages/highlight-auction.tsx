import Head from 'next/head'
import { Main } from 'templates'
import { FormProvider, Form } from 'modules/Advertise'
import { AuctionsProvider } from 'modules/Advertise/contexts/useAuctions'
import { AuctionsClient } from 'services/server'
import { useSession } from 'next-auth/react'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl, buildPageTitle } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, advertise } from 'locales'

const pageUrl = buildUrl(routes.ADVERTISE)

type AdvertiseStaticProps = {
  initialAuctionData: PaginatedData<CharacterObject>
}

export default function Advertise({
  initialAuctionData,
}: AdvertiseStaticProps) {
  const { translations } = useTranslations()

  const pageTitle = buildPageTitle(translations.advertise.Meta.title)

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

        <link rel="alternate" hrefLang="en" href={pageUrl} />
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
        <AuctionsProvider initialPage={page} initialPageData={pageData}>
          <FormProvider>
            <main className="inner-container py-4">
              <Form isPro={isPro} />
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

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        advertise: advertise[locale as RegisteredLocale],
      },
      initialAuctionData,
    },
  }
}
