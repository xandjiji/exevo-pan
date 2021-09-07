import Head from 'next/head'
import { Main } from 'templates'
import { Header, SearchGrid } from 'modules/LibertabraWar'
import { endpoints, paths } from 'Constants'

export default function LibertabraWar(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Exevo Pan - Search characters</title>
        <meta name="title" content="Exevo Pan - Search characters" />
        <meta property="og:site_name" content="Exevo Pan - Search characters" />
        <meta property="og:title" content="Exevo Pan - Search characters" />
        <meta
          property="twitter:title"
          content="Exevo Pan - Search characters"
        />

        <meta
          name="description"
          content="Search for all characters fighting in Libertabra War!"
        />
        <meta
          property="twitter:description"
          content="Search for all characters fighting in Libertabra War!"
        />
        <meta
          property="og:description"
          content="Search for all characters fighting in Libertabra War!"
        />
        <meta property="og:type" content="website" />

        <link
          rel="preload"
          href={`${endpoints.WAR_DATA}${paths.PUNE_DATA}`}
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${endpoints.WAR_DATA}${paths.BONES_DATA}`}
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>

      <Main>
        <main>
          <Header />
          <SearchGrid />
        </main>
      </Main>
    </div>
  )
}
