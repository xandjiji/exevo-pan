import { useTranslations } from 'contexts/useTranslation'
import { useState, useCallback } from 'react'
import * as S from './styles'
import { HoveredState } from './types'

const TagButton = (): JSX.Element => {
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

  return (
    <S.Wrapper
      tabIndex={0}
      animation={hoverState}
      onMouseOver={handleHover}
      onFocus={handleHover}
      onMouseOut={handleUnhover}
      onBlur={handleUnhover}
    >
      <S.IconWrapper>
        <S.TagIcon />
        <S.AdvertiseIcon />
      </S.IconWrapper>

      <S.Text>{common.CharacterCard.highlightLabelText}</S.Text>
    </S.Wrapper>
  )
}

export default TagButton
