import { HTMLAttributes } from 'react'

export interface AutocompleteInputProps extends HTMLAttributes<HTMLDivElement> {
  itemList?: Option[]
  placeholder?: string
}
