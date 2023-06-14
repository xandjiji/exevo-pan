import { Home } from 'modules/Blog'
import { DEFAULT_PAGINATION_OPTIONS } from 'shared-utils/dist/contracts/BlogFilters/defaults'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl, buildPageTitle, loadRawSrc } from 'utils'
import Head from 'next/head'
import { BlogClient, PreviewImageClient } from 'services'
import { Main, Hero } from 'templates'
import { routes, jsonld } from 'Constants'
import { common, blog } from 'locales'

const pageUrl = buildUrl(routes.BLOG)

type Props = {
  initialPosts: BlogPost[]
}

export default function PostPage({ initialPosts }: Props) {
  const translations = useTranslations()

  const pageTitle = buildPageTitle(translations.blog.Meta.title)

  const heroSrc = '/blog/thumbnails/posts.png'
  const previewSrc = PreviewImageClient.getSrc({
    title: 'Blog',
    imgSrc: loadRawSrc(heroSrc),
  })

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta name="description" content={translations.blog.Meta.description} />
        <meta
          property="twitter:description"
          content={translations.blog.Meta.description}
        />
        <meta
          property="og:description"
          content={translations.blog.Meta.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

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

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Main>
        <Hero title={translations.blog.Meta.title} src={heroSrc} offset />
        <Home
          initialIndex={DEFAULT_PAGINATION_OPTIONS.pageIndex + 1}
          initialPosts={initialPosts}
        />
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const allBlogPosts = await BlogClient.getEveryPostLocale({
    pageSize: DEFAULT_PAGINATION_OPTIONS.pageSize,
  })

  return {
    props: {
      initialPosts: allBlogPosts[locale as RegisteredLocale],
      translations: {
        common: common[locale as RegisteredLocale],
        blog: blog[locale as RegisteredLocale],
      },
    },
  }
}
