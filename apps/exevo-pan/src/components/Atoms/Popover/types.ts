import { HTMLAttributes } from 'react'
import { Placement } from '@popperjs/core'

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  content: React.ReactNode
  placement?: Placement
  trigger?: 'click' | 'hover' | 'none'
  visible?: boolean
  offset?: [number, number]
}

export type PopperReferenceElement = HTMLDivElement | null

export interface PopoverReferenceProps {
  increaseHoverArea: boolean
  padX: number
  padY: number
}
