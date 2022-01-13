import { Home } from 'modules/Blog'
import { GetStaticProps } from 'next'
import { buildUrl } from 'utils'
import Head from 'next/head'
import { BlogClient } from 'services'
import { Main } from 'templates'
import { routes } from 'Constants'
import { common } from 'locales'

const pageUrl = buildUrl(routes.BLOG)

type Props = {
  initialPosts: BlogPost[]
}

export default function PostPage({ initialPosts }: Props): JSX.Element {
  /* @ ToDo: i18n */
  const TITLE = 'Blog'
  const DESCRIPTION = 'This is the blog homepage'
  return (
    <div>
      <Head>
        <title>{TITLE} - Exevo Pan</title>
        <meta name="title" content={TITLE} />
        <meta property="og:site_name" content={TITLE} />
        <meta property="og:title" content={TITLE} />
        <meta property="twitter:title" content={TITLE} />

        <meta name="description" content={DESCRIPTION} />
        <meta property="twitter:description" content={DESCRIPTION} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.BLOG, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.BLOG, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.BLOG, 'pl')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      </Head>

      <Main>
        <Home initialPosts={initialPosts} />
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const paginationOptions: PaginationOptions = { pageIndex: 0, pageSize: 6 }
  const { page: posts } = await BlogClient.queryBlog({ paginationOptions })

  return {
    props: {
      initialPosts: posts,
      translations: {
        common: common[locale as RegisteredLocale],
      },
    },
  }
}
