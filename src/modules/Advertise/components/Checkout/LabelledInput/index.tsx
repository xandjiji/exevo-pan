import * as S from './styles'
import { LabelledInputProps, InputStates } from './types'

const SelectIcon = {
  valid: <S.ValidIcon aria-label="Field is valid" />,
  invalid: <S.InvalidIcon aria-label="Field is invalid" />,
  neutral: <S.InvalidIcon aria-hidden />,
  loading: <S.Loading aria-label="Validating..." />,
} as Record<InputStates, React.ReactNode>

const LabelledInput = ({
  id,
  labelText,
  validationState = 'neutral',
  ...props
}: LabelledInputProps): JSX.Element => {
  const isValid = validationState === 'valid'

  return (
    <S.Wrapper valid={isValid}>
      <S.Label htmlFor={id}>{labelText}</S.Label>
      <S.Input id={id} {...props} />
      {SelectIcon[validationState]}
    </S.Wrapper>
  )
}

export default LabelledInput
export type { InputStates }
