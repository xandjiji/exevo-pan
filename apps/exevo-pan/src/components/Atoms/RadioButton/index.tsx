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

  const handleClick = (event?: React.MouseEvent) => {
    setActive(true)
    onClick?.(event)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (checkKeyboardTrigger(event.code)) {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <S.Wrapper
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="radio"
      aria-checked={derivedActive}
      tabIndex={0}
      {...props}
    >
      <S.Radio />
      {children}
    </S.Wrapper>
  )
}

export default RadioButton
