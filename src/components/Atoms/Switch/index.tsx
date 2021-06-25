import React, { useState } from 'react'
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

  const handleClick = (event: React.MouseEvent) => {
    setActive(prev => !prev)
    onClick?.(event)
  }

  return (
    <S.Switch
      onClick={handleClick}
      role="switch"
      tabIndex={0}
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
