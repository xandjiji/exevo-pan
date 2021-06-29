import { HTMLAttributes } from 'react'

export interface ChipProps {
  children?: React.ReactNode
  onClick?: (event?: React.MouseEvent) => void
  onClose?: (event?: React.MouseEvent) => void
  overrideStatus?: boolean
  props?: HTMLAttributes<HTMLDivElement>
}

export interface ChipStyleProps {
  active?: boolean
  clickable?: boolean
}
