import { useTranslations } from 'contexts/useTranslation'
import { useMemo } from 'react'
import * as S from './styles'
import { LabelledInputProps, InputStates } from './types'

const LabelledInput = ({
  id,
  labelText,
  validationState = 'neutral',
  ...props
}: LabelledInputProps): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  const StateIcon = useMemo(
    () =>
      ((
        {
          valid: (
            <S.ValidIcon aria-label={advertise.Checkout.LabelledInput.valid} />
          ),
          invalid: (
            <S.InvalidIcon
              aria-label={advertise.Checkout.LabelledInput.invalid}
            />
          ),
          neutral: <S.InvalidIcon aria-hidden />,
          loading: (
            <S.Loading aria-label={advertise.Checkout.LabelledInput.loading} />
          ),
        } as Record<InputStates, React.ReactNode>
      )[validationState]),
    [advertise, validationState],
  )

  const isValid = validationState === 'valid'

  return (
    <S.Wrapper valid={isValid}>
      <S.Label htmlFor={id}>{labelText}</S.Label>
      <S.Input id={id} {...props} />
      {StateIcon}
    </S.Wrapper>
  )
}

export default LabelledInput
export type { InputStates }
