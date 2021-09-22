import { ReactNode } from 'react'

export type Action =
  | {
      type: 'NEXT_STEP'
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

export interface FormContextState {
  currentStep: number
  selectedCharacter: CharacterObject | undefined
  selectedDates: string[]
}

export interface FormValues extends FormContextState {
  dispatch: (action: Action) => void
}

export interface FormProviderProps {
  children?: ReactNode
}
