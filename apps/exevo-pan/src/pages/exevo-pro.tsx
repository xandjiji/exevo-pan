import Head from 'next/head'
import NextLink from 'next/link'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { templateMessage, useTranslations } from 'contexts/useTranslation'
import { Button } from 'components/Atoms'
import {
  ComparisonTable,
  FeatureSection,
  Gradient,
  HuntingGroupGrid,
  MiniAuction,
  MiniBossGrid,
  MiniFilters,
  MiniHighlight,
  Notebook,
  Phone,
  PremiumBossesList,
  PremiumFiltersList,
  Strong,
  ThreeDimensionalMiniAuctionGrid,
} from 'modules/ExevoProLP'
import Image from 'next/image'
import tibiaCoinSrc from 'assets/tibiacoinBig.png'
import pixSrc from 'assets/pix.png'
import { buildPageTitle, buildUrl, loadRawSrc } from 'utils'
import { jsonld, routes } from 'Constants'
import { common, exevopro } from 'locales'

const pageUrl = buildUrl(routes.EXEVOPRO)

export default function ExevoPro() {
  const translations = useTranslations()
  const i18n = translations.exevopro

  const pageTitle = buildPageTitle(i18n.Meta.title)
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

        <meta name="description" content={i18n.Meta.description} />
        <meta property="twitter:description" content={i18n.Meta.description} />
        <meta property="og:description" content={i18n.Meta.description} />
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
              {templateMessage(i18n.heading, {
                exevopro: <Gradient>Exevo Pro</Gradient>,
              })}
            </h2>

            <NextLink href={routes.DASHBOARD.ROOT}>
              <Button className="w-fit">{i18n.heroCTA}</Button>
            </NextLink>
          </section>

          <FeatureSection>
            <h3 className="max-w-[240px] text-center text-2xl">
              {templateMessage(i18n.bossTracker.pitch, {
                strong: (
                  <PremiumBossesList>
                    <Strong highlight>{i18n.bossTracker.strong}</Strong>
                  </PremiumBossesList>
                ),
              })}
            </h3>

            <MiniBossGrid />
          </FeatureSection>

          <FeatureSection>
            <h3 className="max-w-[240px] text-center text-2xl">
              {templateMessage(i18n.tcInvested.pitch, {
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
              {templateMessage(i18n.exclusiveFilters.pitch, {
                strong: (
                  <PremiumFiltersList>
                    <Strong highlight>{i18n.exclusiveFilters.strong}</Strong>
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
              {templateMessage(i18n.highlightDiscount.pitch, {
                strong: <Strong>{i18n.highlightDiscount.strong}</Strong>,
              })}
            </h3>

            <MiniHighlight />
          </FeatureSection>

          <FeatureSection>
            <h3 className="max-w-[240px] text-center text-2xl">
              {templateMessage(i18n.notifications.pitch, {
                strong: <Strong>{i18n.notifications.strong}</Strong>,
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
              {templateMessage(i18n.huntingGroups.pitch, {
                strong: <Strong>{i18n.huntingGroups.strong}</Strong>,
              })}
            </h3>

            <HuntingGroupGrid />
          </FeatureSection>

          <p className="mb-8 text-center text-2xl">{i18n.andMore}</p>

          <ComparisonTable />

          <section>
            <h2 className="text-onSurface text-center text-[48px] md:text-[64px]">
              {templateMessage(i18n.footer, {
                exevopro: <Gradient>Exevo Pro</Gradient>,
              })}
            </h2>

            <div className="lgr:gap-40 lgr:justify-center my-10 grid gap-8 md:my-14 md:flex md:items-center md:justify-around md:gap-8">
              <ul className="mx-auto grid w-fit list-disc gap-1.5 md:mx-0 md:ml-8">
                <li>{i18n.no.subscriptions}</li>
                <li>{i18n.no.creditCard}</li>
                <li>{i18n.no.extraFees}</li>
              </ul>

              <div>
                <div className="mb-2 flex flex-col items-center gap-1 md:mb-0 md:flex-row md:gap-3">
                  <p className="flex flex-nowrap items-center justify-center gap-2 text-xl md:justify-start">
                    {i18n.only}
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

                  <p className="text-tsm flex flex-nowrap items-center justify-center opacity-75 md:justify-start">
                    ({i18n.or}
                    <Image
                      src={pixSrc}
                      alt="Pix"
                      unoptimized
                      width={16}
                      height={16}
                      className="mx-1 select-none"
                    />
                    <strong className="whitespace-nowrap text-base">
                      R$ 45,00
                    </strong>
                    )
                  </p>
                </div>

                <p className="text-center text-xl">
                  {templateMessage(i18n.payOnce, {
                    forever: (
                      <strong className="whitespace-nowrap text-[32px]">
                        {i18n.forever}
                      </strong>
                    ),
                  })}
                </p>
              </div>
            </div>

            <NextLink href={routes.DASHBOARD.ROOT}>
              <Button className="mx-auto mt-8 block w-fit">
                {i18n.footerCTA}
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
