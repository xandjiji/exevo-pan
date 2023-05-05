import Head from 'next/head'
import NextLink from 'next/link'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { Button } from 'components/Atoms'
import {
  ThreeDimensionalMiniAuctionGrid,
  FeatureSection,
  MiniBossGrid,
  MiniAuction,
  MiniFilters,
  MiniHighlight,
  Phone,
  Notebook,
  HuntingGroupGrid,
  PremiumBossesList,
  PremiumFiltersList,
  Strong,
  Gradient,
  ComparisonTable,
} from 'modules/ExevoProLP'
import Image from 'next/image'
import tibiaCoinSrc from 'assets/tibiacoinBig.png'
import { buildUrl, buildPageTitle, loadRawSrc } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, exevopro } from 'locales'

const pageUrl = buildUrl(routes.EXEVOPRO)

export default function ExevoPro() {
  const { translations } = useTranslations()

  const pageTitle = buildPageTitle(translations.exevopro.Meta.title)
  const { locale } = useRouter()
  const previewSrc = loadRawSrc(`/pro-${locale}.png`)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <meta
          name="description"
          content={translations.exevopro.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.exevopro.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.exevopro.Meta.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.EXEVOPRO, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.EXEVOPRO, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.EXEVOPRO, 'pl')}
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
            <ThreeDimensionalMiniAuctionGrid className="-z-1 absolute -top-28 -left-28 opacity-20 sm:-top-16 sm:-left-16 sm:opacity-25 md:-top-12 md:-left-12" />
            <h2 className="lgr:mt-16 text-onSurface lgr:w-fit w-min text-[64px] sm:text-[80px] md:text-[112px]">
              {templateMessage(translations.exevopro.heading, {
                exevopro: <Gradient>Exevo Pro</Gradient>,
              })}
            </h2>

            <NextLink href={routes.DASHBOARD.ROOT}>
              <Button className="w-fit">{translations.exevopro.heroCTA}</Button>
            </NextLink>
          </section>

          <ComparisonTable />

          <FeatureSection>
            <h3 className="max-w-[240px] text-center text-2xl">
              {templateMessage(translations.exevopro.bossTracker.pitch, {
                strong: (
                  <PremiumBossesList>
                    <Strong highlight>
                      {translations.exevopro.bossTracker.strong}
                    </Strong>
                  </PremiumBossesList>
                ),
              })}
            </h3>

            <MiniBossGrid />
          </FeatureSection>

          <FeatureSection>
            <h3 className="max-w-[240px] text-center text-2xl">
              {templateMessage(translations.exevopro.tcInvested.pitch, {
                strong: <Strong>Tibia Coins</Strong>,
              })}
            </h3>

            <div className="grid grid-cols-3 gap-2">
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
          </FeatureSection>

          <FeatureSection>
            <h3 className="max-w-[240px] text-center text-2xl">
              {templateMessage(translations.exevopro.exclusiveFilters.pitch, {
                strong: (
                  <PremiumFiltersList>
                    <Strong highlight>
                      {translations.exevopro.exclusiveFilters.strong}
                    </Strong>
                  </PremiumFiltersList>
                ),
              })}
            </h3>

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

          <FeatureSection>
            <h3 className="max-w-[240px] text-center text-2xl">
              {templateMessage(translations.exevopro.highlightDiscount.pitch, {
                strong: (
                  <Strong>
                    {translations.exevopro.highlightDiscount.strong}
                  </Strong>
                ),
              })}
            </h3>

            <MiniHighlight />
          </FeatureSection>

          <FeatureSection>
            <h3 className="max-w-[240px] text-center text-2xl">
              {templateMessage(translations.exevopro.notifications.pitch, {
                strong: (
                  <Strong>{translations.exevopro.notifications.strong}</Strong>
                ),
              })}
            </h3>

            <div className="flex items-center">
              <div className="z-1 relative -mr-5">
                <Phone />
              </div>
              <Notebook />
            </div>
          </FeatureSection>

          <FeatureSection>
            <h3 className="max-w-[240px] text-center text-2xl">
              {templateMessage(translations.exevopro.huntingGroups.pitch, {
                strong: (
                  <Strong>{translations.exevopro.huntingGroups.strong}</Strong>
                ),
              })}
            </h3>

            <HuntingGroupGrid />
          </FeatureSection>

          <p className="text-center text-2xl">
            {translations.exevopro.andMore}
          </p>

          <section>
            <h2 className="text-onSurface text-center text-[48px] md:text-[64px]">
              {templateMessage(translations.exevopro.footer, {
                exevopro: <Gradient>Exevo Pro</Gradient>,
              })}
            </h2>

            <div className="my-10 grid gap-8 md:my-14 md:flex md:items-center md:justify-center md:gap-40">
              <ul className="mx-auto grid w-fit list-disc gap-1.5 md:mx-0 md:ml-8">
                <li>{translations.exevopro.no.subscriptions}</li>
                <li>{translations.exevopro.no.creditCard}</li>
                <li>{translations.exevopro.no.extraFees}</li>
              </ul>

              <div>
                <p className="flex flex-nowrap items-center justify-center gap-2 text-xl md:justify-start">
                  {translations.exevopro.only}
                  <Image
                    src={tibiaCoinSrc}
                    alt="Tibia Coin"
                    unoptimized
                    width={24}
                    height={24}
                    className="pixelated select-none"
                  />
                  <strong className="whitespace-nowrap text-[32px]">
                    250 TC
                  </strong>
                </p>

                <p className="text-center text-xl">
                  {templateMessage(translations.exevopro.payOnce, {
                    forever: (
                      <strong className="whitespace-nowrap text-[32px]">
                        {translations.exevopro.forever}
                      </strong>
                    ),
                  })}
                </p>
              </div>
            </div>

            <NextLink href={routes.DASHBOARD.ROOT}>
              <Button className="mx-auto mt-8 block w-fit">
                {translations.exevopro.footerCTA}
              </Button>
            </NextLink>
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
      exevopro: exevopro[locale as RegisteredLocale],
    },
  },
})
