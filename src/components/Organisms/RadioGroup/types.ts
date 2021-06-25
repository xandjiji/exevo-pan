import { HTMLAttributes } from 'react'

export interface RadioGroupProps {
  children: React.ReactNode
  indexValue?: number
  onChange?: (index: number) => void
  props?: HTMLAttributes<HTMLDivElement>
}
