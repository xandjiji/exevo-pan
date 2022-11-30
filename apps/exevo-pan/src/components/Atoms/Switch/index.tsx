import { useState, cloneElement } from 'react'
import clsx from 'clsx'
import { SwitchProps } from './types'

const Switch = ({
  className,
  children,
  active,
  onClick,
  icon,
  disabled = false,
  ...props
}: SwitchProps) => {
  const [activeState, setActive] = useState<boolean>(active ?? false)
  const derivedActive = active ?? activeState

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setActive((prev) => !prev)
    onClick?.(event)
  }

  return (
    <button
      type="button"
      role="switch"
      onClick={handleClick}
      disabled={disabled}
      aria-checked={derivedActive}
      className={clsx(
        'text-s text-onSurface flex select-none items-center gap-2',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      {...props}
    >
      <div
        className={clsx(
          'relative rounded-2xl transition-colors',
          disabled && 'bg-background',
          derivedActive ? 'bg-primaryVariant' : 'bg-separator',
          icon ? 'h-4 w-[52px]' : 'h-2 w-7',
        )}
      >
        <div
          className={clsx(
            'z-1 absolute top-1/2 grid place-items-center rounded-full shadow-lg transition-all',
            disabled
              ? 'bg-separator'
              : derivedActive
              ? 'bg-primary'
              : 'bg-background',
            icon ? 'h-8 w-8' : 'h-4 w-4',
          )}
          style={{
            left: derivedActive
              ? `calc(100% - ${icon ? '32px' : '16px'})`
              : '0px',
            transform: 'translateY(-50%)',
          }}
        >
          {icon &&
            cloneElement(icon, {
              className: clsx(
                'z-1 transition-colors',
                derivedActive ? 'fill-onPrimary' : 'fill-onSurface',
              ),
            })}
        </div>
      </div>
      {children}
    </button>
  )
}

export default Switch
