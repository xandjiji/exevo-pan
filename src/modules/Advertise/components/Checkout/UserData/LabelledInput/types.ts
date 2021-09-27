import { InputProps } from 'components/Atoms/Input/types'

export interface LabelledInputProps extends InputProps {
  id: string
  labelText: string
  validationState?: 'invalid' | 'neutral' | 'valid'
}
