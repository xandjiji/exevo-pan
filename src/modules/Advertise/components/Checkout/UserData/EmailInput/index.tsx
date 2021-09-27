import { useState, useCallback } from 'react'
import LabelledInput, { InputStates } from '../LabelledInput'
import { validateEmail } from './utils'

const EmailInput = (): JSX.Element => {
  const [validationState, setValidationState] = useState<InputStates>('neutral')

  const validate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value) {
      if (!validateEmail(event.target.value)) {
        setValidationState('invalid')
      } else {
        setValidationState('valid')
      }
    }
  }, [])

  const clearErrors = useCallback(() => {
    setValidationState('neutral')
  }, [])

  return (
    <LabelledInput
      id="email-input"
      labelText="Email"
      placeholder="you@email.com"
      errorMessage={validationState === 'invalid' ? 'Invalid email' : undefined}
      onChange={clearErrors}
      onBlur={validate}
      validationState={validationState}
    />
  )
}

export default EmailInput
