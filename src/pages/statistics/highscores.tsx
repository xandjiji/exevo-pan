import Head from 'next/head'
import { Title, Description } from 'components/Meta'
import { Main } from 'templates'
import { Header, HighscoresGrid } from 'modules/Statistics'

export default function Statistics(): JSX.Element {
  return (
    <div>
      <Head>
        <Title content="Exevo Pan - Highscores" />
        <Description content="See rankings for the highest bids, top levels and best skills on Tibia Char Bazaar!" />
      </Head>

      <Main>
        <main>
          <Header />
          <HighscoresGrid />
        </main>
      </Main>
    </div>
  )
}
