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
import { DrawerFieldsClient, AuctionsClient, BlogClient } from 'services'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { buildUrl, buildPageTitle } from 'utils'
import { endpoints, routes, jsonld, urlParameters } from 'Constants'
import { common, homepage } from 'locales'

const pageUrl = buildUrl(routes.HOME)

type HomeStaticProps = {
  serverOptions: Option[]
  rareItemOptions: Option[]
  initialAuctionData: PaginatedData<CharacterObject>
  highlightedAuctions: CharacterObject[]
  blogPosts: BlogPost[]
}

export default function Home({
  serverOptions,
  rareItemOptions,
  initialAuctionData,
  highlightedAuctions,
  blogPosts,
}: HomeStaticProps) {
  const { translations } = useTranslations()
  const { locale } = useRouter()

  const pageTitle = buildPageTitle(translations.homepage.Meta.title)

  const { page, sortingMode, descendingOrder, ...pageData } = initialAuctionData

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.homepage.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.homepage.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.homepage.Meta.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.HOME, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.HOME, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.HOME, 'pl')}
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
        <UrlAuction endpoint={endpoints.CURRENT_AUCTIONS} />
        <Newsticker blogPosts={blogPosts} />
        <DrawerFieldsProvider
          serverOptions={serverOptions}
          rareItemOptions={rareItemOptions}
        >
          <FiltersProvider>
            <AuctionsProvider
              endpoint={endpoints.CURRENT_AUCTIONS}
              highlightedAuctions={highlightedAuctions}
              initialPage={page}
              initialPageData={pageData}
              defaultSortingMode={sortingMode}
              defaultDescendingOrder={descendingOrder}
            >
              <AuctionsGrid
                past={false}
                permalinkResolver={(auctionId) =>
                  `${buildUrl('', locale)}?${
                    urlParameters.AUCTION_ID
                  }=${auctionId}`
                }
              />
            </AuctionsProvider>
          </FiltersProvider>
        </DrawerFieldsProvider>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [
    serverOptions,
    rareItemOptions,
    initialAuctionData,
    highlightedAuctions,
    localizedBlogPosts,
  ] = await Promise.all([
    DrawerFieldsClient.fetchServerOptions({ active: true }),
    DrawerFieldsClient.fetchAuctionedItemOptions(),
    AuctionsClient.fetchAuctionPage({
      endpoint: endpoints.CURRENT_AUCTIONS,
    }),
    AuctionsClient.fetchHighlightedAuctions(),
    await BlogClient.getEveryPostLocale({ pageSize: 3 }),
  ])

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        homepage: homepage[locale as RegisteredLocale],
      },
      serverOptions,
      rareItemOptions,
      initialAuctionData,
      highlightedAuctions,
      blogPosts: localizedBlogPosts[locale as RegisteredLocale],
    },
    revalidate: 60,
  }
}
