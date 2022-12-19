import { useTranslations } from 'contexts/useTranslation'
import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import { TitledCard, Input, Button } from 'components/Atoms'
import { MailCheckoutClient } from 'services/client'
import { randomCharacter } from 'utils'
import { locales } from 'Constants'
import { useForm } from '../../contexts/Form'
import { validateEmail, validateCharacter } from './utils'

const { DEFAULT_LOCALE } = locales

type CheckoutProps = {
  isPro: boolean
}

const Checkout = ({ isPro }: CheckoutProps) => {
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
      isPro,
      selectedCharacter: selectedCharacter as CharacterObject,
      selectedDates,
      paymentMethod,
      email: email.value,
      paymentCharacter: paymentCharacter.value,
      locale: locale ?? DEFAULT_LOCALE,
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

  const handleKeypress: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === 'Enter' && !isButtonDisabled) {
      validateAndSubmit()
    }
  }

  const { current: randomNickname } = useRef(randomCharacter())

  return (
    <TitledCard
      variant="rounded"
      title={<h2 className="text-2xl">{advertise.Checkout.title}</h2>}
    >
      <Input
        id="email"
        label="Email"
        placeholder={advertise.Checkout.emailPlaceholder}
        stateIcon={email.state}
        error={
          email.state === 'invalid'
            ? advertise.Checkout.emailInvalidMessage
            : undefined
        }
        onKeyPress={handleKeypress}
        onChange={handleChange}
        value={email.value}
      />
      {paymentMethod === 'TIBIA_COINS' && (
        <>
          <div role="none" className="mt-2" />
          <Input
            id="paymentCharacter"
            label={advertise.Checkout.paymentCharacterLabel}
            placeholder={`e.g, '${randomNickname}'`}
            stateIcon={paymentCharacter.state}
            error={
              paymentCharacter.state === 'invalid'
                ? advertise.Checkout.paymentCharacterInvalidMessage
                : undefined
            }
            onKeyPress={handleKeypress}
            onChange={handleChange}
            value={paymentCharacter.value}
            enterKeyHint="send"
          />
        </>
      )}

      <Button
        type="submit"
        aria-label={advertise.Checkout.checkoutButtonLabel}
        disabled={isButtonDisabled}
        onClick={validateAndSubmit}
        loading={sendingEmail}
        className="mt-4 ml-auto block min-h-[52px] min-w-[150px]"
      >
        {advertise.Checkout.checkoutButton}
      </Button>
    </TitledCard>
  )
}

export default Checkout
