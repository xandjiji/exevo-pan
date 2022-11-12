import { HTMLAttributes } from 'react'

export type ChipProps = {
  children?: React.ReactNode
  onClick?: (event?: React.MouseEvent) => void
  onClose?: (event?: React.MouseEvent) => void
  overrideStatus?: boolean
  gray?: boolean
} & HTMLAttributes<HTMLDivElement>
