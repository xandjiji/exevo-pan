export type InputValue = number | string

type ExtendedProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue' | 'aria-label'
>

export type LabelProps =
  | {
      label: string
      'aria-label'?: never
    }
  | {
      label: JSX.Element
      'aria-label': string
    }

export type InputProps = ExtendedProps & {
  allowClear?: boolean
  errorMessage?: string
  value?: InputValue
  defaultValue?: InputValue
  hasAlert?: boolean
} & LabelProps
