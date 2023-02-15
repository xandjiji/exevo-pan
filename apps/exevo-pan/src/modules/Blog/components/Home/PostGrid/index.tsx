import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { useInfiniteScroll } from 'hooks'
import EmptyState from 'components/EmptyState'
import PostCard from './PostCard'
import { useFetchPosts } from '../../../contexts/useFetchPosts'
import { PostGridViewProps } from './types'

const PostGridView = ({
  postList,
  requestStatus,
  observerRef,
}: PostGridViewProps) => {
  const {
    translations: { blog },
  } = useTranslations()

  const noResults = requestStatus !== 'LOADING' && !postList.length

  return (
    <div
      className={clsx(
        'relative grid h-full flex-grow grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8',
        noResults ? 'self-center justify-self-center' : 'after:col-span-full',
      )}
    >
      {postList.map((postData) => (
        <PostCard key={postData.slug} postData={postData} />
      ))}
      {noResults && (
        <EmptyState variant="large" text={blog.PostGrid.emptyMessage} />
      )}
      {observerRef && (
        <div
          ref={observerRef}
          role="none"
          className="absolute bottom-20 left-0"
        />
      )}
    </div>
  )
}

const PostGridController = () => {
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
