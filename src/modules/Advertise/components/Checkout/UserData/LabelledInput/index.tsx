import * as S from './styles'
import { LabelledInputProps } from './types'

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
      {isValid ? (
        <S.ValidIcon aria-label="Field is valid" />
      ) : (
        <S.InvalidIcon
          aria-label="Field is invalid"
          aria-hidden={validationState === 'neutral'}
        />
      )}
    </S.Wrapper>
  )
}

export default LabelledInput
