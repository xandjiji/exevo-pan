export type Mark = { value: number; label: string | number }

export type Range = [number, number]

export type TransformFunction = (value: number) => string | number

export type CustomProps = {
  label: React.ReactNode
  min: number
  max: number
  step?: number
  displayValue?: boolean
  showInput?: boolean
  transformDisplayedValues?: TransformFunction
  marks?: boolean | Mark[]
  disabled?: boolean
}

export type SliderProps = CustomProps &
  React.InputHTMLAttributes<HTMLInputElement>
