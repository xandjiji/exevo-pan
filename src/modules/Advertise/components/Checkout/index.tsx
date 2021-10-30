import { useTranslations } from 'contexts/useTranslation'
import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import { MailCheckoutClient } from 'services'
import { useForm } from '../../contexts/Form'
import LabelledInput from './LabelledInput'
import { validateEmail, validateCharacter, randomCharacter } from './utils'
import * as S from './styles'

const Checkout = (): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { locale } = useRouter()

  const {
    selectedCharacter,
    selectedDates,
    paymentMethod,
    email,
    paymentCharacter,
    dispatch,
  } = useForm()
  const [sendingEmail, setSendingEmail] = useState(false)

  const needsCharacterInfo = paymentMethod === 'TIBIA_COINS'

  const emptyFields = needsCharacterInfo
    ? !email.value || !paymentCharacter.value
    : !email.value

  const invalidFields =
    email.state === 'invalid' || paymentCharacter.state === 'invalid'

  const isButtonDisabled = emptyFields || invalidFields

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target
      dispatch({
        type: 'SET_INPUT',
        values: {
          [id]: { value, state: 'neutral' },
        },
      })
    },
    [dispatch],
  )

  const submit = async () => {
    setSendingEmail(true)
    const uuid = await MailCheckoutClient.postMail({
      selectedCharacter: selectedCharacter as CharacterObject,
      selectedDates,
      paymentMethod,
      email: email.value,
      paymentCharacter: paymentCharacter.value,
      locale: locale ?? 'en',
    })
    setSendingEmail(false)

    dispatch({ type: 'FINISH_FORM', uuid })
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

      if (!isCharacterValid) return
    }
    if (!isEmailValid) return
    submit()
  }

  const handleKeypress = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' && !isButtonDisabled) {
      validateAndSubmit()
    }
  }

  const { current: randomNickname } = useRef(randomCharacter())

  return (
    <S.Wrapper>
      <S.Title>{advertise.Checkout.title}</S.Title>
      <LabelledInput
        id="email"
        labelText="Email"
        placeholder={advertise.Checkout.emailPlaceholder}
        validationState={email.state}
        errorMessage={
          email.state === 'invalid'
            ? advertise.Checkout.emailInvalidMessage
            : undefined
        }
        onKeyPress={handleKeypress}
        onChange={handleChange}
        value={email.value}
      />
      {paymentMethod === 'TIBIA_COINS' && (
        <LabelledInput
          id="paymentCharacter"
          labelText={advertise.Checkout.paymentCharacterLabel}
          placeholder={`e.g, '${randomNickname}'`}
          validationState={paymentCharacter.state}
          errorMessage={
            paymentCharacter.state === 'invalid'
              ? advertise.Checkout.paymentCharacterInvalidMessage
              : undefined
          }
          onKeyPress={handleKeypress}
          onChange={handleChange}
          value={paymentCharacter.value}
        />
      )}

      <S.Button
        type="button"
        aria-label={advertise.Checkout.checkoutButtonLabel}
        disabled={isButtonDisabled}
        onClick={validateAndSubmit}
      >
        {sendingEmail ? <S.Loading /> : advertise.Checkout.checkoutButton}
      </S.Button>
    </S.Wrapper>
  )
}

export default Checkout
