import { HTMLAttributes } from 'react'

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  allowClear?: boolean
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface InputWrapperProps {
  isClearButtonActive?: boolean
}
