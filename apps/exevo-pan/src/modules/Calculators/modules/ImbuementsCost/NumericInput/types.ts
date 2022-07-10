type ExtendedProps = Pick<
  JSX.IntrinsicElements['input'],
  'className' | 'disabled' | 'enterKeyHint' | 'onKeyPress'
>

export type NumericInputProps = {
  value?: number
  onChange: (value: number) => void
  step?: number
} & ExtendedProps &
  AccessibleLabelProps
