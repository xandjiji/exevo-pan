import Head from 'next/head'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { Button } from 'components/Atoms'
import { MiniAuctionGrid, MiniBossGrid } from 'modules/ExevoProLP'
import { buildUrl, buildPageTitle } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, homepage } from 'locales'

const pageUrl = buildUrl(routes.HOME)

export default function Home() {
  const { translations } = useTranslations()

  const pageTitle = buildPageTitle(translations.homepage.Meta.title)

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
          <section className="relative mb-56 flex flex-col items-center gap-10">
            <MiniAuctionGrid className="-z-1 absolute -top-28 -left-28 opacity-20 sm:-top-16 sm:-left-16 sm:opacity-25 md:-top-12 md:-left-12" />
            <h1 className="lgr:mt-16 text-onSurface lgr:w-fit w-min text-[64px] sm:text-[80px] md:text-[112px]">
              Become{' '}
              <strong className="from-primaryHighlight to-rare whitespace-nowrap bg-gradient-to-r bg-clip-text text-transparent">
                Exevo Pro
              </strong>
            </h1>

            <Button className="w-fit">Start now</Button>
          </section>

          <section className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
            <h2 className="max-w-[240px] text-center">
              Access to all bosses from the{' '}
              <strong className="text-rare">Boss Tracker</strong>
            </h2>
            <MiniBossGrid />
          </section>
        </main>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
      homepage: homepage[locale as RegisteredLocale],
    },
  },
})
