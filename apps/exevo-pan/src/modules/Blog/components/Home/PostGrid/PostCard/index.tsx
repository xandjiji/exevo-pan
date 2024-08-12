import { memo, useMemo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { FadeImage, Tag } from 'components/Atoms'
import { loadThumbnail } from 'utils'
import { routes } from 'Constants'
import { extractDate } from './utils'
import { PostCardProps } from './types'

const PostCard = ({ postData, className, ...props }: PostCardProps) => {
  const { common } = useTranslations()

  const { thumbnail, title, date, slug, description, tags } = postData
  const dateObject = useMemo(() => extractDate(date), [date])

  return (
    <article
      className={clsx(
        'card relative top-0 flex list-disc flex-col overflow-hidden p-0 shadow-md transition-all hover:top-[-3px] hover:shadow-lg active:shadow-inner',
        className,
      )}
      {...props}
    >
      <div className="grid-background relative grid h-[180px] w-full shrink-0 place-content-center">
        <FadeImage
          src={loadThumbnail(thumbnail)}
          alt={title}
          width={120}
          height={120}
          loading="lazy"
        />
      </div>

      <div className="flex flex-grow flex-col py-4 px-6">
        <h3 className="text-primaryHighlight text-[32px]">{title}</h3>
        <p className="text-tsm font-light tracking-wide">
          {
            common.FullMonth[
              dateObject.month as unknown as keyof typeof common.FullMonth
            ]
          }{' '}
          {dateObject.day}, {dateObject.year}
        </p>
        <p className="text-tsm my-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tagId) => (
            <Tag key={tagId} tagId={tagId} className="text-tsm" />
          ))}
        </div>
      </div>
      <a
        href={`${routes.BLOG}/${slug}`}
        className="absolute top-0 left-0 h-full w-full text-transparent"
      >
        {title}
      </a>
    </article>
  )
}

export default memo(PostCard)
