import Head from 'next/head'
import { PreviewImageClient } from 'services'
import { DrawerFieldsClient, BossesClient } from 'services/server'
import { GetStaticProps } from 'next'
import { Template, Tracker } from 'modules/BossHunting'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl, buildPageTitle, sortBossesBy, MILLISECONDS_IN } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, bosses, bossTracker } from 'locales'

type BossTrackerProps = {
  serverOptions: Option[]
  bossChances: BossChances
  recentlyAppeared: BossStats[]
}

const { heroSrc } = Tracker

const MAX_RECENTLY_KILLED_TIME_DIFF = 4 * MILLISECONDS_IN.DAY

export default function BossTrackerPage(args: BossTrackerProps) {
  const { bossChances } = args
  const pagePath = `${routes.BOSSES.TRACKER}/${bossChances.server}`
  const pageUrl = buildUrl(pagePath)

  const translations = useTranslations()

  const pageName = translations.bossTracker.Meta.title
  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: heroSrc,
  })

  const pageTitle = buildPageTitle(pageName)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.bossTracker.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.bossTracker.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.bossTracker.Meta.description}
        />
        <meta property="og:type" content="website" />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link rel="alternate" hrefLang="pt" href={buildUrl(pagePath, 'pt')} />
        <link rel="alternate" hrefLang="es" href={buildUrl(pagePath, 'es')} />
        <link rel="alternate" hrefLang="pl" href={buildUrl(pagePath, 'pl')} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Template>
        <Tracker {...args} />
      </Template>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const server = 'Antica'

  const [serverOptions, bossChances] = await Promise.all([
    await DrawerFieldsClient.fetchActiveServerOptions(),
    await BossesClient.fetchServerBossChances({
      server,
      isPro: false,
      getNextDayFeroxa: true,
    }),
  ])

  bossChances.bosses.sort(sortBossesBy.chance)

  return {
    props: {
      serverOptions,
      bossChances,
      recentlyAppeared: bossChances.bosses
        .filter(({ lastAppearence }) => {
          if (!lastAppearence) return false

          return +new Date() - lastAppearence <= MAX_RECENTLY_KILLED_TIME_DIFF
        })
        .sort(sortBossesBy.recentlyAppeared),
      translations: {
        common: common[locale as RegisteredLocale],
        bosses: bosses[locale as RegisteredLocale],
        bossTracker: bossTracker[locale as RegisteredLocale],
      },
      locale,
    },
  }
}
