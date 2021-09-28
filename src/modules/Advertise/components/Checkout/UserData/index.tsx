import { useState } from 'react'
import { useForm } from '../../../contexts/Form'
import LabelledInput, { InputStates } from './LabelledInput'
import { validateEmail, validateCharacter } from './utils'
import * as S from './styles'

const UserData = (): JSX.Element => {
  const { paymentMethod } = useForm()

  const [email, setEmail] = useState('')
  const [emailValidation, setEmailValidation] = useState<InputStates>('neutral')

  const [character, setCharacter] = useState('')
  const [characterValidation, setCharacterValidation] =
    useState<InputStates>('neutral')

  const needsCharacterInfo = paymentMethod === 'TIBIA_COINS'

  const emptyFields = needsCharacterInfo ? !email || !character : !email

  const invalidFields =
    emailValidation === 'invalid' || characterValidation === 'invalid'

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValidation('neutral')
    setEmail(event.target.value)
  }

  const handleCharacterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCharacterValidation('neutral')
    setCharacter(event.target.value)
  }

  const validateAndSubmit = async () => {
    const isEmailValid = validateEmail(email)
    setEmailValidation(isEmailValid ? 'valid' : 'invalid')

    if (needsCharacterInfo) {
      setCharacterValidation('loading')
      const isCharacterValid = await validateCharacter(character)
      setCharacterValidation(isCharacterValid ? 'valid' : 'invalid')
    }
  }

  return (
    <S.Wrapper>
      <S.Title>Your information</S.Title>
      <LabelledInput
        id="email-input"
        labelText="Email"
        placeholder="you@email.com"
        errorMessage={
          emailValidation === 'invalid' ? 'Invalid email' : undefined
        }
        onChange={handleEmailChange}
        validationState={emailValidation}
      />
      {paymentMethod === 'TIBIA_COINS' && (
        <LabelledInput
          id="nickname-input"
          labelText="Sending coins character"
          placeholder="e.g, 'Eternal Oblivion'"
          errorMessage={
            characterValidation === 'invalid'
              ? 'Character does not exist'
              : undefined
          }
          onChange={handleCharacterChange}
          validationState={characterValidation}
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
