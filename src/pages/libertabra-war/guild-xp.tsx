import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Main } from 'templates'
import { Header, GuildXPGrid } from 'modules/LibertabraWar'
import { ManageDataClient } from 'services'
import { GetStaticProps } from 'next'
import { buildUrl } from 'utils'
import { routes } from 'Constants'

const pageUrl = buildUrl(routes.LIBERTABRA_WAR_GUILD_XP)

export default function LibertabraWar({
  warData,
}: {
  warData: WarStatistics
}): JSX.Element {
  const { t } = useTranslation('war')

  return (
    <div>
      <Head>
        <title>{t('Meta.GuildXP.title')}</title>
        <meta name="title" content={t('Meta.GuildXP.title')} />
        <meta property="og:site_name" content={t('Meta.GuildXP.title')} />
        <meta property="og:title" content={t('Meta.GuildXP.title')} />
        <meta property="twitter:title" content={t('Meta.GuildXP.title')} />

        <meta name="description" content={t('Meta.GuildXP.description')} />
        <meta
          property="twitter:description"
          content={t('Meta.GuildXP.description')}
        />
        <meta
          property="og:description"
          content={t('Meta.GuildXP.description')}
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const warData = await ManageDataClient.fetchWarStatisticsData()

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'war'])),
      warData,
    },
    revalidate: 60,
  }
}
