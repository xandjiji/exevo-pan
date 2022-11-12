import { HTMLAttributes } from 'react'

export type ListboxProps = {
  highlightedIndex?: number
  selectedIndex?: Set<number>
  onSelectOption?: (option: Option) => void
} & HTMLAttributes<HTMLDivElement>
