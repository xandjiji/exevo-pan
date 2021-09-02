import Head from 'next/head'
import { Main } from 'templates'
import { Header, GuildXPGrid } from 'modules/LibertabraWar'
import { endpoints, paths } from 'Constants'

export default function LibertabraWar(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Exevo Pan - Libertabra War Guild XP</title>
        <meta name="title" content="Exevo Pan - Libertabra War Guild XP" />
        <meta
          property="og:site_name"
          content="Exevo Pan - Libertabra War Guild XP"
        />
        <meta
          property="og:title"
          content="Exevo Pan - Libertabra War Guild XP"
        />
        <meta
          property="twitter:title"
          content="Exevo Pan - Libertabra War Guild XP"
        />

        <meta
          name="description"
          content="Compare daily guild XP differences from Libertabra War!"
        />
        <meta
          property="twitter:description"
          content="Compare daily guild XP differences from Libertabra War!"
        />
        <meta
          property="og:description"
          content="Compare daily guild XP differences from Libertabra War!"
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
          <GuildXPGrid />
        </main>
      </Main>
    </div>
  )
}
