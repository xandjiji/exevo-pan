import { circularArrayIndex } from './utils'
import { AutocompleteInputState, Action } from './types'

export default (
  state: AutocompleteInputState,
  action: Action,
): AutocompleteInputState => {
  const { highlightedIndex } = state

  switch (action.type) {
    case 'userTyping':
      return {
        ...state,
        inputValue: action.value,
        highlightedIndex: undefined,
        listboxStatus: true,
      }

    case 'optionSelected':
      return {
        ...state,
        inputValue: '',
        highlightedIndex: undefined,
        listboxStatus: false,
      }

    case 'arrowNavigation': {
      const newIndex = circularArrayIndex(
        (highlightedIndex ?? 0) + action.value,
        action.list,
      )
      return {
        ...state,
        listboxStatus: true,
        highlightedIndex: newIndex,
        inputValue: action.list[newIndex].name,
      }
    }

    case 'setListboxStatus':
      return { ...state, listboxStatus: action.value }

    default:
      return { ...state }
  }
}
