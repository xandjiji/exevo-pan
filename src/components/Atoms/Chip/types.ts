import { HTMLAttributes, ReactNode } from 'react'

export interface ChipProps {
  children?: ReactNode
  onClick?: () => void
  onClose?: () => void
  overrideStatus?: boolean
  props?: HTMLAttributes<HTMLDivElement>
}

export interface ChipStyleProps {
  active?: boolean
  clickable?: boolean
}
