import Head from 'next/head'
import { Main } from 'templates'
import {
  DrawerFieldsProvider,
  FiltersProvider,
  AuctionsProvider,
  AuctionsGrid,
  UrlAuction,
} from 'modules/BazaarAuctions'
import Newsticker from 'components/Newsticker'
import { BlogClient } from 'services'
import { AuctionsClient } from 'services/server'
import { DrawerFieldsClient } from 'services/DrawerFields'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { buildUrl, buildPageTitle } from 'utils'
import { routes, endpoints, jsonld, urlParameters } from 'Constants'
import { common, homepage, bazaarHistory } from 'locales'

const pageUrl = buildUrl(routes.BAZAAR_HISTORY)

type HistoryStaticProps = {
  serverOptions: Option[]
  rareItemOptions: Option[]
  initialAuctionData: PaginatedData<CharacterObject>
  blogPosts: BlogPost[]
}

export default function BazaarHistory({
  serverOptions,
  rareItemOptions,
  initialAuctionData,
  blogPosts,
}: HistoryStaticProps) {
  const { translations } = useTranslations()
  const { locale } = useRouter()

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
        <UrlAuction endpoint={endpoints.HISTORY_AUCTIONS} past />
        <Newsticker blogPosts={blogPosts} />
        <DrawerFieldsProvider
          serverOptions={serverOptions}
          rareItemOptions={rareItemOptions}
        >
          <FiltersProvider>
            <AuctionsProvider
              history
              highlightedAuctions={[]}
              initialPage={page}
              initialPageData={pageData}
              defaultSortingMode={sortingMode}
              defaultDescendingOrder={descendingOrder}
            >
              <AuctionsGrid
                past
                permalinkResolver={(auctionId) =>
                  `${buildUrl(routes.BAZAAR_HISTORY, locale)}?${
                    urlParameters.AUCTION_ID
                  }=${auctionId}`
                }
              />
            </AuctionsProvider>
          </FiltersProvider>
        </DrawerFieldsProvider>
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [
    serverOptions,
    rareItemOptions,
    initialAuctionData,
    localizedBlogPosts,
  ] = await Promise.all([
    DrawerFieldsClient.fetchServerOptions(),
    DrawerFieldsClient.fetchAuctionedItemOptions(),
    AuctionsClient.fetchAuctionPage({ history: true }),
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
      rareItemOptions,
      initialAuctionData,
      blogPosts: localizedBlogPosts[locale as RegisteredLocale],
    },
    revalidate: 6000,
  }
}
