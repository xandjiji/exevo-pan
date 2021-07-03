import { HTMLAttributes } from 'react'
import { Placement } from '@popperjs/core'

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  content: React.ReactNode
  placement?: Placement
  trigger?: 'click' | 'hover'
  visible?: boolean
  offset?: [number, number]
}

export type PopperReferenceElement = HTMLDivElement | null

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean
}
