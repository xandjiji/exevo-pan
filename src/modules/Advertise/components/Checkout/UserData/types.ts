import { InputStates } from './LabelledInput'

export type InputState = {
  value: string
  state: InputStates
}

export interface UserDataState {
  email: InputState
  paymentCharacter: InputState
}

export type Action =
  | {
      type: 'SET_INPUT'
      values: Partial<Pick<UserDataState, 'email' | 'paymentCharacter'>>
    }
  | {
      type: 'VALIDATE_INPUT'
      key: keyof Pick<UserDataState, 'email' | 'paymentCharacter'>
      state: InputStates
    }
