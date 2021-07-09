import { HTMLAttributes } from 'react'

export interface AutocompleteInputProps
  extends HTMLAttributes<HTMLInputElement> {
  itemList?: Option[]
  placeholder?: string
  onItemSelect?: (selectedItem: Option) => void
}

export interface AutocompleteInputState {
  listboxStatus: boolean
  highlightedIndex: number | undefined
  inputValue: string
}

export type Action =
  | { type: 'arrowNavigation'; value: number; list: Option[] }
  | { type: 'optionSelected' }
  | { type: 'setListboxStatus'; value: boolean }
  | { type: 'userTyping'; value: string }
