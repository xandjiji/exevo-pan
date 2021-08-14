import { useState } from 'react'
import { checkKeyboardTrigger } from 'utils'
import * as S from './styles'
import { SwitchProps } from './types'

const Switch = ({
  children,
  active,
  onClick,
  icon,
  ...props
}: SwitchProps): JSX.Element => {
  const [activeState, setActive] = useState<boolean>(active ?? false)
  const derivedActive = active ?? activeState

  const handleClick = (event?: React.MouseEvent) => {
    setActive((prev) => !prev)
    onClick?.(event)
  }

  const handleKeypress = (event: React.KeyboardEvent) => {
    if (checkKeyboardTrigger(event.code)) {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <S.Switch
      role="switch"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleKeypress}
      aria-checked={derivedActive}
      {...props}
    >
      <S.ToggleButton active={derivedActive} hasIcon={!!icon}>
        {icon}
      </S.ToggleButton>
      {children}
    </S.Switch>
  )
}

export default Switch
