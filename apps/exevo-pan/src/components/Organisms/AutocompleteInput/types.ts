import { ExtendedProps, CustomProps } from 'components/Atoms/Input/types'

export type AutocompleteInputProps = {
  itemList?: Option[]
  placeholder?: string
  onItemSelect?: (selectedItem: Option) => void
} & CustomProps &
  AccessibleLabelProps &
  Omit<ExtendedProps, 'ref'>

export interface AutocompleteInputState {
  itemList: Option[]
  filteredList: Option[]
  listboxStatus: boolean
  highlightedIndex: number | undefined
  inputValue: string
}

export type Action =
  | { type: 'ARROW_NAVIGATION'; code: 'ArrowUp' | 'ArrowDown' }
  | { type: 'OPTION_SELECTED' }
  | { type: 'SET_LISTBOX_STATUS'; value: boolean }
  | { type: 'USER_TYPING'; value: string }
  | { type: 'REDEFINE_LIST'; itemList: Option[] }
