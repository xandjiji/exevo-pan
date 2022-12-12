/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useTranslations } from 'contexts/useTranslation'
import { useState, memo } from 'react'
import clsx from 'clsx'
import { checkKeyboardTrigger } from 'utils'
import { CrossIcon } from 'assets/svgs'
import { ChipProps } from './types'

const ChipComponent = ({
  className,
  children,
  onClick,
  onClose,
  overrideStatus,
  gray = false,
  ...props
}: ChipProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const [active, setActive] = useState<boolean>(false)
  const derivedActive = overrideStatus ?? active

  const handleClick = (event?: React.MouseEvent) => {
    if (onClick) {
      setActive((prev) => !prev)
      onClick(event)
    }
  }

  const handleKeypress = (event: React.KeyboardEvent) => {
    if (!!onClick && checkKeyboardTrigger(event.code)) {
      event.preventDefault()
      handleClick()
    }
  }

  const isClickable = !!onClick

  return (
    <div
      role={isClickable ? 'switch' : undefined}
      aria-checked={isClickable ? derivedActive : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={handleClick}
      onKeyPress={handleKeypress}
      className={clsx(
        'text-tsm flex shrink-0 items-center gap-1.5 rounded-lg border-none py-1.5 px-3 font-normal transition-all',
        gray && 'bg-separator/60',
        derivedActive
          ? 'bg-primary text-onPrimary'
          : 'bg-primaryVariant text-onSurface',
        isClickable && 'clickable',
        className,
      )}
      {...props}
    >
      {children}
      {!!onClose && (
        <button
          className="clickable bg-primary relative inline-flex h-4 w-4 items-center justify-center rounded-full border-none opacity-75 transition-opacity"
          type="button"
          aria-label={common.RemoveItem}
          onClick={onClose}
        >
          <CrossIcon className="fill-onPrimary h-3 w-3 transition-colors" />
        </button>
      )}
    </div>
  )
}

const Chip = memo(ChipComponent)

export default Chip
