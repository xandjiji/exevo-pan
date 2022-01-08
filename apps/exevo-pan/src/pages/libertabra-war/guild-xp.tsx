import Head from 'next/head'
import { Main } from 'templates'
import { Header, GuildXPGrid } from 'modules/LibertabraWar'
import { ManageDataClient } from 'services'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl } from 'utils'
import { routes } from 'Constants'
import { common, war } from 'locales'

const pageUrl = buildUrl(routes.LIBERTABRA_WAR_GUILD_XP)

export default function LibertabraWar({
  warData,
}: {
  warData: WarStatistics
}): JSX.Element {
  const { translations } = useTranslations()

  return (
    <div>
      <Head>
        <title>{translations.war.Meta.GuildXP.title}</title>
        <meta name="title" content={translations.war.Meta.GuildXP.title} />
        <meta
          property="og:site_name"
          content={translations.war.Meta.GuildXP.title}
        />
        <meta
          property="og:title"
          content={translations.war.Meta.GuildXP.title}
        />
        <meta
          property="twitter:title"
          content={translations.war.Meta.GuildXP.title}
        />

        <meta
          name="description"
          content={translations.war.Meta.GuildXP.description}
        />
        <meta
          property="twitter:description"
          content={translations.war.Meta.GuildXP.description}
        />
        <meta
          property="og:description"
          content={translations.war.Meta.GuildXP.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.LIBERTABRA_WAR_GUILD_XP, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.LIBERTABRA_WAR_GUILD_XP, 'es')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      </Head>

      <Main>
        <main>
          <Header />
          <GuildXPGrid warData={warData} />
        </main>
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    translations: {
      common: common[locale as RegisteredLocale],
      war: war[locale as RegisteredLocale],
    },
    warData: await ManageDataClient.fetchWarStatisticsData(),
  },
  revalidate: 300,
})
