import path from 'path'
import fs from 'fs'
import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'
import { buildUrl } from 'utils'
import { POSTS_PATH, postFilePaths } from 'utils/mdx'
import Head from 'next/head'
import { Main } from 'templates'
import { routes } from 'Constants'
import { common } from 'locales'

const components = {
  Button: dynamic(() => import('components/Atoms/Button')),
}

type Props = {
  mdxSource: MDXRemoteSerializeResult
  metaData: Record<string, string>
}

export default function PostPage({ mdxSource, metaData }: Props): JSX.Element {
  const postRoute = `${routes.BLOG}/${metaData.slug}`
  const pageUrl = buildUrl(postRoute)
  return (
    <div>
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

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link rel="alternate" hrefLang="pt" href={buildUrl(postRoute, 'pt')} />
        <link rel="alternate" hrefLang="es" href={buildUrl(postRoute, 'es')} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      </Head>

      <Main>
        <MDXRemote {...mdxSource} components={components} />
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)
  const mdxSource = await serialize(content)

  return {
    props: {
      mdxSource,
      metaData: { ...data, slug },
      translations: {
        common: common[locale as RegisteredLocale],
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    .map((filename) => filename.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
