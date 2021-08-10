import { HTMLAttributes } from 'react'

export interface ListboxProps extends HTMLAttributes<HTMLDivElement> {
  highlightedIndex?: number
  selectedIndex?: Set<number>
  onSelectOption?: (option: Option) => void
}
