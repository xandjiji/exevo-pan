import { HTMLAttributes } from 'react'

export interface RangeSliderInputProps {
  min: number
  max: number
  onChange?: (values: [number, number]) => void
  value?: [number, number]
  props?: HTMLAttributes<HTMLInputElement>
}

export interface ActiveStyleProps {
  active?: boolean
}
