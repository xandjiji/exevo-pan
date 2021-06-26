import React, { useState, memo } from 'react'
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

  const handleClick = (event: React.MouseEvent) => {
    if (!!onClick) {
      setActive(!active)
      onClick(event)
    }
  }

  return (
    <S.Chip
      active={derivedActive}
      clickable={!!onClick}
      onClick={handleClick}
      role={onClick ? 'switch' : undefined}
      aria-checked={onClick ? derivedActive : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
      {!!onClose && (
        <S.CloseButton onClick={onClose} aria-label="Remove item" />
      )}
    </S.Chip>
  )
}

const Chip = memo(ChipComponent)

export default Chip
