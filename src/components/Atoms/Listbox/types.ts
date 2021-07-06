import { HTMLAttributes } from 'react'

export interface ListboxProps extends HTMLAttributes<HTMLDivElement> {
  highlightedIndex?: Set<number>
  selectedIndex?: Set<number>
  onSelectOption?: (option: Option) => void
}
