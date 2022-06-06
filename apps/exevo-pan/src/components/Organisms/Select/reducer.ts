import { clampValue } from 'utils'
import { getChildrenOptions } from './utils'
import { SelectState, Action } from './types'

const SelectReducer = (state: SelectState, action: Action): SelectState => {
  const { controlledValue, highlightedIndex, options, dispatchChangeEvent } =
    state

  switch (action.type) {
    case 'ARROW_NAVIGATION': {
      const currentHighlightedIndex = controlledValue
        ? options.findIndex(({ value }) => value === controlledValue)
        : highlightedIndex

      const newIndex = clampValue(
        (currentHighlightedIndex ?? -1) + (action.code === 'ArrowUp' ? -1 : 1),
        [0, options.length - 1],
      )

      if (newIndex === highlightedIndex) return state
      const newValue = options[newIndex].value
      dispatchChangeEvent(newValue)
      return {
        ...state,
        highlightedIndex: controlledValue ? highlightedIndex : newIndex,
        innerValue: newValue,
      }
    }

    case 'OPTION_SELECTED':
      dispatchChangeEvent(action.selectedValue)
      return {
        ...state,
        listboxStatus: false,
        innerValue: action.selectedValue,
        highlightedIndex: controlledValue
          ? highlightedIndex
          : options.findIndex(({ value }) => value === action.selectedValue),
      }

    case 'SET_LISTBOX_STATUS':
      if (action.value === state.listboxStatus) return state
      return {
        ...state,
        listboxStatus: action.value ?? !state.listboxStatus,
      }

    case 'SYNC_OPTIONS':
      return {
        ...state,
        options: getChildrenOptions(action.children),
      }

    case 'SYNC_CONTROLLED_VALUE':
      return {
        ...state,
        controlledValue: action.propValue,
      }

    default:
      return state
  }
}

export default SelectReducer
