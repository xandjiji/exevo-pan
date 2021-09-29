import { useForm } from '../../../contexts/Form'
import LabelledInput from './LabelledInput'
import { validateEmail, validateCharacter } from './utils'
import * as S from './styles'

const UserData = (): JSX.Element => {
  const { paymentMethod, email, paymentCharacter, dispatch } = useForm()

  const needsCharacterInfo = paymentMethod === 'TIBIA_COINS'

  const emptyFields = needsCharacterInfo
    ? !email.value || !paymentCharacter.value
    : !email.value

  const invalidFields =
    email.state === 'invalid' || paymentCharacter.state === 'invalid'

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    dispatch({
      type: 'SET_INPUT',
      values: {
        [id]: { value, state: 'neutral' },
      },
    })
  }

  const validateAndSubmit = async () => {
    const isEmailValid = validateEmail(email.value)
    dispatch({
      type: 'VALIDATE_INPUT',
      key: 'email',
      state: isEmailValid ? 'valid' : 'invalid',
    })

    if (needsCharacterInfo) {
      dispatch({
        type: 'VALIDATE_INPUT',
        key: 'paymentCharacter',
        state: 'loading',
      })
      const isCharacterValid = await validateCharacter(paymentCharacter.value)
      dispatch({
        type: 'VALIDATE_INPUT',
        key: 'paymentCharacter',
        state: isCharacterValid ? 'valid' : 'invalid',
      })
    }
  }

  return (
    <S.Wrapper>
      <S.Title>Your information</S.Title>
      <LabelledInput
        id="email"
        labelText="Email"
        placeholder="you@email.com"
        errorMessage={email.state === 'invalid' ? 'Invalid email' : undefined}
        onChange={handleChange}
        value={email.value}
        validationState={email.state}
      />
      {paymentMethod === 'TIBIA_COINS' && (
        <LabelledInput
          id="paymentCharacter"
          labelText="Sending coins character"
          placeholder="e.g, 'Eternal Oblivion'"
          errorMessage={
            paymentCharacter.state === 'invalid'
              ? 'Character does not exist'
              : undefined
          }
          onChange={handleChange}
          value={paymentCharacter.value}
          validationState={paymentCharacter.state}
        />
      )}

      <S.Button
        type="button"
        aria-label="Validate and submit checkout"
        disabled={emptyFields || invalidFields}
        onClick={validateAndSubmit}
      >
        Checkout
      </S.Button>
    </S.Wrapper>
  )
}

export default UserData
