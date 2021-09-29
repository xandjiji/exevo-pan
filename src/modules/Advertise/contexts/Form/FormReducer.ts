import { getRecommendedDays } from './utils'
import { FormContextState, Action } from './types'

const FormReducer = (
  state: FormContextState,
  action: Action,
): FormContextState => {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.newStep,
      }

    case 'SELECT_CHARACTER':
      return {
        ...state,
        selectedCharacter: action.character,
        selectedDates: getRecommendedDays(action.character.auctionEnd),
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

    case 'SET_INPUT':
      return {
        ...state,
        ...action.values,
      }
    case 'VALIDATE_INPUT':
      return {
        ...state,
        [action.key]: { ...state[action.key], state: action.state },
      }

    /* case 'FINISH_CHECKOUT':
      return {
        ...state,
        email: action.email,
        sendingCoinsCharacter: action.sendingCoinsCharacter,
        currentStep: state.currentStep + 1,
      } */

    default:
      return { ...state }
  }
}

export default FormReducer
