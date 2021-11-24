import Head from 'next/head'
import { Main } from 'templates'
import AdvertiseGrid from 'modules/Advertise'
import { AuctionsProvider } from 'modules/Advertise/contexts/useAuctions'
import { AuctionsClient } from 'services'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl } from 'utils'
import { endpoints, routes } from 'Constants'
import { common, advertise } from 'locales'

const pageUrl = buildUrl(routes.ADVERTISE)

type AdvertiseStaticProps = {
  initialAuctionData: PaginatedData<CharacterObject>
}

export default function Advertise({
  initialAuctionData,
}: AdvertiseStaticProps): JSX.Element {
  const { translations } = useTranslations()

  const { page, ...pageData } = initialAuctionData

  return (
    <div>
      <Head>
        <title>{translations.advertise.Meta.title}</title>
        <meta name="title" content={translations.advertise.Meta.title} />
        <meta
          property="og:site_name"
          content={translations.advertise.Meta.title}
        />
        <meta property="og:title" content={translations.advertise.Meta.title} />
        <meta
          property="twitter:title"
          content={translations.advertise.Meta.title}
        />

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
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      </Head>

      <Main>
        <AuctionsProvider initialPage={page} initialPageData={pageData}>
          <AdvertiseGrid />
        </AuctionsProvider>
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const initialAuctionData = await AuctionsClient.fetchAuctionPage({
    endpoint: endpoints.CURRENT_AUCTIONS,
  })

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        advertise: advertise[locale as RegisteredLocale],
      },
      initialAuctionData,
    },
    revalidate: 60,
  }
}
