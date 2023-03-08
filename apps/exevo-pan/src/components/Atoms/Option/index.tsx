/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { memo } from 'react'
import clsx from 'clsx'
import { OptionProps } from './types'

const Option = ({
  className,
  children,
  value = children,
  highlighted = false,
  onClick,
  ...props
}: OptionProps) => (
  <div
    role="option"
    className={clsx(
      'text-tsm text-onSurface hover:bg-primaryVariant w-full cursor-pointer py-2 px-3 font-light transition-colors',
      highlighted ? 'bg-primaryVariant' : 'bg-surface',
      className,
    )}
    data-value={value}
    onClick={() => onClick?.({ name: children, value })}
    {...props}
  >
    {children}
  </div>
)

export default memo(Option)
