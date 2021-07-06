import { HTMLAttributes } from 'react'

export interface OptionProps {
  children: string
  value?: string
  onClick?: (option: Option) => void
  props?: HTMLAttributes<HTMLOptionElement>
}
