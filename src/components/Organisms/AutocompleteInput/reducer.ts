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

    case 'setListboxStatus':
      return { ...state, listboxStatus: action.value }

    default:
      return { ...state }
  }
}
