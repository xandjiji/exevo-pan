import { HTMLAttributes, ReactNode } from 'react'

export interface SwitchProps {
  children?: ReactNode
  active?: boolean
  onClick?: (event?: React.MouseEvent) => void
  icon?: ReactNode
  props?: HTMLAttributes<HTMLButtonElement>
}

export interface ToggleStyleProps {
  active?: boolean
  hasIcon?: boolean
}
