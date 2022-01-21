import { Post, parseMarkdownSections } from 'modules/Blog'
import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'
import { buildUrl } from 'utils'
import Head from 'next/head'
import { BlogClient, TibiaDataClient } from 'services'
import { Main } from 'templates'
import { routes, authors } from 'Constants'
import { common } from 'locales'

const components = {
  h1: 'h2',
  h2: Post.Section,
  wrapper: Post.Wrapper,
  Button: dynamic(() => import('components/Atoms/Button')),
  table: Post.Table,
}

type Props = {
  mdxSource: MDXRemoteSerializeResult
  metaData: Record<string, string>
  author: AuthorData
  translator: AuthorData | false
  translations: any
}

type PathItem = {
  params: {
    slug: string
  }
  locale: string
}

export default function PostPage({
  mdxSource,
  metaData,
  author,
  translator,
  translations,
}: Props): JSX.Element {
  const postRoute = `${routes.BLOG}/${metaData.slug}`
  const pageUrl = buildUrl(postRoute)

  const src = JSON.stringify(mdxSource)

  const titles = parseMarkdownSections(src)

  const [day, month, year] = metaData.date.split('-')
  return (
    <>
      <Head>
        <title>{metaData.title} - Exevo Pan</title>
        <meta name="title" content={metaData.title} />
        <meta property="og:site_name" content={metaData.title} />
        <meta property="og:title" content={metaData.title} />
        <meta property="twitter:title" content={metaData.title} />

        <meta name="description" content={metaData.description} />
        <meta property="twitter:description" content={metaData.description} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <meta
          key="preview-1"
          property="og:image"
          content={metaData.thumbnail}
        />
        <meta
          key="preview-2"
          property="twitter:image"
          content={metaData.thumbnail}
        />
        <meta
          key="preview-3"
          property="twitter:card"
          content={metaData.thumbnail}
        />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link rel="alternate" hrefLang="pt" href={buildUrl(postRoute, 'pt')} />
        <link rel="alternate" hrefLang="es" href={buildUrl(postRoute, 'es')} />
        <link rel="alternate" hrefLang="pl" href={buildUrl(postRoute, 'pl')} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            html {
                scroll-padding-top: 104px;
            }
         `,
          }}
        />
      </Head>

      <Main>
        <Post.Hero
          title={metaData.title}
          subtitle={`${
            translations.common.FullMonth[+month - 1]
          } ${day}, ${year}`}
          src={metaData.thumbnail}
        />

        <Post.Layout>
          <Post.Layout.Left>
            <Post.Breadcrumbs postTitle={metaData.title} />
            <Post.Pillar titles={titles} />
            <Post.Tags tags={metaData.tags as unknown as string[]} />
          </Post.Layout.Left>

          <Post.Layout.Center>
            <MDXRemote {...mdxSource} components={components} />
            <Post.Authors author={author} translator={translator} />
          </Post.Layout.Center>

          <Post.Layout.Right>
            <Post.Newsletter />
          </Post.Layout.Right>
        </Post.Layout>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string
  const source = await BlogClient.getStaticPost({
    slug,
    locale: locale as string,
  })
  const parsedData = matter(source)

  let { content, data } = parsedData
  let mdxSource

  try {
    mdxSource = await serialize(content)
  } catch {
    const fallBackSource = await BlogClient.getStaticPost({
      slug,
    })
    const fallbackParsedData = matter(fallBackSource)

    content = fallbackParsedData.content
    data = fallbackParsedData.data

    mdxSource = await serialize(content)
  }

  const author: AuthorData = {
    ...((await TibiaDataClient.character(data.author.name)) || authors.Ksu),
    outfitSrc: data.author.outfit,
  }

  let translator: AuthorData | false = false
  if (data.translator) {
    const characterData = await TibiaDataClient.character(data.translator.name)
    if (characterData) {
      translator = {
        ...characterData,
        outfitSrc: data.translator.outfit,
      }
    } else {
      translator =
        authors[data.translator.name as keyof typeof authors] ?? false
    }
  }

  return {
    props: {
      mdxSource,
      metaData: { ...data, slug },
      author,
      translator,
      translations: {
        common: common[locale as RegisteredLocale],
      },
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paginationOptions: PaginationOptions = { pageIndex: 0, pageSize: 999 }
  const { page: posts } = await BlogClient.queryBlog(
    { paginationOptions },
    undefined,
    true,
  )

  const paths: PathItem[] = []
  posts.forEach(({ slug }) => {
    const pathItem = {
      params: {
        slug,
      },
    }

    locales?.forEach((locale) => {
      paths.push({ ...pathItem, locale })
    })
  })

  return {
    paths,
    fallback: false,
  }
}
