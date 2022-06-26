export type ExtendedProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue' | 'aria-label'
>

export type CustomProps = {
  defaultValue?: string
  value?: string
  maxHour?: number
}

export type TimeInputProps = CustomProps & ExtendedProps
