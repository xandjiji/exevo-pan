export type InputValue = number | string

export type Mask = (value: InputValue) => InputValue

export type ExtendedProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue' | 'aria-label'
>

export type StateIcon = 'invalid' | 'loading' | 'neutral' | 'valid'

export type CustomProps = {
  allowClear?: boolean
  error?: boolean | string
  value?: InputValue
  defaultValue?: InputValue
  noAlert?: boolean
  stateIcon?: StateIcon
  mask?: Mask
}

export type InputProps = CustomProps & ExtendedProps & AccessibleLabelProps
