import { InputProps } from 'components/Atoms/Input/types'

export type InputStates = 'invalid' | 'loading' | 'neutral' | 'valid'

export interface LabelledInputProps extends InputProps {
  id: string
  labelText: string
  validationState?: InputStates
}
