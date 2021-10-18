import Head from 'next/head'
import styled from 'styled-components'
import { Main as BaseMain } from 'templates'
import AboutContent from 'modules/About'
import { KsuData } from 'modules/About/types'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl } from 'utils'
import { routes, endpoints } from 'Constants'
import { common, about } from 'locales'

const pageUrl = buildUrl(routes.ABOUT)

const Main = styled(BaseMain)`
  header {
    position: fixed;
  }

  main {
    margin-top: 60px;
    scroll-padding-top: 104px;
  }

  @media (min-width: 768px) {
    main {
      scroll-padding-top: unset;
    }
  }
`

export default function About({
  characterData,
}: {
  characterData: KsuData
}): JSX.Element {
  const { translations } = useTranslations()

  return (
    <div>
      <Head>
        <title>{translations.about.Meta.title}</title>
        <meta name="title" content={translations.about.Meta.title} />
        <meta property="og:site_name" content={translations.about.Meta.title} />
        <meta property="og:title" content={translations.about.Meta.title} />
        <meta
          property="twitter:title"
          content={translations.about.Meta.title}
        />

        <meta
          name="description"
          content={translations.about.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.about.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.about.Meta.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.ABOUT, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.ABOUT, 'es')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      </Head>

      <Main>
        <AboutContent characterData={characterData} />
      </Main>
    </div>
  )
}

const fallbackData: KsuData = {
  characters: {
    data: {
      name: 'Ksu',
      level: 425,
      vocation: 'Elite Knight',
      world: 'Belobra',
    },
  },
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let ksuData: KsuData = { ...fallbackData }
  try {
    const result = await fetch(`${endpoints.TIBIADATA}/Ksu.json`)

    const freshData = (await result.json()) as KsuData

    if (!freshData.characters.error) {
      ksuData = { ...freshData }
    }
  } catch (error) {
    /* fallback data is already assigned */
  }

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        about: about[locale as RegisteredLocale],
      },
      characterData: ksuData,
    },
  }
}
