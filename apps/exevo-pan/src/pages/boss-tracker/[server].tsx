import Head from 'next/head'
import { Main } from 'templates'
import { BossesClient } from 'services'
import { FieldsClient } from 'services/server'
import { GetStaticPaths, GetStaticProps } from 'next'
import BossTracker, { heroSrc } from 'modules/BossTracker'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl, buildPageTitle, sortBossesBy, MILLISECONDS_IN } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, bosses } from 'locales'

type BossTrackerProps = {
  serverOptions: Option[]
  bossChances: BossChances
  recentlyAppeared: BossStats[]
}

const MAX_RECENTLY_KILLED_TIME_DIFF = 2 * MILLISECONDS_IN.DAY

export default function BossTrackerPage(args: BossTrackerProps) {
  const { bossChances } = args
  const pagePath = `${routes.BOSS_TRACKER}/${bossChances.server}`
  const pageUrl = buildUrl(pagePath)

  const { translations } = useTranslations()

  const pageTitle = buildPageTitle(translations.bosses.Meta.title)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          content={translations.bosses.Meta.description}
        />
        <meta
          property="twitter:description"
          content={translations.bosses.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.bosses.Meta.description}
        />
        <meta property="og:type" content="website" />

        <meta key="preview-1" property="og:image" content={heroSrc} />
        <meta key="preview-2" property="twitter:image" content={heroSrc} />

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

      <Main>
        <BossTracker {...args} />
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { server } = params as { server: string }

  const [serverOptions, bossChances] = await Promise.all([
    await FieldsClient.fetchServerOptions({ active: true }),
    await BossesClient.fetchServerBossChances(server),
  ])

  return {
    props: {
      serverOptions,
      bossChances: {
        ...bossChances,
        bosses: [...bossChances.bosses].sort(sortBossesBy.chance),
      },
      recentlyAppeared: bossChances.bosses
        .filter(({ lastAppearence }) => {
          if (!lastAppearence) return false

          return +new Date() - lastAppearence <= MAX_RECENTLY_KILLED_TIME_DIFF
        })
        .sort(sortBossesBy.recentlyAppeared),
      translations: {
        common: common[locale as RegisteredLocale],
        bosses: bosses[locale as RegisteredLocale],
      },
      locale,
    },
    revalidate: 60 * 30,
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const activeServers = await FieldsClient.fetchServerOptions({
    active: true,
  })

  const paths =
    locales
      ?.map((locale) =>
        activeServers.map(({ name }) => ({
          params: { server: name },
          locale,
        })),
      )
      .flat() ?? []

  return {
    paths,
    fallback: false,
  }
}
