import { Post, Links, parseMarkdownSections } from 'modules/Blog'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import dynamic from 'next/dynamic'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'
import { buildUrl, buildPageTitle, loadRawSrc } from 'utils'
import Head from 'next/head'
import { BlogClient, PreviewImageClient } from 'services'
import { Main } from 'templates'
import { routes, links } from 'Constants'
import { common, blog } from 'locales'

const components = {
  ...Post.styles,
  ...Links,
  wrapper: Post.ContentWrapper,
  h1: 'h2',
  Image: Post.Image,
  Button: dynamic(() => import('components/Atoms/Button')),
  TibiaCoin: dynamic(() => import('components/Atoms/Text/TibiaCoin')),
  Sprite: dynamic(() => import('modules/Blog/components/Post/custom/Sprite')),
  Charm: dynamic(() => import('modules/Blog/components/Post/custom/Charm')),
  TranslationAlert: dynamic(
    () => import('modules/Blog/components/Post/custom/TranslationAlert'),
  ),
  LowBlowCalculator: dynamic(
    () => import('modules/Calculators/modules/CharmDamage/blog'),
  ),
  ContactSection: dynamic(
    () => import('modules/Blog/components/Post/custom/ContactSection'),
  ),
  TopSpenders: dynamic(
    () => import('modules/Blog/components/Post/custom/TopSpenders'),
  ),
  StoreItemDistribution: dynamic(
    () => import('modules/Blog/components/Post/custom/StoreItemDistribution'),
  ),
  TopCosmetics: dynamic(
    () => import('modules/Blog/components/Post/custom/TopCosmetics'),
  ),
  GoodAuction: dynamic(
    () => import('modules/Blog/components/Post/custom/HighlightAuctions/good'),
  ),
  BadAuction: dynamic(
    () => import('modules/Blog/components/Post/custom/HighlightAuctions/bad'),
  ),
}

type Props = {
  mdxSource: MDXRemoteSerializeResult
  metaData: BlogPost
  recentPosts: BlogPost[]
  translations: any
  locale: RegisteredLocale
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
  recentPosts,
  locale,
}: Props) {
  const { translations } = useTranslations()

  const postRoute = `${routes.BLOG}/${metaData.slug}`
  const pageUrl = buildUrl(postRoute)

  const src = JSON.stringify(mdxSource)

  const titles = parseMarkdownSections(src)

  const [day, month, year] = metaData.date.toString().split('-')
  const tags = metaData.tags as unknown as string[]

  const previewSrc = PreviewImageClient.getSrc({
    title: metaData.title,
    imgSrc: loadRawSrc(metaData.thumbnail),
  })

  return (
    <>
      <Head>
        <title>{buildPageTitle(metaData.title)}</title>
        <meta name="title" content={metaData.title} />
        <meta property="og:title" content={metaData.title} />
        <meta property="twitter:title" content={metaData.title} />

        <meta name="description" content={metaData.description} />
        <meta property="twitter:description" content={metaData.description} />
        <meta property="og:description" content={metaData.description} />
        {tags.map((tag) => (
          <meta
            key={tag}
            property="article:tag"
            content={translations.common.BlogTags[tag]}
          />
        ))}

        <meta property="og:type" content="article" />
        <meta property="article:author" content={metaData.author as string} />
        <meta
          property="article:published_time"
          content={`${year}-${month}-${day}`}
        />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <meta key="preview-1" property="og:image" content={previewSrc} />
        <meta key="preview-2" property="twitter:image" content={previewSrc} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link rel="alternate" hrefLang="pt" href={buildUrl(postRoute, 'pt')} />
        <link rel="alternate" hrefLang="es" href={buildUrl(postRoute, 'es')} />
        <link rel="alternate" hrefLang="pl" href={buildUrl(postRoute, 'pl')} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'Article',
              url: buildUrl(postRoute, locale),
              image: previewSrc,
              headline: metaData.title,
              datePublished: `${year}-${month}-${day}`,
              keywords: tags
                .map((tag) => translations.common.BlogTags[tag])
                .join(', '),
              description: metaData.description,
              publisher: {
                '@context': 'http://schema.org',
                '@type': 'Organization',
                name: 'Exevo Pan',
                logo: {
                  '@context': 'http://schema.org',
                  '@type': 'ImageObject',
                  url: 'https://i.imgur.com/OEGEUK0.png',
                  width: '150',
                  height: '100',
                },
              },
              author: {
                '@context': 'http://schema.org',
                '@type': 'Person',
                name: metaData.author,
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': links.CANONICAL,
              },
            }),
          }}
        />

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
        <article>
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
              <Post.Tags tags={tags} />
            </Post.Layout.Left>

            <Post.Layout.Center>
              <MDXRemote {...mdxSource} components={components} />
              <Post.Authors
                author={metaData.author}
                translator={metaData.translator}
              />
            </Post.Layout.Center>

            <Post.Layout.Right>
              <Post.Newsletter />
              <Post.PostGrid
                gridTitle={translations.blog.recentPosts}
                posts={recentPosts}
              />
            </Post.Layout.Right>
          </Post.Layout>
        </article>
      </Main>
    </>
  )
}

const RECENT_POSTS_AMOUNT = 3

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

  const allPostData = await BlogClient.getEveryPostLocale({
    pageSize: RECENT_POSTS_AMOUNT,
    excludedSlug: slug,
  })

  const recentPosts: BlogPost[] = allPostData[locale as RegisteredLocale]

  return {
    props: {
      mdxSource,
      metaData: { ...data, slug },
      recentPosts,
      translations: {
        common: common[locale as RegisteredLocale],
        blog: blog[locale as RegisteredLocale],
      },
      locale: locale as RegisteredLocale,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const allPostData = await BlogClient.getEveryPostLocale({})

  const paths: PathItem[] = []
  allPostData.en.forEach(({ slug }) => {
    locales?.forEach((locale) => {
      paths.push({
        params: {
          slug,
        },
        locale,
      })
    })
  })

  return {
    paths,
    fallback: false,
  }
}
