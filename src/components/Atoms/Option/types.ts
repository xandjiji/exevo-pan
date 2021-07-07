import { HTMLAttributes } from 'react'

export interface OptionProps {
  children: string
  value?: string
  highlighted?: boolean
  onClick?: (option: Option) => void
  onMouseDown?: (event: React.MouseEvent) => void
  props?: HTMLAttributes<HTMLOptionElement>
}

export interface OptionStyleProps {
  highlighted?: boolean
}
