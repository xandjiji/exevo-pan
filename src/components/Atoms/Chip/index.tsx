import React, { useState, memo } from 'react'
import { checkKeyboardTrigger } from 'utils'
import { ChipProps } from './types'
import * as S from './styles'

const ChipComponent = ({
  children,
  onClick,
  onClose,
  overrideStatus,
  ...props
}: ChipProps) => {
  const [active, setActive] = useState<boolean>(false)
  const derivedActive = overrideStatus ?? active

  const handleClick = (event?: React.MouseEvent) => {
    if (!!onClick) {
      setActive(prev => !prev)
      onClick(event)
    }
  }

  const handleChipKeypress = (event: React.KeyboardEvent) => {
    if (!!onClick && checkKeyboardTrigger(event.code)) {
      event.preventDefault()
      handleClick()
    }
  }

  const handleCloseKeypress = (event: React.KeyboardEvent) => {
    if (checkKeyboardTrigger(event.code)) {
      event.preventDefault()
      onClose?.()
    }
  }

  return (
    <S.Chip
      active={derivedActive}
      clickable={!!onClick}
      role={onClick ? 'switch' : undefined}
      aria-checked={onClick ? derivedActive : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={handleClick}
      onKeyPress={handleChipKeypress}
      {...props}
    >
      {children}
      {!!onClose && (
        <S.CloseButton
          tabIndex={0}
          aria-label="Remove item"
          onClick={onClose}
          onKeyPress={handleCloseKeypress}
        />
      )}
    </S.Chip>
  )
}

const Chip = memo(ChipComponent)

export default Chip
