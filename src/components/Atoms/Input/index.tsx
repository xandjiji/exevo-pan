import { useState, useRef } from 'react'
import * as S from './styles'
import { InputProps } from './types'

const Input = ({
  allowClear = false,
  errorMessage,
  value: valueProp,
  onChange,
  ...props
}: InputProps): JSX.Element => {
  const [value, setValue] = useState<string>(valueProp ?? '')
  const derivedValue = valueProp ?? value
  const isClearButtonActive = allowClear && !!value
  const isInvalid = !!errorMessage

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleClearClick = () => {
    if (inputRef.current) {
      if (isClearButtonActive) {
        const event = new Event('input', { bubbles: true })
        setValue('')
        inputRef.current.value = ''
        inputRef.current.dispatchEvent(event)
      }
      inputRef.current.focus()
    }
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
  }

  return (
    <S.Wrapper {...props}>
      <S.InputWrapper
        isClearButtonActive={isClearButtonActive}
        isInvalid={isInvalid}
      >
        <S.Input
          ref={inputRef}
          value={derivedValue}
          onChange={handleChange}
          onInput={handleInput}
        />
        {allowClear && <S.ClearButton onClick={handleClearClick} />}
      </S.InputWrapper>
      <S.ErrorMessage active={isInvalid}>{errorMessage}</S.ErrorMessage>
    </S.Wrapper>
  )
}

export default Input
