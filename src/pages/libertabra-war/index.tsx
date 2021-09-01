import Head from 'next/head'
import { Main } from 'templates'
import { Header, OverallGrid } from 'modules/LibertabraWar'
import { endpoints, paths } from 'Constants'

export default function LibertabraWar(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Exevo Pan - Libertabra War</title>
        <meta name="title" content="Exevo Pan - Libertabra War" />
        <meta property="og:site_name" content="Exevo Pan - Libertabra War" />
        <meta property="og:title" content="Exevo Pan - Libertabra War" />
        <meta property="twitter:title" content="Exevo Pan - Libertabra War" />

        <meta
          name="description"
          content="Follow live data and statistics from Libertabra War!"
        />
        <meta
          property="twitter:description"
          content="Follow live data and statistics from Libertabra War!"
        />
        <meta
          property="og:description"
          content="Follow live data and statistics from Libertabra War!"
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
          <OverallGrid />
        </main>
      </Main>
    </div>
  )
}
