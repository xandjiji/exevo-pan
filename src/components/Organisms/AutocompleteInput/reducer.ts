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
      if (highlightedIndex === undefined) {
        return { ...state }
      } else {
        return {
          ...state,
          inputValue: '',
          highlightedIndex: undefined,
          listboxStatus: false,
        }
      }

    case 'arrowNavigation':
      if (highlightedIndex === undefined) {
        return {
          ...state,
          listboxStatus: true,
          highlightedIndex: 0,
          inputValue: action.list[0].name,
        }
      } else {
        const newIndex = circularArrayIndex(
          highlightedIndex + action.value,
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
