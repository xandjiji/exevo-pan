import { filterByTerm, circularArrayIndex } from './utils'
import { AutocompleteInputState, Action } from './types'

export default (
  state: AutocompleteInputState,
  action: Action,
): AutocompleteInputState => {
  const { highlightedIndex, currentList, onItemSelect } = state

  switch (action.type) {
    case 'userTyping':
      return {
        ...state,
        inputValue: action.value,
        currentList: filterByTerm(action.value, action.list),
        highlightedIndex: undefined,
        listboxStatus: true,
      }

    case 'optionSelected':
      if (highlightedIndex === undefined) {
        return { ...state }
      } else {
        onItemSelect?.(currentList[highlightedIndex])
        return {
          ...state,
          inputValue: '',
          currentList: action.list,
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
          inputValue: currentList[0].name,
        }
      } else {
        const newIndex = circularArrayIndex(
          highlightedIndex + action.value,
          currentList,
        )
        return {
          ...state,
          listboxStatus: true,
          highlightedIndex: newIndex,
          inputValue: currentList[newIndex].name,
        }
      }

    case 'setListboxStatus':
      return { ...state, listboxStatus: action.value }

    default:
      return { ...state }
  }
}
