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
import { BlogClient } from 'services'
import { DrawerFieldsClient, AuctionsClient } from 'services/server'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { ExevoPanIcon } from 'assets/svgs'
import { buildUrl, buildPageTitle } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, homepage } from 'locales'

const pageUrl = buildUrl(routes.HOME)

type HomeStaticProps = {
  activeServers: string[]
  serverOptions: Option[]
  rareItemData: RareItemData
  initialPaginatedData: PaginatedData<CharacterObject>
  highlightedAuctions: CharacterObject[]
  blogPosts: BlogPost[]
}

const shadow = {
  light: '44 48 56',
  dark: '4 8 16',
}

const lightShadow = `-70px 70px 65px rgb(${shadow.light} / 7%), -30px 30px 30px rgb(${shadow.light} / 6%), -15px 15px 15px rgb(${shadow.light} / 5%), -10px 10px 8px rgb(${shadow.light} / 4%), -4px 4px 4px rgb(${shadow.light} / 3%), -2px 2px 2px rgb(${shadow.light} / 2%)`

const darkShadow = `-70px 70px 65px rgb(${shadow.dark} / 7%), -30px 30px 30px rgb(${shadow.dark} / 6%), -15px 15px 15px rgb(${shadow.dark} / 5%), -10px 10px 8px rgb(${shadow.dark} / 4%), -4px 4px 4px rgb(${shadow.dark} / 3%), -2px 2px 2px rgb(${shadow.dark} / 2%)`

export default function Home({
  activeServers,
  serverOptions,
  rareItemData,
  initialPaginatedData,
  highlightedAuctions,
  blogPosts,
}: HomeStaticProps) {
  const { translations } = useTranslations()

  const pageTitle = buildPageTitle(translations.homepage.Meta.title)
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
        <main className="inner-container py-20">
          <div
            className="grid w-fit grid-cols-3 gap-4"
            style={{ transform: 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)' }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => (
              <div
                key={key}
                className="child:rounded-xl child:w-full child:h-full child:bg-surface relative h-40 w-40"
                style={{ zIndex: key % 3 === 0 ? 1 : key % 3 === 1 ? 3 : 2 }}
              >
                <div
                  className="z-2 absolute grid place-content-center"
                  style={{
                    boxShadow: lightShadow,
                  }}
                >
                  <ExevoPanIcon style={{ height: 60, width: 60 }} />
                </div>
                <div
                  className="z-1 absolute"
                  style={{
                    boxShadow: lightShadow,
                    transform: 'matrix(1,0,0,1,-4,4)',
                  }}
                />
              </div>
            ))}
          </div>
        </main>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [
    activeServerOptions,
    serverOptions,
    rareItemData,
    initialPaginatedData,
    highlightedAuctions,
    localizedBlogPosts,
  ] = await Promise.all([
    DrawerFieldsClient.fetchActiveServerOptions(),
    DrawerFieldsClient.fetchServerOptions(),
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
      serverOptions,
      rareItemData,
      initialPaginatedData,
      highlightedAuctions,
      blogPosts: localizedBlogPosts[locale as RegisteredLocale],
    },
  }
}
