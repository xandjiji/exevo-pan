import { HTMLAttributes } from 'react'

export interface ListboxProps extends HTMLAttributes<HTMLDivElement> {
  highlightedIndex?: number[] | number
  onSelectOption?: (option: Option) => void
}
