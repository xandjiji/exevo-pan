export type ExtendedProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'children' | 'defaultValue' | 'value' | 'aria-label'
>

export type Value = number | string

export type CustomProps = {
  defaultValue?: Value
  options: Option[]
  value?: Value
  error?: boolean | string
}

export type SelectProps = ExtendedProps & CustomProps & AccessibleLabelProps

export type SelectState = {
  isControlled: boolean
  innerValue: Value
  listboxStatus: boolean
  dispatchChangeEvent: (dispatchValue: Value) => void
}

export type Action =
  | { type: 'SET_LISTBOX_STATUS'; value?: boolean }
  | {
      type: 'ARROW_NAVIGATION'
      code: 'ArrowUp' | 'ArrowDown'
      options: Option[]
      currentValue: Value
    }
  | { type: 'USER_TYPING'; term: string; options: Option[] }
  | { type: 'OPTION_SELECTED'; selectedValue: Value }
