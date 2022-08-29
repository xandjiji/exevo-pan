import Head from 'next/head'
import { Main } from 'templates'
import {
  DrawerFieldsProvider,
  FiltersProvider,
  AuctionsProvider,
  AuctionsGrid,
} from 'modules/BazaarAuctions'
import Newsticker from 'components/Newsticker'
import { DrawerFieldsClient, AuctionsClient, BlogClient } from 'services'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl, buildPageTitle } from 'utils'
import { routes, endpoints, jsonld } from 'Constants'
import { common, homepage, bazaarHistory } from 'locales'

const pageUrl = buildUrl(routes.BAZAAR_HISTORY)

type HistoryStaticProps = {
  serverOptions: Option[]
  rareItemData: RareItemData
  initialAuctionData: PaginatedData<CharacterObject>
  blogPosts: BlogPost[]
}

export default function BazaarHistory({
  serverOptions,
  rareItemData,
  initialAuctionData,
  blogPosts,
}: HistoryStaticProps) {
  const { translations } = useTranslations()

  const pageTitle = buildPageTitle(translations.bazaarHistory.Meta.title)

  const { page, sortingMode, descendingOrder, ...pageData } = initialAuctionData

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

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
          rareItemData={rareItemData}
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
              <AuctionsGrid past />
            </AuctionsProvider>
          </FiltersProvider>
        </DrawerFieldsProvider>
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const sortOptions = { sortingMode: 0, descendingOrder: true }

  const [serverOptions, rareItemData, initialAuctionData, localizedBlogPosts] =
    await Promise.all([
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
      rareItemData,
      initialAuctionData,
      blogPosts: localizedBlogPosts[locale as RegisteredLocale],
    },
    revalidate: 6000,
  }
}
