import Head from 'next/head'
import { Main } from 'templates'
import { Header, Top10Grid } from 'modules/LibertabraWar'
import { endpoints, paths } from 'Constants'

export default function LibertabraWar(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Exevo Pan - Libertabra War Rankings</title>
        <meta name="title" content="Exevo Pan - Libertabra War Rankings" />
        <meta
          property="og:site_name"
          content="Exevo Pan - Libertabra War Rankings"
        />
        <meta
          property="og:title"
          content="Exevo Pan - Libertabra War Rankings"
        />
        <meta
          property="twitter:title"
          content="Exevo Pan - Libertabra War Rankings"
        />

        <meta
          name="description"
          content="Check out top frags and most deaths from Libertabra War!"
        />
        <meta
          property="twitter:description"
          content="Check out top frags and most deaths from Libertabra War!"
        />
        <meta
          property="og:description"
          content="Check out top frags and most deaths from Libertabra War!"
        />
        <meta property="og:type" content="website" />

        <link
          rel="preload"
          href={`${endpoints.WAR_DATA}${paths.WAR_STATISTICS}`}
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>

      <Main>
        <main>
          <Header />
          <Top10Grid />
        </main>
      </Main>
    </div>
  )
}
