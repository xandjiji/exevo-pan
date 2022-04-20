import { HTMLAttributes } from 'react'

export interface SliderInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  min: number
  max: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: number
}
