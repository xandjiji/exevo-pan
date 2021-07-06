import { HTMLAttributes } from 'react'

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  allowClear?: boolean
}

export interface InputWrapperProps {
  isClearButtonActive?: boolean
}
