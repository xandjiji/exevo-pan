import {
  ExtendedProps,
  CustomProps,
  LabelProps,
} from 'components/Atoms/Input/types'

export type AutocompleteInputProps = {
  itemList?: Option[]
  placeholder?: string
  onItemSelect?: (selectedItem: Option) => void
} & CustomProps &
  LabelProps &
  ExtendedProps

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
