import { ReactNode } from 'react'

export type InputStates = 'invalid' | 'loading' | 'neutral' | 'valid'

export type InputState = {
  value: string
  state: InputStates
}

export interface FormContextState {
  uuid: string
  currentStep: number
  selectedCharacter: CharacterObject | undefined
  selectedDates: string[]
  paymentMethod: PaymentMethods
  email: InputState
  paymentCharacter: InputState
  finished: boolean
}

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
      type: 'SET_INPUT'
      values: Partial<Pick<FormContextState, 'email' | 'paymentCharacter'>>
    }
  | {
      type: 'VALIDATE_INPUT'
      key: keyof Pick<FormContextState, 'email' | 'paymentCharacter'>
      state: InputStates
    }
  | {
      type: 'FINISH_FORM'
      uuid: string
    }

export interface FormValues extends FormContextState {
  isValid: boolean
  dispatch: (action: Action) => void
}

export interface FormProviderProps {
  children?: ReactNode
}
