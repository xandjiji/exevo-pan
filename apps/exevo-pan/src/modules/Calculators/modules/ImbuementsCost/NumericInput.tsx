/* eslint-disable react/require-default-props */
import { useCallback } from 'react'
import { Input } from 'components/Atoms'
import { numberWithCommaSeparator } from 'utils'

type NumericInputProps = {
  value?: number
  onChange: (value: number) => void
} & AccessibleLabelProps

const NumericInput = ({ value = 0, onChange, ...props }: NumericInputProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const parsed = Number(e.target.value.replace(/,/g, ''))
      if (!Number.isNaN(parsed)) onChange(parsed)
    },
    [onChange],
  )

  const displayedValue = value === 0 ? '' : numberWithCommaSeparator(value)

  return (
    <Input
      inputMode="numeric"
      noAlert
      value={displayedValue}
      onChange={handleChange}
      placeholder="GP value"
      {...props}
    />
  )
}

export default NumericInput
