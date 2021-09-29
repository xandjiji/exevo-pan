import { createContext, useContext, useReducer } from 'react'
import FormReducer from './FormReducer'
import { FormProviderProps, FormValues, InputState } from './types'

const initialInput: InputState = {
  value: '',
  state: 'neutral',
}

const defaultState: FormValues = {
  currentStep: 0,
  selectedCharacter: undefined,
  selectedDates: [],
  paymentMethod: 'TIBIA_COINS',
  isValid: false,
  email: { ...initialInput },
  paymentCharacter: { ...initialInput },
  dispatch: () => {},
}

const FormContext = createContext<FormValues>(defaultState)

export const FormProvider = ({ children }: FormProviderProps): JSX.Element => {
  const [
    {
      currentStep,
      selectedCharacter,
      selectedDates,
      paymentMethod,
      email,
      paymentCharacter,
    },
    dispatch,
  ] = useReducer(FormReducer, {
    currentStep: defaultState.currentStep,
    selectedCharacter: defaultState.selectedCharacter,
    selectedDates: defaultState.selectedDates,
    paymentMethod: defaultState.paymentMethod,
    email: defaultState.email,
    paymentCharacter: defaultState.paymentCharacter,
  })

  const isValid: boolean = [!!selectedCharacter, !!selectedDates.length][
    currentStep
  ]

  return (
    <FormContext.Provider
      value={{
        currentStep,
        selectedCharacter,
        selectedDates,
        paymentMethod,
        isValid,
        email,
        paymentCharacter,
        dispatch,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useForm = (): FormValues => useContext(FormContext)
