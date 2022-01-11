import path from 'path'
import fs from 'fs'
import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { POSTS_PATH, postFilePaths } from 'utils/mdx'

const components = {
  Button: dynamic(() => import('components/Atoms/Button')),
}

type Props = {
  mdxSource: MDXRemoteSerializeResult
}

export default function PostPage({ mdxSource }: Props): JSX.Element {
  return (
    <body>
      <header>
        <nav>
          <ul>
            <li>nav 1</li>
            <li>nav 2</li>
          </ul>
        </nav>
      </header>
      <main>
        <MDXRemote {...mdxSource} components={components} />
      </main>
    </body>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params?.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const mdxSource = await serialize(source as unknown as string)

  return {
    props: {
      mdxSource,
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
