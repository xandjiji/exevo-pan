import { circularArrayIndex } from './utils'
import { AutocompleteInputState, Action } from './types'

const AutocompleteInputReducer = (
  state: AutocompleteInputState,
  action: Action,
): AutocompleteInputState => {
  const { highlightedIndex } = state

  switch (action.type) {
    case 'USER_TYPING':
      return {
        ...state,
        inputValue: action.value,
        highlightedIndex: undefined,
        listboxStatus: true,
      }

    case 'OPTION_SELECTED':
      return {
        ...state,
        inputValue: '',
        highlightedIndex: undefined,
        listboxStatus: false,
      }

    case 'ARROW_NAVIGATION': {
      let newIndex: number
      if (highlightedIndex === undefined) {
        newIndex = action.value === 1 ? 0 : action.list.length - 1
      } else {
        newIndex = circularArrayIndex(
          highlightedIndex + action.value,
          action.list,
        )
      }
      return {
        ...state,
        listboxStatus: true,
        highlightedIndex: newIndex,
        inputValue: action.list[newIndex].name,
      }
    }

    case 'SET_LISTBOX_STATUS':
      return { ...state, listboxStatus: action.value }

    default:
      return { ...state }
  }
}

export default AutocompleteInputReducer
