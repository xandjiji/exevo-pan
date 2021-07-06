import { useState, useRef } from 'react'
import * as S from './styles'
import { InputProps } from './types'

const Input = ({
  allowClear = false,
  value: valueProp,
  onChange,
  ...props
}: InputProps): JSX.Element => {
  const [value, setValue] = useState<string>(valueProp ?? '')
  const derivedValue = valueProp ?? value

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleClear = () => {
    if (inputRef.current) {
      const event = new Event('input', { bubbles: true })
      setValue('')
      inputRef.current.value = ''
      inputRef.current.dispatchEvent(event)
    }
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
  }

  return (
    <S.InputWrapper isClearButtonActive={allowClear && !!value} {...props}>
      <S.Input
        ref={inputRef}
        value={derivedValue}
        onChange={handleChange}
        onInput={handleInput}
      />
      {allowClear && <S.ClearButton onClick={handleClear} />}
    </S.InputWrapper>
  )
}

export default Input
