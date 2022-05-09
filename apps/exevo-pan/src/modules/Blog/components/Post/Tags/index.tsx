import { memo } from 'react'
import clsx from 'clsx'
import { Tag } from 'components/Atoms'
import { TagsProps } from './types'

const Tags = ({ tags, className, ...props }: TagsProps) => {
  if (tags.length === 0) return null

  return (
    <div className={clsx('flex flex-wrap gap-2', className)} {...props}>
      {tags.map((tagId) => (
        <Tag key={tagId} tagId={tagId} className="text-tsm" />
      ))}
    </div>
  )
}

export default memo(Tags)
