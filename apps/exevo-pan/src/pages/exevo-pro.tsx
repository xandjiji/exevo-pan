import Head from 'next/head'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { Button } from 'components/Atoms'
import { Tooltip } from 'components/Organisms'
import {
  MiniAuctionGrid,
  FeatureSection,
  MiniBossGrid,
  MiniAuction,
  MiniFilters,
  Tooltip as List,
  Strong,
  Gradient,
} from 'modules/ExevoProLP'
import Image from 'next/image'
import tibiaCoinSrc from 'assets/tibiacoinBig.png'
import { buildUrl, buildPageTitle } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, homepage } from 'locales'

const pageUrl = buildUrl(routes.HOME)

export default function ExevoPro() {
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

      <Main clean>
        <main className="inner-container grid gap-24 overflow-x-hidden py-20">
          <section className="relative mb-28 flex flex-col items-center gap-10">
            <MiniAuctionGrid className="-z-1 absolute -top-28 -left-28 opacity-20 sm:-top-16 sm:-left-16 sm:opacity-25 md:-top-12 md:-left-12" />
            <h1 className="lgr:mt-16 text-onSurface lgr:w-fit w-min text-[64px] sm:text-[80px] md:text-[112px]">
              Become <Gradient>Exevo Pro</Gradient>
            </h1>

            <Button className="w-fit">Start now</Button>
          </section>

          <FeatureSection>
            <h2 className="max-w-[240px] text-center">
              Access to all bosses from the{' '}
              <Tooltip
                offset={[0, 6]}
                content={
                  <List.Ul>
                    <List.Li>The Pale Count</List.Li>
                    <List.Li>Shlorg</List.Li>
                    <List.Li>Man in the Cave</List.Li>
                    <List.Li>Ocyakao</List.Li>
                    <List.Li>The Welter</List.Li>
                    <List.Li>Yeti</List.Li>
                  </List.Ul>
                }
              >
                <Strong highlight>Boss Tracker</Strong>
              </Tooltip>
            </h2>
            <MiniBossGrid />
          </FeatureSection>

          <FeatureSection>
            <div className="order-last grid grid-cols-3 gap-2 md:-order-none">
              <MiniAuction highlight />
              <MiniAuction />
              <MiniAuction />
              <MiniAuction />
              <MiniAuction />
              <MiniAuction highlight />
              <MiniAuction highlight />
              <MiniAuction />
              <MiniAuction highlight />
            </div>
            <h2 className="max-w-[240px] text-center">
              Find out how many <Strong>Tibia Coins</Strong> was invested in any
              Bazaar character
            </h2>
          </FeatureSection>

          <FeatureSection>
            <h2 className="max-w-[240px] text-center">
              Exclusive{' '}
              <Tooltip
                offset={[0, 6]}
                content={
                  <List.Ul>
                    <List.Li>Tibia Coins invested</List.Li>
                    <List.Li>Store mounts and outfits</List.Li>
                    <List.Li>Rare items</List.Li>
                    <List.Li>Soul War available</List.Li>
                  </List.Ul>
                }
              >
                <Strong highlight>auction filters</Strong>
              </Tooltip>
            </h2>
            <div className="flex items-center">
              <MiniFilters />
              <div className="-z-1 child:!shadow-sm relative -left-6 grid grid-cols-2 gap-2">
                <MiniAuction />
                <MiniAuction />
                <MiniAuction />
                <MiniAuction />
              </div>
            </div>
          </FeatureSection>

          <p className="text-center text-2xl">...and more in the future! 🔮</p>

          <section>
            <h3 className="text-onSurface text-center text-[48px] md:text-[64px]">
              Upgrade now to <Gradient>Exevo Pro</Gradient>
            </h3>

            <div className="my-10 grid gap-4 md:my-14 md:flex md:items-center md:justify-center md:gap-40">
              <ul className="mx-auto grid w-fit list-disc gap-1.5 md:mx-0 md:ml-8">
                <li>No subscriptions</li>
                <li>No credit card</li>
                <li>No extra fees</li>
              </ul>

              <div>
                <p className="flex flex-nowrap items-center justify-center gap-2 text-xl md:justify-start">
                  Only
                  <Image
                    src={tibiaCoinSrc}
                    alt="Tibia Coin"
                    unoptimized
                    width={24}
                    height={24}
                    className="select-none"
                  />
                  <strong className="whitespace-nowrap text-[32px]">
                    250 TC
                  </strong>
                </p>

                <p className="text-center text-xl">
                  Pay once, yours{' '}
                  <strong className="text-[32px]">forever 🙌</strong>
                </p>
              </div>
            </div>

            <Button className="mx-auto mt-8 block w-fit">Upgrade now</Button>
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
