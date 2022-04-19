import { HTMLAttributes } from 'react'

type ExtendedOptionProps = Omit<
  HTMLAttributes<HTMLOptionElement>,
  'children' | 'onClick'
>

export interface OptionProps extends ExtendedOptionProps {
  children: string
  value?: string
  highlighted?: boolean
  onClick?: (option: Option) => void
}
