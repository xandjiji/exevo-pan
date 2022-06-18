import { isInRange } from './utils'
import { SliderState, Action } from './types'

const SliderReducer = (state: SliderState, action: Action): SliderState => {
  const { isControlled, dispatchChangeEvent } = state

  switch (action.type) {
    case 'UPDATE_VALUE':
      if (action.value === state.innerValue) return state
      dispatchChangeEvent(action.value)

      if (isControlled) return state
      return {
        ...state,
        innerValue: action.value,
        inputValue: action.value,
      }

    case 'INPUT_TYPING': {
      if (action.value === state.inputValue) return state

      const numberValue = parseFloat(action.value)
      const isValidInput =
        !Number.isNaN(numberValue) && isInRange(numberValue, action.range)

      if (isValidInput) dispatchChangeEvent(numberValue)

      return {
        ...state,
        inputValue: action.value,
        innerValue:
          isValidInput && !isControlled ? numberValue : state.innerValue,
      }
    }

    case 'SET_VALUE':
      if (action.value === parseFloat(state.inputValue.toString())) return state
      return {
        ...state,
        innerValue: action.value,
        inputValue: action.value,
      }

    default:
      return state
  }
}

export default SliderReducer
