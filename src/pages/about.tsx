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
  return (
    <div>
      <Head>
        <title>Exevo Pan - About us</title>
        <meta name="title" content="Exevo Pan - About us" />
        <meta property="og:site_name" content="Exevo Pan - About us" />
        <meta property="og:title" content="Exevo Pan - About us" />
        <meta property="twitter:title" content="Exevo Pan - About us" />

        <meta
          name="description"
          content="About Exevo Pan and our contact info"
        />
        <meta
          property="twitter:description"
          content="About Exevo Pan and our contact info"
        />
        <meta
          property="og:description"
          content="About Exevo Pan and our contact info"
        />
        <meta property="og:type" content="website" />
      </Head>

      <Main>
        <AboutContent characterData={characterData} />
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const result = await fetch(`${endpoints.TIBIADATA}/Ksu.json`)

  const ksuData = (await result.json()) as KsuData

  return {
    props: { characterData: ksuData },
  }
}
