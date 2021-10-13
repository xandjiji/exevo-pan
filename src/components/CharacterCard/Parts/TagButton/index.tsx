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
      animation={hoverState}
      onMouseOver={handleHover}
      onMouseOut={handleUnhover}
    >
      <S.Icon />
    </S.Wrapper>
  )
}

export default TagButton
