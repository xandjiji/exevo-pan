import { useRef, useCallback, useState } from 'react'
import clsx from 'clsx'
import { Chip } from 'components/Atoms'
import { ChipGroupProps, OptionProps } from './types'

const Option = ({ groupName, name, value, node, ...props }: OptionProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => inputRef.current?.click(), [])

  return (
    <Chip
      className="gap-1.5"
      onClick={handleClick}
      overrideStatus={props.checked}
    >
      <input
        ref={inputRef}
        type="radio"
        name={groupName}
        value={value}
        tabIndex={-1}
        className={clsx('float-right h-0 w-0')}
        {...props}
      />
      {node ?? name}
    </Chip>
  )
}

const ChipGroup = ({
  name: groupName,
  options,
  onChange,
  value,
  defaultValue,
  className,
  ...props
}: ChipGroupProps) => {
  const [stateValue, setStateValue] = useState(value ?? defaultValue)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setStateValue(event.target.value)
      onChange?.(event)
    },
    [onChange],
  )

  const derivedValue = value ?? stateValue

  return (
    <div
      role="radiogroup"
      className={clsx('flex gap-2', className)}
      onChange={
        handleChange as unknown as React.FormEventHandler<HTMLDivElement>
      }
      {...(props as React.InputHTMLAttributes<HTMLDivElement>)}
    >
      {options.map((option) => (
        <Option
          key={option.value}
          groupName={groupName}
          checked={derivedValue === option.value}
          {...option}
        />
      ))}
    </div>
  )
}

export default ChipGroup
