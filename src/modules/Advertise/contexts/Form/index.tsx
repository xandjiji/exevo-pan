import { createContext, useContext, useReducer } from 'react'
import FormReducer from './FormReducer'
import { FormProviderProps, FormValues } from './types'

const defaultState: FormValues = {
  formStep: 0,
  selectedCharacter: undefined,
  selectedDates: [],
  dispatch: () => {},
}

const FormContext = createContext<FormValues>(defaultState)

export const FormProvider = ({ children }: FormProviderProps): JSX.Element => {
  const [{ formStep, selectedCharacter, selectedDates }, dispatch] = useReducer(
    FormReducer,
    {
      formStep: defaultState.formStep,
      selectedCharacter: defaultState.selectedCharacter,
      selectedDates: defaultState.selectedDates,
    },
  )

  return (
    <FormContext.Provider
      value={{ formStep, selectedCharacter, selectedDates, dispatch }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useForm = (): FormValues => useContext(FormContext)
