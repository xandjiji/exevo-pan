import { HTMLAttributes } from 'react'

export interface OptionProps {
  children: string
  value?: string
  highlighted?: boolean
  onClick?: (option: Option) => void
  props?: HTMLAttributes<HTMLOptionElement>
}

export interface OptionStyleProps {
  highlighted?: boolean
}
