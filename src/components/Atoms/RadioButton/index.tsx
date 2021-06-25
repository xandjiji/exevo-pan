import { useState } from 'react'
import { checkKeyboardTrigger } from 'utils'
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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (checkKeyboardTrigger(event.code)) handleClick()
  }

  return (
    <S.Wrapper
      active={derivedActive}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      role="radio"
      tabIndex={0}
      {...props}
    >
      <S.Radio active={derivedActive} />
      {children}
    </S.Wrapper>
  )
}

export default RadioButton
