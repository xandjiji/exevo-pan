import { HTMLAttributes } from 'react'

export type RadioGroupProps = {
  indexValue?: number
  onChange?: (index: number) => void
  children: JSX.Element &
    React.ReactElement<{
      id?: string
      highlighted?: boolean
      'aria-selected'?: boolean
      onClick?: boolean
    }>
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>
