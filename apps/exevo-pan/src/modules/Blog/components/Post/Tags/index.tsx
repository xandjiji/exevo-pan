import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { blogTags } from 'Constants'
import * as S from './styles'
import { TagsProps } from './types'

const Tags = ({ tags, ...props }: TagsProps): JSX.Element | null => {
  if (tags.length === 0) return null

  const {
    translations: { blog },
  } = useTranslations()

  return (
    <S.Wrapper {...props}>
      {tags.map((tagId) => (
        <S.Tag key={tagId} tagColor={blogTags.tagById[tagId].color}>
          {blog.Tags[tagId]}
        </S.Tag>
      ))}
    </S.Wrapper>
  )
}

export default memo(Tags)
