import { HTMLAttributes } from 'react'

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  indexValue?: number
  onChange?: (index: number) => void
}
