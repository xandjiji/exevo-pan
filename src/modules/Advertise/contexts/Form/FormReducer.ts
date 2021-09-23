import { FormContextState, Action } from './types'

const FormReducer = (
  state: FormContextState,
  action: Action,
): FormContextState => {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: state.currentStep + 1,
      }

    case 'SELECT_CHARACTER':
      return {
        ...state,
        selectedCharacter: action.character,
      }

    case 'SELECT_DATES':
      return {
        ...state,
        selectedDates: action.dates,
      }

    case 'TOGGLE_DATE': {
      if (state.selectedDates.includes(action.date)) {
        return {
          ...state,
          selectedDates: state.selectedDates.filter(
            (date) => date !== action.date,
          ),
        }
      }
      return {
        ...state,
        selectedDates: [...state.selectedDates, action.date],
      }
    }

    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.method,
      }

    default:
      return { ...state }
  }
}

export default FormReducer
