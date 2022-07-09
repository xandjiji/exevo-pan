export type NumericInputProps = {
  value?: number
  onChange: (value: number) => void
  step?: number
} & AccessibleLabelProps
