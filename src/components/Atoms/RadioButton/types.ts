import React, { HTMLAttributes } from 'react'

export interface RadioButtonProps {
  children: React.ReactNode
  active?: boolean
  onClick?: (event?: React.MouseEvent) => void
  props?: HTMLAttributes<HTMLDivElement>
}

export interface WrapperStyleProps {
  active?: boolean
}

export interface RadioStyleProps {
  active?: boolean
}
