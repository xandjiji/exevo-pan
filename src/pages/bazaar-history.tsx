import Head from 'next/head'
import { Main } from 'templates'
import { BazaarHistory as BazaarHistoryGrid } from 'modules/BazaarAuctions'
import { DrawerFieldsProvider } from 'modules/BazaarAuctions/contexts/useDrawerFields'
import { DrawerFieldsClient, AuctionsClient } from 'services'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl } from 'utils'
import { routes, endpoints } from 'Constants'
import { common, homepage, bazaarHistory } from 'locales'

const pageUrl = buildUrl(routes.BAZAAR_HISTORY)

type HistoryStaticProps = {
  serverOptions: Option[]
  auctionedItemOptions: Option[]
  initialAuctionData: PaginatedData<CharacterObject>
}

export default function BazaarHistory({
  serverOptions,
  auctionedItemOptions,
  initialAuctionData,
}: HistoryStaticProps): JSX.Element {
  const { translations } = useTranslations()

  return (
    <div>
      <Head>
        <title>{translations.bazaarHistory.Meta.title}</title>
        <meta name="title" content={translations.bazaarHistory.Meta.title} />
        <meta
          property="og:site_name"
          content={translations.bazaarHistory.Meta.title}
        />
        <meta
          property="og:title"
          content={translations.bazaarHistory.Meta.title}
        />
        <meta
          property="twitter:title"
          content={translations.bazaarHistory.Meta.title}
        />

        <meta
          name="description"
          content={translations.bazaarHistory.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.bazaarHistory.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.bazaarHistory.Meta.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.BAZAAR_HISTORY, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.BAZAAR_HISTORY, 'es')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      </Head>

      <Main>
        <DrawerFieldsProvider
          serverOptions={serverOptions}
          auctionedItemOptions={auctionedItemOptions}
        >
          <BazaarHistoryGrid initialAuctionData={initialAuctionData} />
        </DrawerFieldsProvider>
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const sortOptions = { sortingMode: 0, descendingOrder: true }

  const [serverOptions, auctionedItemOptions, initialAuctionData] =
    await Promise.all([
      DrawerFieldsClient.fetchServerOptions(),
      DrawerFieldsClient.fetchAuctionedItemOptions(),
      AuctionsClient.fetchAuctionPage({
        sortOptions,
        endpoint: endpoints.HISTORY_AUCTIONS,
      }),
    ])

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        homepage: homepage[locale as RegisteredLocale],
        bazaarHistory: bazaarHistory[locale as RegisteredLocale],
      },
      serverOptions,
      auctionedItemOptions,
      initialAuctionData,
    },
    revalidate: 60,
  }
}
