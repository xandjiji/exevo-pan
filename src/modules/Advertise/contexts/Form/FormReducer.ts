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

    case 'SET_EMAIL':
      return {
        ...state,
        email: action.email,
      }

    case 'SET_COINS_CHARACTER':
      return {
        ...state,
        sendingCoinsCharacter: action.sendingCoinsCharacter,
      }

    default:
      return { ...state }
  }
}

export default FormReducer
