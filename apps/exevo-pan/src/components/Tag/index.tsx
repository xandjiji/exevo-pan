import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { blogTags } from 'Constants'
import * as S from './styles'
import { TagProps } from './types'

const { tagById } = blogTags
const FALLBACK_COLOR = 0

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
      aria-checked={clickable ? active : undefined}
      tagColor={tagColor ?? tagById[tagId as string]?.color ?? FALLBACK_COLOR}
      {...props}
    >
      {children ?? common.BlogTags[tagById[tagId as string]?.id] ?? tagId}
    </S.Wrapper>
  )
}

export default memo(Tag)
