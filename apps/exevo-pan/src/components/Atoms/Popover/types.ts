import { HTMLAttributes } from 'react'
import { Placement } from '@popperjs/core'

export type PopoverProps = {
  children: React.ReactNode
  content: React.ReactElement<{
    'aria-hidden'?: boolean
    disabled?: boolean
    hidden?: boolean
  }>
  placement?: Placement
  trigger?: 'click' | 'hover' | 'none'
  visible?: boolean
  offset?: [number, number]
} & HTMLAttributes<HTMLDivElement>

export type PopperReferenceElement = HTMLDivElement | null
