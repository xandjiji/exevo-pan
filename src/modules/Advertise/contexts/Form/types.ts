import { ReactNode } from 'react'

export type PaymentMethods = 'TIBIA_COINS' | 'PIX'

export type Action =
  | {
      type: 'SET_STEP'
      newStep: number
    }
  | {
      type: 'SELECT_CHARACTER'
      character: CharacterObject
    }
  | {
      type: 'SELECT_DATES'
      dates: string[]
    }
  | {
      type: 'TOGGLE_DATE'
      date: string
    }
  | {
      type: 'SET_PAYMENT_METHOD'
      method: PaymentMethods
    }
  | {
      type: 'SET_EMAIL'
      email: string
    }
  | {
      type: 'SET_COINS_CHARACTER'
      sendingCoinsCharacter: string
    }

export interface FormContextState {
  currentStep: number
  selectedCharacter: CharacterObject | undefined
  selectedDates: string[]
  paymentMethod: PaymentMethods
  email: string
  sendingCoinsCharacter: string
}

export interface FormValues extends FormContextState {
  isValid: boolean
  dispatch: (action: Action) => void
}

export interface FormProviderProps {
  children?: ReactNode
}
