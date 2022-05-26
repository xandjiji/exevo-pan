import { InputProps } from 'components/Atoms/Input/types'
import { InputStates } from '../../../contexts/Form/types'

export type LabelledInputProps = {
  validationState?: InputStates
} & InputProps

export type { InputStates }
