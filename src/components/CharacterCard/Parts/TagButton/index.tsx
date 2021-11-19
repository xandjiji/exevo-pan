import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import { useState, useCallback, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { routes } from 'Constants'
import * as S from './styles'
import { HoveredState } from './types'

const TagButton = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const [hoverState, setHoverState] = useState<HoveredState>('initial')

  const handleHover = useCallback(() => {
    setHoverState('hover')
  }, [])

  const handleUnhover = useCallback(() => {
    setHoverState('off')
  }, [])

  const { current: labelId } = useRef(uuidv4())

  return (
    <NextLink href={routes.ADVERTISE}>
      <S.Wrapper
        suppressHydrationWarning
        tabIndex={0}
        animation={hoverState}
        onMouseOver={handleHover}
        onFocus={handleHover}
        onMouseOut={handleUnhover}
        onBlur={handleUnhover}
        aria-describedby={labelId}
        {...props}
      >
        <S.IconWrapper>
          <S.TagIcon />
          <S.AdvertiseIcon />
        </S.IconWrapper>

        <S.Text suppressHydrationWarning id={labelId}>
          {common.CharacterCard.highlightLabelText}
        </S.Text>
      </S.Wrapper>
    </NextLink>
  )
}

export default TagButton
