import { useState, useCallback } from 'react'
import LabelledInput from '../LabelledInput'
import { validateEmail } from './utils'

const EmailInput = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const validate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value && !validateEmail(event.target.value)) {
      setErrorMessage('Invalid email')
    } else {
      setErrorMessage('')
    }
  }, [])

  const clearErrors = useCallback(() => {
    setErrorMessage('')
  }, [])

  return (
    <LabelledInput
      id="email-input"
      labelText="Email"
      placeholder="you@email.com"
      allowClear
      errorMessage={errorMessage}
      onChange={clearErrors}
      onBlur={validate}
    />
  )
}

export default EmailInput
