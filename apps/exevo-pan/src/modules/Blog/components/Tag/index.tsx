import { memo } from 'react'
import * as S from './styles'
import { TagProps } from './types'

const Tag = ({
  clickable = false,
  active = false,
  tagColor,
  children,
  ...props
}: TagProps): JSX.Element => {
  const type = clickable ? 'button' : undefined
  return (
    <S.Wrapper
      as={type}
      type={type}
      role={clickable ? 'switch' : undefined}
      aria-checked={clickable && active}
      tagColor={tagColor}
      {...props}
    >
      {children}
    </S.Wrapper>
  )
}

export default memo(Tag)
