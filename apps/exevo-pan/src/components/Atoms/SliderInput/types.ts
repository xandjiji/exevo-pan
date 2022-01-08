import { HTMLAttributes } from 'react'

export interface SliderInputProps extends HTMLAttributes<HTMLInputElement> {
  min: number
  max: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: number
}

export interface TrackStyleProps {
  active?: boolean
}

export interface SliderInputStyleProps {
  valid: boolean
}
