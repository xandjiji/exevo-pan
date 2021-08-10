import { HTMLAttributes } from 'react'

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  onClick?: (event?: React.MouseEvent) => void
  onClose?: (event?: React.MouseEvent) => void
  overrideStatus?: boolean
}

export interface ChipStyleProps {
  active?: boolean
  clickable?: boolean
}
