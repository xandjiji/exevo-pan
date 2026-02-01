import Head from 'next/head'
import { PreviewImageClient } from 'services'
import { BossesClient, DrawerFieldsClient } from 'services/server'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Template, Tracker } from 'modules/BossHunting'
import { useTranslations } from 'contexts/useTranslation'
import { buildPageTitle, buildUrl, sortBossesBy } from 'utils'
import { jsonld, routes } from 'Constants'
import { bosses, bossTracker, common } from 'locales'

type BossTrackerProps = {
  serverOptions: Option[]
  bossChances: BossChances
  recentlyAppeared: BossStats[]
}

const { heroSrc } = Tracker

export default function BossTrackerPage(args: BossTrackerProps) {
  const { bossChances } = args
  const pagePath = `${routes.BOSSES.TRACKER}/${bossChances.server}`
  const { locale } = useRouter()
  const pageUrl = buildUrl(pagePath, locale)
  const defaultPageUrl = buildUrl(pagePath)

  const translations = useTranslations()

  const pageName = translations.bossTracker.Meta.title
  const previewSrc = PreviewImageClient.getSrc({
    title: pageName,
    imgSrc: heroSrc,
  })

  const pageTitle = buildPageTitle(`${pageName} - ${bossChances.server}`)

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

        <link rel="alternate" hrefLang="en" href={defaultPageUrl} />
        <link rel="alternate" hrefLang="pt" href={buildUrl(pagePath, 'pt')} />
        <link rel="alternate" hrefLang="es" href={buildUrl(pagePath, 'es')} />
        <link rel="alternate" hrefLang="pl" href={buildUrl(pagePath, 'pl')} />
        <link rel="alternate" hrefLang="x-default" href={defaultPageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.webApplication({
              name: `${pageName} - ${bossChances.server}`,
              url: pageUrl,
              description: translations.bossTracker.Meta.description,
            }),
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

  const [serverOptions, bossChances, recentlyAppeared] = await Promise.all([
    await DrawerFieldsClient.fetchActiveServerOptions(),
    await BossesClient.fetchServerBossChances({
      server,
      isPro: false,
      getNextDayFeroxa: true,
    }),
    await BossesClient.fetchRecentlyAppearedBosses(server),
  ])

  bossChances.bosses.sort(sortBossesBy.chance)

  return {
    props: {
      serverOptions,
      bossChances,
      recentlyAppeared,
      translations: {
        common: common[locale as RegisteredLocale],
        bosses: bosses[locale as RegisteredLocale],
        bossTracker: bossTracker[locale as RegisteredLocale],
      },
      locale,
    },
  }
}
