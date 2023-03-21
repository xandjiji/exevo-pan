import { useState, useEffect } from 'react'
import { Input } from 'components/Atoms'
import { InputProps } from 'components/Atoms/Input/types'

type LevelInputProps = {
  dispatchValue: (value: number) => void
  initialValue: number
  defaultValue: number
} & Omit<InputProps, 'ref'> &
  AccessibleLabelProps

const LevelInput = ({
  dispatchValue,
  initialValue,
  defaultValue,
  ...props
}: LevelInputProps) => {
  const [value, setValue] = useState<string | number>(initialValue)

  useEffect(() => {
    if (defaultValue === initialValue) setValue(initialValue)
  }, [initialValue, defaultValue])

  const isInvalid =
    (props.max !== undefined && +value > +props.max) ||
    (props.min !== undefined && +value < +props.min)

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
    />
  )
}

export default LevelInput
