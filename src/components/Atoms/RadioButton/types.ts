import { HTMLAttributes } from 'react'

export interface RadioButtonProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  active?: boolean
  onClick?: (event?: React.MouseEvent) => void
}

export interface WrapperStyleProps {
  active?: boolean
}

export interface RadioStyleProps {
  active?: boolean
}
