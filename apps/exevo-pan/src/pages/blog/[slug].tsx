import path from 'path'
import fs from 'fs'
import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { POSTS_PATH, postFilePaths } from 'utils/mdx'
import { Main } from 'templates'
import { common } from 'locales'

const components = {
  Button: dynamic(() => import('components/Atoms/Button')),
}

type Props = {
  mdxSource: MDXRemoteSerializeResult
}

export default function PostPage({ mdxSource }: Props): JSX.Element {
  return (
    <div>
      <Main>
        <MDXRemote {...mdxSource} components={components} />
      </Main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const postFilePath = path.join(POSTS_PATH, `${params?.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const mdxSource = await serialize(source as unknown as string)

  return {
    props: {
      mdxSource,
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
