import { useRef, useCallback } from 'react'
import PostCard from './PostCard'
import { useFetchPosts } from '../../../contexts/useFetchPosts'
import * as S from './styles'
import { PostGridViewProps } from './types'

const PostGridView = ({
  seed,
  postList,
  requestStatus,
  observerRef,
}: PostGridViewProps): JSX.Element => {
  const noResults = requestStatus === 'EXHAUSTED' && !postList.length

  return (
    <S.Grid>
      {postList.map((postData, index) => (
        <PostCard key={postData.slug} seed={seed + index} postData={postData} />
      ))}
      {noResults && (
        <S.EmptyState
          text={{
            content: 'No posts were found',
            size: 32,
          }}
        />
      )}
      <S.LazyWatcher ref={observerRef} />
    </S.Grid>
  )
}

const PostGridController = (): JSX.Element => {
  const { postList, backgroundSeed, requestStatus, fetchNextPage } =
    useFetchPosts()

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
      seed={backgroundSeed}
      requestStatus={requestStatus}
      observerRef={requestStatus === 'EXHAUSTED' ? undefined : lastFactRef}
    />
  )
}

export default PostGridController
