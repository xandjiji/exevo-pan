import Head from 'next/head'
import { Main } from 'templates'
import { DrawerFieldsClient, BossesClient } from 'services'
import { GetStaticPaths, GetStaticProps } from 'next'
import { SpritePortrait } from 'components/Atoms'
import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { buildUrl, buildPageTitle, sortBossesBy, loadBossSrc } from 'utils'
import { endpoints, routes, jsonld, urlParameters } from 'Constants'
import { common } from 'locales'

/* @ ToDo: remove unused imports */

const pageUrl = buildUrl(routes.BOSS_TRACKER)

type BossTrackerProps = {
  activeServers: string[]
  bossChances: BossChances
}

/* @ ToDo: i18n */

export default function BossTracker({
  activeServers,
  bossChances,
}: BossTrackerProps) {
  /* const { translations } = useTranslations()
  const { locale } = useRouter() */

  /* const pageTitle = buildPageTitle(translations.homepage.Meta.title) */
  const pageTitle = 'Boss Tracker'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          /* content={translations.homepage.Meta.description} */
        />
        <meta
          property="twitter:description"
          /* content={translations.homepage.Meta.description} */
        />
        <meta
          property="og:description"
          /* content={translations.homepage.Meta.description} */
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.BOSS_TRACKER, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.BOSS_TRACKER, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.BOSS_TRACKER, 'pl')}
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
        {bossChances.bosses.map(({ name, currentChance }) => (
          <div
            className="inner-container mb-4 flex items-center gap-2"
            key={name}
          >
            <SpritePortrait
              src={loadBossSrc(name)}
              alt={name}
              offset
              width={64}
              height={64}
            />
            <div>
              <h1>{name}</h1>
              <p>
                {currentChance ? `${(currentChance * 100).toFixed(2)}%` : 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { server } = params as { server: string }

  const [activeServers, bossChances] = await Promise.all([
    await DrawerFieldsClient.fetchActiveServers(),
    await BossesClient.fetchServerBossChances(server),
  ])

  return {
    props: {
      activeServers,
      bossChances: {
        ...bossChances,
        bosses: [...bossChances.bosses].sort(sortBossesBy.chance),
      },
      translations: {
        common: common[locale as RegisteredLocale],
      },
      locale,
    },
    revalidate: 60 * 30,
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const activeServers = await DrawerFieldsClient.fetchActiveServers()

  const paths =
    locales
      ?.map((locale) =>
        activeServers.map((server) => ({
          params: { server },
          locale,
        })),
      )
      .flat() ?? []

  return {
    paths,
    fallback: false,
  }
}
