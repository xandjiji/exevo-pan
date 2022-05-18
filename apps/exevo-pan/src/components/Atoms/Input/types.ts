export type InputValue = number | string

type ExtendedProps = Omit<JSX.IntrinsicElements['input'], 'value'>

export type InputProps = ExtendedProps & {
  allowClear?: boolean
  errorMessage?: string
  value?: InputValue
  hasAlert?: boolean
}
