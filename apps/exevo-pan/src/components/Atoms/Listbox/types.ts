import { HTMLAttributes } from 'react'
import { OptionProps } from '../Option/types'

export type ListboxProps = {
  highlightedIndex?: number
  selectedIndex?: Set<number>
  onSelectOption?: (option: Option) => void
  children: JSX.Element & React.ReactElement<OptionProps>
} & HTMLAttributes<HTMLDivElement>
