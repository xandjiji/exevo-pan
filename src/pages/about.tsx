import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import styled from 'styled-components'
import { Main as BaseMain } from 'templates'
import AboutContent from 'modules/About'
import { KsuData } from 'modules/About/types'
import { GetStaticProps } from 'next'
import { endpoints } from 'Constants'

const Main = styled(BaseMain)`
  header {
    position: fixed;
  }

  main {
    margin-top: 60px;
    scroll-padding-top: 104px;
  }

  @media (min-width: 768px) {
    main {
      scroll-padding-top: unset;
    }
  }
`

export default function About({
  characterData,
}: {
  characterData: KsuData
}): JSX.Element {
  const { t } = useTranslation('about')

  return (
    <div>
      <Head>
        <title>{t('Meta.title')}</title>
        <meta name="title" content={t('Meta.title')} />
        <meta property="og:site_name" content={t('Meta.title')} />
        <meta property="og:title" content={t('Meta.title')} />
        <meta property="twitter:title" content={t('Meta.title')} />

        <meta name="description" content={t('Meta.description')} />
        <meta property="twitter:description" content={t('Meta.description')} />
        <meta property="og:description" content={t('Meta.description')} />
        <meta property="og:type" content="website" />
      </Head>

      <Main>
        <AboutContent characterData={characterData} />
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const result = await fetch(`${endpoints.TIBIADATA}/Ksu.json`)

  const ksuData = (await result.json()) as KsuData

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'about'])),
      characterData: ksuData,
    },
  }
}
