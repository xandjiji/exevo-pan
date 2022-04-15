/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx'
import { useState, useCallback } from 'react'
import TickIcon from 'assets/svgs/check.svg'
import { CheckboxProps } from './types'

const Checkbox = ({
  label,
  id,
  disabled = false,
  checked: checkedProp,
  onChange,
  className,
  ...props
}: CheckboxProps): JSX.Element => {
  const [innerChecked, setChecked] = useState(checkedProp ?? false)
  const checked = checkedProp ?? innerChecked

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
      setChecked((prevState) => !prevState)
    },
    [onChange],
  )

  return (
    <label
      className={clsx(
        'text-tsm flex cursor-pointer items-center',
        disabled && 'pointer-events-none',
      )}
      style={{ lineHeight: 1 }}
    >
      <div
        className="relative h-4"
        style={{ marginRight: clsx(label && '6px') }}
      >
        <input
          className={clsx(
            'border-1 border-separator checked:bg-primary checked:border-primary disabled:bg-separator disabled:border-separator m-0 h-4 w-4 cursor-pointer appearance-none rounded border-solid transition-all active:shadow-inner',
            className,
          )}
          id={id}
          disabled={disabled}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <TickIcon
          className={clsx(
            'absolute top-1/2 left-1/2 h-[14px] w-[14px]',
            checked ? 'fill-onPrimary' : 'fill-transparent',
          )}
          style={{ transform: 'translate(-50%,-50%)' }}
        />
      </div>
      {label}
    </label>
  )
}

export default Checkbox
