export type InputValue = number | string

export type ExtendedProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue' | 'aria-label' | 'ref'
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

export type StateIcon = 'invalid' | 'loading' | 'neutral' | 'valid'

export type CustomProps = {
  allowClear?: boolean
  errorMessage?: string
  value?: InputValue
  defaultValue?: InputValue
  hasAlert?: boolean
  stateIcon?: StateIcon
}

export type InputProps = CustomProps & ExtendedProps & LabelProps
