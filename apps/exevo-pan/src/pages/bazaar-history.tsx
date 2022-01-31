import Head from 'next/head'
import { Main, Ads } from 'templates'
import {
  DrawerFieldsProvider,
  FiltersProvider,
  AuctionsProvider,
  LoadingState,
  AuctionsGrid,
} from 'modules/BazaarAuctions'
import Newsticker from 'components/Newsticker'
import { DrawerFieldsClient, AuctionsClient, BlogClient } from 'services'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl } from 'utils'
import { routes, endpoints, jsonld } from 'Constants'
import { common, homepage, bazaarHistory } from 'locales'

const pageUrl = buildUrl(routes.BAZAAR_HISTORY)

type HistoryStaticProps = {
  serverOptions: Option[]
  auctionedItemOptions: Option[]
  initialAuctionData: PaginatedData<CharacterObject>
  blogPosts: BlogPost[]
}

export default function BazaarHistory({
  serverOptions,
  auctionedItemOptions,
  initialAuctionData,
  blogPosts,
}: HistoryStaticProps): JSX.Element {
  const { translations } = useTranslations()

  const { page, sortingMode, descendingOrder, ...pageData } = initialAuctionData

  return (
    <div>
      <Head>
        <title>{translations.bazaarHistory.Meta.title}</title>
        <meta name="title" content={translations.bazaarHistory.Meta.title} />
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
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.BAZAAR_HISTORY, 'pl')}
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
        <Newsticker blogPosts={blogPosts} />
        <DrawerFieldsProvider
          serverOptions={serverOptions}
          auctionedItemOptions={auctionedItemOptions}
        >
          <FiltersProvider>
            <AuctionsProvider
              endpoint={endpoints.HISTORY_AUCTIONS}
              highlightedAuctions={[]}
              initialPage={page}
              initialPageData={pageData}
              defaultSortingMode={sortingMode}
              defaultDescendingOrder={descendingOrder}
            >
              <LoadingState>
                <AuctionsGrid />
              </LoadingState>
            </AuctionsProvider>
          </FiltersProvider>
        </DrawerFieldsProvider>

        <Ads.FooterBanner />
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const sortOptions = { sortingMode: 0, descendingOrder: true }

  const [
    serverOptions,
    auctionedItemOptions,
    initialAuctionData,
    localizedBlogPosts,
  ] = await Promise.all([
    DrawerFieldsClient.fetchServerOptions(),
    DrawerFieldsClient.fetchAuctionedItemOptions(),
    AuctionsClient.fetchAuctionPage({
      sortOptions,
      endpoint: endpoints.HISTORY_AUCTIONS,
    }),
    await BlogClient.getEveryPostLocale({ pageSize: 3 }),
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
      blogPosts: localizedBlogPosts[locale as RegisteredLocale],
    },
    revalidate: 60,
  }
}
