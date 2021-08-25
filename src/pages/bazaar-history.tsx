import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Main } from 'templates'
import { BazaarHistory as BazaarHistoryGrid } from 'modules/BazaarAuctions'
import { GetStaticProps } from 'next'

export default function BazaarHistory(): JSX.Element {
  const { t } = useTranslation()

  return (
    <div>
      <Head>
        <title>{t('HistoryPage.Meta.title')}</title>
        <meta name="title" content={t('HistoryPage.Meta.title')} />
        <meta property="og:site_name" content={t('HistoryPage.Meta.title')} />
        <meta property="og:title" content={t('HistoryPage.Meta.title')} />
        <meta property="twitter:title" content={t('HistoryPage.Meta.title')} />

        <meta name="description" content={t('HistoryPage.Meta.description')} />
        <meta
          property="twitter:description"
          content={t('HistoryPage.Meta.description')}
        />
        <meta
          property="og:description"
          content={t('HistoryPage.Meta.description')}
        />
        <meta property="og:type" content="website" />
      </Head>

      <Main>
        <BazaarHistoryGrid />
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
})
