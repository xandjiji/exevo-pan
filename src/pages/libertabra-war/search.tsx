import Head from 'next/head'
import { Main } from 'templates'
import { Header, SearchGrid } from 'modules/LibertabraWar'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl } from 'utils'
import { routes, endpoints, paths } from 'Constants'
import { common, war } from 'locales'

const pageUrl = buildUrl(routes.LIBERTABRA_WAR_SEARCH)

export default function LibertabraWar(): JSX.Element {
  const { translations } = useTranslations()

  return (
    <div>
      <Head>
        <title>{translations.war.Meta.Search.title}</title>
        <meta name="title" content={translations.war.Meta.Search.title} />
        <meta
          property="og:site_name"
          content={translations.war.Meta.Search.title}
        />
        <meta
          property="og:title"
          content={translations.war.Meta.Search.title}
        />
        <meta
          property="twitter:title"
          content={translations.war.Meta.Search.title}
        />

        <meta
          name="description"
          content={translations.war.Meta.Search.description}
        />
        <meta
          property="twitter:description"
          content={translations.war.Meta.Search.description}
        />
        <meta
          property="og:description"
          content={translations.war.Meta.Search.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.LIBERTABRA_WAR_SEARCH, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.LIBERTABRA_WAR_SEARCH, 'es')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <link
          rel="preload"
          href={`${endpoints.WAR_DATA}${paths.PUNE_DATA}`}
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${endpoints.WAR_DATA}${paths.BONES_DATA}`}
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>

      <Main>
        <main>
          <Header />
          <SearchGrid />
        </main>
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
      war: war[locale as RegisteredLocale],
    },
  },
})
