import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { blogTags } from 'Constants'
import * as S from './styles'
import { TagProps } from './types'

const { tagById } = blogTags

const Tag = ({
  clickable = false,
  active = false,
  tagId,
  tagColor,
  children,
  ...props
}: TagProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const type = clickable ? 'button' : undefined

  return (
    <S.Wrapper
      as={type}
      type={type}
      role={clickable ? 'switch' : undefined}
      aria-checked={clickable && active}
      tagColor={tagColor ?? tagById[tagId as string].color}
      {...props}
    >
      {children ?? common.BlogTags[tagById[tagId as string].id]}
    </S.Wrapper>
  )
}

export default memo(Tag)
