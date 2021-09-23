import { createContext, useContext, useReducer } from 'react'
import FormReducer from './FormReducer'
import { FormProviderProps, FormValues } from './types'

const defaultState: FormValues = {
  currentStep: 0,
  selectedCharacter: undefined,
  selectedDates: [],
  paymentMethod: 'TIBIA_COINS',
  dispatch: () => {},
}

const FormContext = createContext<FormValues>(defaultState)

export const FormProvider = ({ children }: FormProviderProps): JSX.Element => {
  const [
    { currentStep, selectedCharacter, selectedDates, paymentMethod },
    dispatch,
  ] = useReducer(FormReducer, {
    currentStep: defaultState.currentStep,
    selectedCharacter: defaultState.selectedCharacter,
    selectedDates: defaultState.selectedDates,
    paymentMethod: defaultState.paymentMethod,
  })

  return (
    <FormContext.Provider
      value={{
        currentStep,
        selectedCharacter,
        selectedDates,
        paymentMethod,
        dispatch,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useForm = (): FormValues => useContext(FormContext)
