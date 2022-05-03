import { useState } from 'react'
import clsx from 'clsx'
import { checkKeyboardTrigger } from 'utils'
import { RadioButtonProps } from './types'

const RadioButton = ({
  className,
  children,
  active: propActive,
  onClick,
  ...props
}: RadioButtonProps) => {
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
    <div
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="radio"
      aria-checked={derivedActive}
      tabIndex={0}
      className={clsx(
        'text-s text-onSurface group flex cursor-pointer items-center gap-[6px]',
        className,
      )}
      {...props}
    >
      <div className="border-separator relative grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 border-solid transition-shadow group-active:shadow-inner">
        <div
          className={clsx(
            'bg-primary h-2 w-2 rounded-full transition-opacity',
            !derivedActive && 'opacity-0',
          )}
        />
      </div>
      {children}
    </div>
  )
}

export default RadioButton
