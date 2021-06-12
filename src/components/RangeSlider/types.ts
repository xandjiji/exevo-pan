import { HTMLAttributes } from 'react'

export interface RangeSliderProps {
  min: number
  max: number
  initialValue?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  props?: HTMLAttributes<HTMLInputElement>
}
