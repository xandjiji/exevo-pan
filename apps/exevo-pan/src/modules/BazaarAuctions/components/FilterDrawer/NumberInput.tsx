import { useState, useEffect } from 'react'
import { Input } from 'components/Atoms'
import { InputProps } from 'components/Atoms/Input/types'

type NumberInputProps = {
  dispatchValue: (value: number) => void
  initialValue: number
  defaultValue: number
  customStep?: (current: number, direction: 1 | -1) => number
} & Omit<InputProps, 'ref'> &
  AccessibleLabelProps

const NumberInput = ({
  dispatchValue,
  initialValue,
  defaultValue,
  customStep,
  ...props
}: NumberInputProps) => {
  const [value, setValue] = useState<string | number>(initialValue)

  useEffect(() => {
    if (defaultValue === initialValue) setValue(initialValue)
  }, [initialValue, defaultValue])

  const isInvalid =
    (props.max !== undefined && +value > +props.max) ||
    (props.min !== undefined && +value < +props.min)

  const handleKeyDown =
    customStep &&
    ((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
      e.preventDefault()
      const direction = e.key === 'ArrowUp' ? 1 : -1
      const current = value === '' ? defaultValue : +value
      const next = customStep(current, direction)
      setValue(next)
      dispatchValue(next)
    })

  return (
    <Input
      type="number"
      step={50}
      value={value}
      onChange={(e) => {
        const isEmpty = e.target.value === ''

        setValue(e.target.value)
        dispatchValue(isEmpty ? defaultValue : +e.target.value)
      }}
      error={value !== '' && isInvalid}
      enterKeyHint="next"
      {...props}
      onKeyDown={handleKeyDown ?? props.onKeyDown}
    />
  )
}

export default NumberInput
