/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx'
import { useState, useCallback } from 'react'
import { CheckIcon } from 'assets/svgs'
import { CheckboxProps } from './types'

const Checkbox = ({
  label,
  id,
  disabled = false,
  greenVariant = false,
  enabledStyle = false,
  checked: checkedProp,
  onChange,
  className,
  ...props
}: CheckboxProps) => {
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
        'text-tsm flex items-center',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
      style={{ lineHeight: 1 }}
    >
      <div
        className="relative h-4"
        style={{ marginRight: clsx(label && '6px') }}
      >
        <input
          className={clsx(
            'border-1 border-separator bg-surface m-0 h-4 w-4 appearance-none rounded border-solid transition-all active:shadow-inner',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            greenVariant
              ? 'checked:bg-green checked:border-green'
              : 'checked:bg-primary checked:border-primary',
            !enabledStyle && 'disabled:bg-separator disabled:border-separator',
            className,
          )}
          id={id}
          disabled={disabled}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <CheckIcon
          className={clsx(
            'absolute-centered h-3.5 w-3.5',
            checked ? 'fill-onPrimary' : 'fill-transparent',
          )}
        />
      </div>
      {label}
    </label>
  )
}

export default Checkbox
