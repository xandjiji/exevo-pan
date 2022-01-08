import { InputProps } from 'components/Atoms/Input/types'
import { InputStates } from '../../../contexts/Form/types'

export interface LabelledInputProps extends InputProps {
  id: string
  labelText: string
  validationState?: InputStates
}

export type { InputStates }
