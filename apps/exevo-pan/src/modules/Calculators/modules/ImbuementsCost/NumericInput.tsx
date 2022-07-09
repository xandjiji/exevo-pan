/* eslint-disable react/require-default-props */
import { useState, useCallback } from 'react'
import { Input } from 'components/Atoms'
import { numberWithCommaSeparator } from 'utils'

type NumericInputProps = {
  value?: number
  onChange: (value: number) => void
} & AccessibleLabelProps

const NumericInput = ({ value = 0, onChange, ...props }: NumericInputProps) => {
  const [touched, setTouched] = useState(false)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setTouched(true)
      const parsed = Number(e.target.value.replace(/,/g, ''))
      if (!Number.isNaN(parsed)) onChange(parsed)
    },
    [onChange],
  )

  const isZero = value === 0
  const displayedValue = isZero ? '' : numberWithCommaSeparator(value)

  return (
    <Input
      inputMode="numeric"
      noAlert
      value={displayedValue}
      onChange={handleChange}
      placeholder="GP value"
      error={touched && isZero}
      {...props}
    />
  )
}

export default NumericInput
