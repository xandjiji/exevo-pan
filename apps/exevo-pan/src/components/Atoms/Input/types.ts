export type InputValue = number | string

export type ExtendedProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue' | 'aria-label'
>

export type StateIcon = 'invalid' | 'loading' | 'neutral' | 'valid'

export type CustomProps = {
  allowClear?: boolean
  errorMessage?: string
  value?: InputValue
  defaultValue?: InputValue
  hasAlert?: boolean
  stateIcon?: StateIcon
}

export type InputProps = CustomProps & ExtendedProps & AccessibleLabelProps
