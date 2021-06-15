import { HTMLAttributes } from 'react'

export interface RangeSliderProps {
  min: number
  max: number
  initialMin?: number
  initialMax?: number
  onChange?: (values: number[]) => void
  props?: HTMLAttributes<HTMLInputElement>
}

export interface CursorStyleProps {
  active?: boolean
}
