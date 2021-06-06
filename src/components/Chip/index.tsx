import { useState, memo } from 'react'
import { ChipProps } from './types'
import * as S from './styles'

const ChipComponent = ({
  children,
  clickable = false,
  closeable = false,
  onClick,
  onClose,
  overrideStatus,
}: ChipProps) => {
  const [active, setActive] = useState<boolean>(false)
  const derivedActive = overrideStatus ?? active

  const handleClick = () => {
    if (clickable) {
      setActive(!active)
      onClick?.()
    }
  }

  return (
    <S.Chip
      className={`chip-item shadow ${derivedActive ? 'active' : ''} ${
        clickable ? 'interact' : ''
      }`}
      onClick={handleClick}
    >
      {children}
      {closeable && (
        <div
          className="close-button clickable"
          onClick={onClose}
          onKeyPress={onClose}
          role="button"
          tabIndex={0}
          aria-label="Remove item"
        />
      )}
    </S.Chip>
  )
}

const Chip = memo(ChipComponent)

export default Chip
