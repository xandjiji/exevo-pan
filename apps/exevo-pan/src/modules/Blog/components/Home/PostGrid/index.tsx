import { useRef, useCallback } from 'react'
import NextLink from 'next/link'
import { routes } from 'Constants'
import { useFetchPosts } from '../../../contexts/useFetchPosts'
import * as S from './styles'
import { PostGridViewProps } from './types'

const PostGridView = ({
  postList,
  observerRef,
}: PostGridViewProps): JSX.Element => (
  <S.Grid>
    {postList.map(({ title, date, slug, description, tags }) => (
      <div key={slug} style={{ marginBottom: 60 }}>
        <h2>{title}</h2>
        <h2>{date}</h2>
        <NextLink href={`${routes.BLOG}/${slug}`}>Go to</NextLink>
        <h2>{slug}</h2>
        <h2>{description}</h2>
        <h2>[{tags.join(', ')}]</h2>
      </div>
    ))}
    <div ref={observerRef} />
  </S.Grid>
)

const PostGridController = (): JSX.Element => {
  const { postList, requestStatus, fetchNextPage } = useFetchPosts()

  const observer = useRef<IntersectionObserver | null>(null)
  const lastFactRef = useCallback(
    (node) => {
      observer.current?.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          fetchNextPage()
        }
      })
      if (node) observer.current?.observe(node)
    },
    [fetchNextPage],
  )

  return (
    <PostGridView
      postList={postList}
      observerRef={requestStatus === 'EXHAUSTED' ? undefined : lastFactRef}
    />
  )
}

export default PostGridController
