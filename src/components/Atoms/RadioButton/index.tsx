import { useState } from 'react'
import { RadioButtonProps } from './types'
import * as S from './styles'

const RadioButton = ({
  children,
  active: propActive,
  onClick,
  ...props
}: RadioButtonProps): JSX.Element => {
  const [active, setActive] = useState<boolean>(propActive ?? false)
  const derivedActive = propActive ?? active

  const handleClick = () => {
    setActive(true)
    onClick?.()
  }

  return (
    <S.Wrapper active={derivedActive} onClick={handleClick} {...props}>
      <S.Radio active={derivedActive} />
      {children}
    </S.Wrapper>
  )
}

export default RadioButton
