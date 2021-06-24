import { HTMLAttributes } from 'react'

export interface RadioButtonProps {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
  props?: HTMLAttributes<HTMLDivElement>
}

export interface WrapperStyleProps {
  active?: boolean
}

export interface RadioStyleProps {
  active?: boolean
}
