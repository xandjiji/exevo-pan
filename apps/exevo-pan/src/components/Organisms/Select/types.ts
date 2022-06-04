export type ExtendedProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'value' | 'aria-label'
>

export type Value = number | string

export type LabelProps =
  | {
      label: string
      'aria-label'?: never
    }
  | {
      label: JSX.Element
      'aria-label': string
    }

export type CustomProps = {
  defaultValue?: Value
  value?: Value
}

export type SelectProps = ExtendedProps & CustomProps & LabelProps
