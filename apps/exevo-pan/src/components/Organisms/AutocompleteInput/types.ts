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
  | { type: 'ARROW_NAVIGATION'; value: number; list: Option[] }
  | { type: 'OPTION_SELECTED' }
  | { type: 'SET_LISTBOX_STATUS'; value: boolean }
  | { type: 'USER_TYPING'; value: string }
