import { clampValue } from 'utils'
import { findOptionIndexByValue } from './utils'
import { SelectState, Action } from './types'

const SelectReducer = (state: SelectState, action: Action): SelectState => {
  const { isControlled, dispatchChangeEvent } = state

  switch (action.type) {
    case 'ARROW_NAVIGATION': {
      const { options } = action
      const selectedOptionIndex = findOptionIndexByValue(
        options,
        action.currentValue,
      )

      const newIndex = clampValue(
        selectedOptionIndex + (action.code === 'ArrowUp' ? -1 : 1),
        [0, options.length - 1],
      )

      if (newIndex === selectedOptionIndex) return state
      const newValue = options[newIndex].value
      dispatchChangeEvent(newValue)

      return isControlled
        ? state
        : {
            ...state,
            innerValue: newValue,
          }
    }

    case 'OPTION_SELECTED':
      dispatchChangeEvent(action.selectedValue)
      return {
        ...state,
        listboxStatus: false,
        innerValue: isControlled ? state.innerValue : action.selectedValue,
      }

    case 'SET_LISTBOX_STATUS':
      if (action.value === state.listboxStatus) return state
      return {
        ...state,
        listboxStatus: action.value ?? !state.listboxStatus,
      }

    default:
      return state
  }
}

export default SelectReducer
