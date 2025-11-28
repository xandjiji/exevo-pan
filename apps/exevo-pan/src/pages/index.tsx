import { useRef } from 'react'
import Head from 'next/head'
import { Main } from 'templates'
import {
  AuctionsGrid,
  AuctionsProvider,
  DrawerFieldsProvider,
  UrlAuction,
} from 'modules/BazaarAuctions'
import Newsticker from 'components/Newsticker'
import { BlogClient, PreviewImageClient } from 'services'
import {
  AuctionsClient,
  DrawerFieldsClient,
  TibiaBountyClient,
  TibiaTradeClient,
} from 'services/server'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildPageTitle, buildUrl, loadRawSrc } from 'utils'
import { jsonld, routes } from 'Constants'
import { common, homepage } from 'locales'

const pageUrl = buildUrl(routes.HOME)

type HomeStaticProps = {
  activeServers: string[]
  serverData: Record<string, ServerObject>
  rareItemData: RareItemData
  initialPaginatedData: PaginatedData<CharacterObject>
  highlightedAuctions: CharacterObject[]
  blogPosts: BlogPost[]
  tibiaTradeItems: TibiaTradeHighlightedItem[]
  badTibiaTradeIds: string
  // tibiaBountyResponse: TibiaBountyEntry[]
}

export default function Home({
  activeServers,
  serverData,
  rareItemData,
  initialPaginatedData,
  highlightedAuctions,
  blogPosts,
  tibiaTradeItems,
  badTibiaTradeIds,
}: // tibiaBountyResponse,
HomeStaticProps) {
  const translations = useTranslations()

  const pageName = translations.homepage.Meta.title
  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: loadRawSrc('/default-preview.png'),
  })

  const pageTitle = buildPageTitle(pageName)

  const { current: activeServersSet } = useRef(new Set(activeServers))

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="tibia-trade-bad-ids" content={badTibiaTradeIds} />
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

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

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
        <UrlAuction highlightedAuctions={highlightedAuctions} />
        <Newsticker blogPosts={blogPosts} />
        <DrawerFieldsProvider
          activeServers={activeServersSet}
          serverData={serverData}
          rareItemData={rareItemData}
        >
          <AuctionsProvider
            highlightedAuctions={highlightedAuctions}
            initialPaginatedData={initialPaginatedData}
          >
            <AuctionsGrid tibiaTradeItems={tibiaTradeItems} />
          </AuctionsProvider>
        </DrawerFieldsProvider>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [
    activeServerOptions,
    serverData,
    rareItemData,
    initialPaginatedData,
    highlightedAuctions,
    localizedBlogPosts,
    tibiaTradeResponse,
    // tibiaBountyResponse,
  ] = await Promise.all([
    DrawerFieldsClient.fetchActiveServerOptions(),
    DrawerFieldsClient.fetchServerData(),
    DrawerFieldsClient.fetchAuctionedItemOptions(),
    AuctionsClient.fetchAuctionPage({ history: false }),
    AuctionsClient.fetchHighlightedAuctions(),
    await BlogClient.getEveryPostLocale({ pageSize: 3 }),
    await TibiaTradeClient.getHighlightedItems(),
    // await TibiaBountyClient.getHighlightedItems(),
  ])

  return {
    revalidate: 60 * 15,
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        homepage: homepage[locale as RegisteredLocale],
      },
      activeServers: activeServerOptions.map(({ name }) => name),
      serverData,
      rareItemData,
      initialPaginatedData,
      highlightedAuctions,
      blogPosts: localizedBlogPosts[locale as RegisteredLocale],
      tibiaTradeItems: tibiaTradeResponse.items.slice(0, 4),
      badTibiaTradeIds: tibiaTradeResponse.badIds.join(','),
      // tibiaBountyResponse,
    },
  }
}
