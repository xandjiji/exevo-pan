import { useState, useCallback } from 'react'
import * as S from './styles'
import { HoveredState } from './types'

const TagButton = (): JSX.Element => {
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
      <S.Icon />
      <S.Text>Highlight your auction!</S.Text>
    </S.Wrapper>
  )
}

export default TagButton
