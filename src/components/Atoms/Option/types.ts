import { HTMLAttributes } from 'react'

export interface OptionProps extends HTMLAttributes<HTMLOptionElement> {
  children: string
  value?: string
}
