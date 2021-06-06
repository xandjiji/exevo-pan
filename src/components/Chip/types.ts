import { ReactNode } from 'react'

export interface ChipProps {
  children: ReactNode
  clickable?: boolean
  closeable?: boolean
  onClick?: () => void
  onClose?: () => void
  overrideStatus?: boolean
}
