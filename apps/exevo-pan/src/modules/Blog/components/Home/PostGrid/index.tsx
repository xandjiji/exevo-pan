import { useRef, useCallback } from 'react'
import PostCard from './PostCard'
import { useFetchPosts } from '../../../contexts/useFetchPosts'
import * as S from './styles'
import { PostGridViewProps } from './types'

const PostGridView = ({
  postList,
  observerRef,
}: PostGridViewProps): JSX.Element => (
  <S.Grid>
    {postList.map((postData) => (
      <PostCard key={postData.slug} postData={postData} />
    ))}
    <S.LazyWatcher ref={observerRef} />
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
