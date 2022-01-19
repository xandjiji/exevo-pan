import { memo, useMemo } from 'react'
import { blogTags } from 'Constants'
import * as S from './styles'
import { TagsProps } from './types'

const Tags = ({ tags, ...props }: TagsProps): JSX.Element | null => {
  if (tags.length === 0) return null

  const renderedTags = useMemo(
    () => blogTags.all.filter(({ id }) => tags.includes(id)),
    [tags],
  )

  return (
    <S.Wrapper {...props}>
      {renderedTags.map(({ id, name, color }) => (
        <S.Tag key={id} tagColor={color}>
          {name}
        </S.Tag>
      ))}
    </S.Wrapper>
  )
}

export default memo(Tags)
