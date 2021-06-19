import { HTMLAttributes } from 'react'

export interface SliderInputProps {
  min: number
  max: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: number
  props?: HTMLAttributes<HTMLInputElement>
}

export interface TrackStyleProps {
  active?: boolean
}

export interface SliderInputStyleProps {
  valid: boolean
}
