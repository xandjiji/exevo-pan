export type ExtendedProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue' | 'aria-label'
>

export type CustomProps = {
  defaultValue?: string
  value?: string
  min?: number
  max?: number
  error?: boolean | string
}

export type TimeInputProps = CustomProps & ExtendedProps & AccessibleLabelProps

export type TimeObject = {
  hours: string
  minutes: string
  value: string
}
