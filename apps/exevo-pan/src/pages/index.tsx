import Head from 'next/head'
import { Main, Ads } from 'templates'
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
import { buildUrl } from 'utils'
import { endpoints, routes, jsonld } from 'Constants'
import { common, homepage } from 'locales'

const pageUrl = buildUrl(routes.HOME)

type HomeStaticProps = {
  serverOptions: Option[]
  auctionedItemOptions: Option[]
  initialAuctionData: PaginatedData<CharacterObject>
  highlightedAuctions: CharacterObject[]
  blogPosts: BlogPost[]
}

export default function Home({
  serverOptions,
  auctionedItemOptions,
  initialAuctionData,
  highlightedAuctions,
  blogPosts,
}: HomeStaticProps): JSX.Element {
  const { translations } = useTranslations()

  const { page, sortingMode, descendingOrder, ...pageData } = initialAuctionData

  return (
    <>
      <Head>
        <title>{translations.homepage.Meta.title}</title>
        <meta name="title" content={translations.homepage.Meta.title} />
        <meta property="og:title" content={translations.homepage.Meta.title} />
        <meta
          property="twitter:title"
          content={translations.homepage.Meta.title}
        />

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
        <Newsticker blogPosts={blogPosts} />
        <DrawerFieldsProvider
          serverOptions={serverOptions}
          auctionedItemOptions={auctionedItemOptions}
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
              <AuctionsGrid />
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
    auctionedItemOptions,
    initialAuctionData,
    highlightedAuctions,
    localizedBlogPosts,
  ] = await Promise.all([
    DrawerFieldsClient.fetchServerOptions(),
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
      auctionedItemOptions,
      initialAuctionData,
      highlightedAuctions,
      blogPosts: localizedBlogPosts[locale as RegisteredLocale],
    },
    revalidate: 60,
  }
}
