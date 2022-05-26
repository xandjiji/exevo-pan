export type InputValue = number | string

type ExtendedProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue'
>

export type InputProps = ExtendedProps & {
  allowClear?: boolean
  errorMessage?: string
  value?: InputValue
  defaultValue?: InputValue
  hasAlert?: boolean
}
