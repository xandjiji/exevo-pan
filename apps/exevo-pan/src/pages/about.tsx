/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import Head from 'next/head'
import { Main } from 'templates'
import AboutContent from 'modules/About'
import { TibiaDataClient } from 'services'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl } from 'utils'
import { authors, routes } from 'Constants'
import { common, about } from 'locales'

const pageUrl = buildUrl(routes.ABOUT)

export default function About({
  authorsData,
}: {
  authorsData: typeof authors
}): JSX.Element {
  const { translations } = useTranslations()

  return (
    <>
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
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.ABOUT, 'pl')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            html {
                scroll-padding-top: 104px;
            }
         `,
          }}
        />
      </Head>

      <Main>
        <AboutContent authorsData={authorsData} />
      </Main>
    </>
  )
}

const authorsData = { ...authors }

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const nicknames = Object.keys(authorsData)
    for (const nickname of nicknames) {
      const typedNickname = nickname as keyof typeof authorsData
      const data = await TibiaDataClient.character(nickname)

      if (data) {
        authorsData[typedNickname] = {
          ...authorsData[typedNickname],
          ...data,
        }
      }
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
      authorsData,
    },
  }
}
