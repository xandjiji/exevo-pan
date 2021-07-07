import { HTMLAttributes } from 'react'

export interface AutocompleteInputProps extends HTMLAttributes<HTMLDivElement> {
  itemList?: Option[]
  placeholder?: string
}

export interface AutocompleteInputState {
  listboxStatus: boolean
  highlightedIndex: number | undefined
  inputValue: string
  originalList: Option[]
  currentList: Option[]
}

export type Action =
  | { type: 'arrowNavigation'; value: number }
  | { type: 'optionSelected' }
  | { type: 'setListboxStatus'; value: boolean }
  | { type: 'userTyping'; value: string }
