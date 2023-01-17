import { useRef } from 'react'
import Head from 'next/head'
import { Main } from 'templates'
import {
  DrawerFieldsProvider,
  AuctionsProvider,
  AuctionsGrid,
  UrlAuction,
} from 'modules/BazaarAuctions'
import Newsticker from 'components/Newsticker'
import { BlogClient, PreviewImageClient } from 'services'
import { DrawerFieldsClient, AuctionsClient } from 'services/server'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl, buildPageTitle, loadRawSrc } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, homepage } from 'locales'

const pageUrl = buildUrl(routes.HOME)

type HomeStaticProps = {
  activeServers: string[]
  serverData: Record<string, ServerObject>
  rareItemData: RareItemData
  initialPaginatedData: PaginatedData<CharacterObject>
  highlightedAuctions: CharacterObject[]
  blogPosts: BlogPost[]
}

export default function Home({
  activeServers,
  serverData,
  rareItemData,
  initialPaginatedData,
  highlightedAuctions,
  blogPosts,
}: HomeStaticProps) {
  const { translations } = useTranslations()

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
            <AuctionsGrid />
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
  ] = await Promise.all([
    DrawerFieldsClient.fetchActiveServerOptions(),
    DrawerFieldsClient.fetchServerData(),
    DrawerFieldsClient.fetchAuctionedItemOptions(),
    AuctionsClient.fetchAuctionPage({ history: false }),
    AuctionsClient.fetchHighlightedAuctions(),
    await BlogClient.getEveryPostLocale({ pageSize: 3 }),
  ])

  return {
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
    },
  }
}
