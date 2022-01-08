import Head from 'next/head'
import { Main } from 'templates'
import { CurrentAuctions as CurrentAuctionsGrid } from 'modules/BazaarAuctions'
import { DrawerFieldsProvider } from 'modules/BazaarAuctions/contexts/useDrawerFields'
import { DrawerFieldsClient, AuctionsClient } from 'services'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl } from 'utils'
import { endpoints, routes } from 'Constants'
import { common, homepage } from 'locales'

const pageUrl = buildUrl(routes.HOME)

type HomeStaticProps = {
  serverOptions: Option[]
  auctionedItemOptions: Option[]
  initialAuctionData: PaginatedData<CharacterObject>
  highlightedAuctions: CharacterObject[]
}

export default function Home({
  serverOptions,
  auctionedItemOptions,
  initialAuctionData,
  highlightedAuctions,
}: HomeStaticProps): JSX.Element {
  const { translations } = useTranslations()

  return (
    <div>
      <Head>
        <title>{translations.homepage.Meta.title}</title>
        <meta name="title" content={translations.homepage.Meta.title} />
        <meta
          property="og:site_name"
          content={translations.homepage.Meta.title}
        />
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
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      </Head>

      <Main>
        <DrawerFieldsProvider
          serverOptions={serverOptions}
          auctionedItemOptions={auctionedItemOptions}
        >
          <CurrentAuctionsGrid
            initialAuctionData={initialAuctionData}
            highlightedAuctions={highlightedAuctions}
          />
        </DrawerFieldsProvider>
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [
    serverOptions,
    auctionedItemOptions,
    initialAuctionData,
    highlightedAuctions,
  ] = await Promise.all([
    DrawerFieldsClient.fetchServerOptions(),
    DrawerFieldsClient.fetchAuctionedItemOptions(),
    AuctionsClient.fetchAuctionPage({
      endpoint: endpoints.CURRENT_AUCTIONS,
    }),
    AuctionsClient.fetchHighlightedAuctions(),
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
    },
    revalidate: 60,
  }
}
