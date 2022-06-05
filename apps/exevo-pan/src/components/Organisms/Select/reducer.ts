import { clampValue } from 'utils'
import { getChildrenOptions } from './utils'
import { SelectState, Action } from './types'

const SelectReducer = (state: SelectState, action: Action): SelectState => {
  const { highlightedIndex, options } = state

  switch (action.type) {
    case 'ARROW_NAVIGATION': {
      const newIndex = clampValue(
        (highlightedIndex ?? -1) + (action.code === 'ArrowUp' ? -1 : 1),
        [0, options.length - 1],
      )

      if (newIndex === state.highlightedIndex) return state
      return {
        ...state,
        highlightedIndex: newIndex,
        value: options[newIndex].value,
      }
    }

    case 'SET_LISTBOX_STATUS':
      if (action.value === state.listboxStatus) return state
      return { ...state, listboxStatus: action.value ?? !state.listboxStatus }

    case 'REDEFINE_OPTIONS':
      return {
        ...state,
        options: getChildrenOptions(action.children),
      }

    default:
      return state
  }
}

export default SelectReducer
