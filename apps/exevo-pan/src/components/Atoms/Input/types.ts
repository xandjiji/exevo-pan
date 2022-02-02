import { InputHTMLAttributes } from 'react'

export type InputValue = number | string

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  allowClear?: boolean
  errorMessage?: string
  value?: InputValue
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  hasAlert?: boolean
}

export interface InputWrapperProps {
  isClearButtonActive?: boolean
  isInvalid: boolean
}
