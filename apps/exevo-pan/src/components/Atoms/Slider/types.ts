export type ExtendedProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue' | 'aria-label'
>

export type Mark = { value: number; label: string | number }

export type Range = [number, number]

export type TransformFunction = (value: number) => string | number

export type CustomProps = {
  defaultValue?: number
  value?: number
  min: number
  max: number
  step?: number
  displayValue?: boolean
  showInput?: boolean
  transformDisplayedValues?: TransformFunction
  marks?: boolean | Mark[]
  disabled?: boolean
  invert?: boolean
}

export type SliderProps = CustomProps & ExtendedProps & AccessibleLabelProps

export type SliderState = {
  isControlled: boolean
  innerValue: number
  inputValue: number | string
  dispatchChangeEvent: (dispatchValue: number) => void
}

export type Action =
  | { type: 'UPDATE_VALUE'; value: number }
  | { type: 'INPUT_TYPING'; value: string; range: Range }
  | { type: 'SET_VALUE'; value: number }
