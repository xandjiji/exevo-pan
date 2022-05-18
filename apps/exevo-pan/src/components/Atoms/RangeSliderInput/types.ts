import { HTMLAttributes } from 'react'

export interface RangeSliderInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
  min: number
  max: number
  onChange?: (values: [number, number]) => void
  value?: [number, number]
}

export type TrackFillProps = {
  isMousePressed: boolean
} & JSX.IntrinsicElements['div']
