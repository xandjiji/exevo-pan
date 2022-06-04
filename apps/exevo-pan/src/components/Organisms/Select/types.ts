export type ExtendedProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'value'
>
export type Value = number | string

export type CustomProps = {
  defaultValue?: Value
  value?: Value
}

export type SelectProps = ExtendedProps & CustomProps
