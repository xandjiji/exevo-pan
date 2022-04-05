import { useTranslations } from 'contexts/useTranslation'
import { useInfiniteScroll } from 'hooks'
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
  const {
    translations: { blog },
  } = useTranslations()

  const noResults = requestStatus !== 'LOADING' && !postList.length

  return (
    <S.Grid empty={noResults}>
      {postList.map((postData) => (
        <PostCard key={postData.slug} postData={postData} />
      ))}
      {noResults && (
        <EmptyState
          text={{
            content: blog.PostGrid.emptyMessage,
            size: 32,
          }}
        />
      )}
      {observerRef && <S.LazyWatcher ref={observerRef} />}
    </S.Grid>
  )
}

const PostGridController = (): JSX.Element => {
  const { postList, requestStatus, fetchNextPage } = useFetchPosts()

  const lastFactRef = useInfiniteScroll(fetchNextPage)

  return (
    <PostGridView
      postList={postList}
      requestStatus={requestStatus}
      observerRef={requestStatus === 'EXHAUSTED' ? undefined : lastFactRef}
    />
  )
}

export default PostGridController
