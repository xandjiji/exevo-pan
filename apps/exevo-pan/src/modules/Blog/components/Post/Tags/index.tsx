import { memo } from 'react'
import * as S from './styles'
import { TagsProps } from './types'

const Tags = ({ tags, ...props }: TagsProps): JSX.Element | null => {
  if (tags.length === 0) return null

  return (
    <S.Wrapper {...props}>
      {tags.map((tagId) => (
        <S.Tag key={tagId} tagId={tagId} />
      ))}
    </S.Wrapper>
  )
}

export default memo(Tags)
