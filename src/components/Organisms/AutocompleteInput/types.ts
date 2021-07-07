import { HTMLAttributes } from 'react'

export interface AutocompleteInputProps extends HTMLAttributes<HTMLDivElement> {
  itemList?: Option[]
  placeholder?: string
  onItemSelect?: (selectedItem: Option) => void
}

export interface AutocompleteInputState {
  listboxStatus: boolean
  highlightedIndex: number | undefined
  inputValue: string
  currentList: Option[]
  onItemSelect?: (selectedItem: Option) => void
}

export type Action =
  | { type: 'arrowNavigation'; value: number }
  | { type: 'optionSelected'; list: Option[] }
  | { type: 'setListboxStatus'; value: boolean }
  | { type: 'userTyping'; value: string; list: Option[] }
