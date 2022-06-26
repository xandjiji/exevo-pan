export type ExtendedProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue' | 'aria-label'
>

export type CustomProps = {
  defaultValue?: string
  value?: string
  maxHour?: number
  minHour?: number
}

export type TimeInputProps = CustomProps & ExtendedProps

export type HasNextValueArgs = {
  min: number
  max: number
  buffer: string
}
