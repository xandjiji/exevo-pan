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
  <option
    className={clsx(
      'text-tsm text-onSurface hover:bg-primaryVariant w-full cursor-pointer py-2 px-3 font-light transition-colors',
      highlighted ? 'bg-primaryVariant' : 'bg-surface',
      className,
    )}
    value={value}
    onClick={() => onClick?.({ name: children, value })}
    {...props}
  >
    {children}
  </option>
)

export default memo(Option)
