import { useRef, useCallback } from 'react'
import EmptyState from 'components/EmptyState'
import PostCard from './PostCard'
import { useFetchPosts } from '../../../contexts/useFetchPosts'
import * as S from './styles'
import { PostGridViewProps } from './types'

const PostGridView = ({
  postList,
  requestStatus,
  observerRef,
}: PostGridViewProps): JSX.Element => {
  const noResults = requestStatus !== 'LOADING' && !postList.length

  return (
    <S.Grid empty={noResults}>
      {postList.map((postData) => (
        <PostCard key={postData.slug} as="li" postData={postData} />
      ))}
      {noResults && (
        <EmptyState
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
      requestStatus={requestStatus}
      observerRef={requestStatus === 'EXHAUSTED' ? undefined : lastFactRef}
    />
  )
}

export default PostGridController
