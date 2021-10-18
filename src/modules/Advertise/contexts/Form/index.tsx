import { createContext, useContext, useReducer } from 'react'
import FormReducer from './FormReducer'
import { FormProviderProps, FormValues, InputState } from './types'

const initialInput: InputState = {
  value: '',
  state: 'neutral',
}

const defaultState: FormValues = {
  uuid: '',
  currentStep: 0,
  selectedCharacter: undefined,
  selectedDates: [],
  paymentMethod: 'TIBIA_COINS',
  isValid: false,
  email: { ...initialInput },
  paymentCharacter: { ...initialInput },
  finished: false,
  dispatch: () => {},
}

const FormContext = createContext<FormValues>(defaultState)

export const FormProvider = ({ children }: FormProviderProps): JSX.Element => {
  const [formValues, dispatch] = useReducer(FormReducer, {
    uuid: defaultState.uuid,
    currentStep: defaultState.currentStep,
    selectedCharacter: defaultState.selectedCharacter,
    selectedDates: defaultState.selectedDates,
    paymentMethod: defaultState.paymentMethod,
    email: defaultState.email,
    paymentCharacter: defaultState.paymentCharacter,
    finished: defaultState.finished,
  })

  const { selectedCharacter, selectedDates, currentStep } = formValues

  const isValid: boolean = [!!selectedCharacter, !!selectedDates.length][
    currentStep
  ]

  return (
    <FormContext.Provider value={{ ...formValues, isValid, dispatch }}>
      {children}
    </FormContext.Provider>
  )
}

export const useForm = (): FormValues => useContext(FormContext)
