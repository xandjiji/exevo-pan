import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Main } from 'templates'
import { Header, Top10Grid } from 'modules/LibertabraWar'
import { ManageDataClient } from 'services'
import { GetStaticProps } from 'next'

export default function LibertabraWar({
  warData,
}: {
  warData: WarStatistics
}): JSX.Element {
  const { t } = useTranslation('war')

  return (
    <div>
      <Head>
        <title>{t('Meta.Top10.title')}</title>
        <meta name="title" content={t('Meta.Top10.title')} />
        <meta property="og:site_name" content={t('Meta.Top10.title')} />
        <meta property="og:title" content={t('Meta.Top10.title')} />
        <meta property="twitter:title" content={t('Meta.Top10.title')} />

        <meta name="description" content={t('Meta.Top10.description')} />
        <meta
          property="twitter:description"
          content={t('Meta.Top10.description')}
        />
        <meta property="og:description" content={t('Meta.Top10.description')} />
        <meta property="og:type" content="website" />
      </Head>

      <Main>
        <main>
          <Header />
          <Top10Grid warData={warData} />
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
    revalidate: 600,
  }
}
