import { useTranslations } from 'contexts/useTranslation'
import { useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import { TitledCard, Input, Button } from 'components/Atoms'
import { trpc } from 'lib/trpc'
import { randomCharacter } from 'utils'
import { locales } from 'Constants'
import { useForm } from '../../contexts/Form'
import { validateEmail, validateCharacter } from './utils'

const { DEFAULT_LOCALE } = locales

const Checkout = () => {
  const {
    translations: { advertise },
  } = useTranslations()

  const { locale } = useRouter()

  const {
    isPro,
    selectedCharacter,
    selectedDates,
    paymentMethod,
    email,
    paymentCharacter,
    dispatch,
  } = useForm()

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

  const { mutate, isLoading } = trpc.highlightCheckout.useMutation({
    onSuccess: ({ uuid }) => {
      dispatch({ type: 'FINISH_FORM', uuid })
    },
  })

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
    if (!selectedCharacter) return

    mutate({
      isPro,
      selectedCharacter,
      selectedDates,
      paymentMethod,
      email: email.value,
      paymentCharacter: paymentCharacter.value,
      locale: locale ?? DEFAULT_LOCALE,
      timezoneOffsetMinutes: new Date().getTimezoneOffset(),
    })
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
        loading={isLoading}
        className="mt-4 ml-auto block min-h-[52px] min-w-[150px]"
      >
        {advertise.Checkout.checkoutButton}
      </Button>
    </TitledCard>
  )
}

export default Checkout
