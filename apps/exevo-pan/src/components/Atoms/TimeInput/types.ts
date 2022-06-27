export type ExtendedProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue' | 'aria-label'
>

export type CustomProps = {
  defaultValue?: string
  value?: string
  min?: number
  max?: number
}

export type TimeInputProps = CustomProps & ExtendedProps

export type HasNextValueArgs = {
  min: number
  max: number
  value: string
}
