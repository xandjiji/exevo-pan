import { HTMLAttributes } from 'react'

export interface RadioButtonProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean
  onClick?: (event?: React.MouseEvent) => void
}
