type ExtendedProps = Pick<
  JSX.IntrinsicElements['input'],
  'className' | 'disabled' | 'placeholder' | 'enterKeyHint' | 'onKeyPress'
>

export type NumericInputProps = {
  value?: number
  onChange?: (value: number) => void
  step?: number
  alwaysValid?: boolean
} & ExtendedProps &
  AccessibleLabelProps
