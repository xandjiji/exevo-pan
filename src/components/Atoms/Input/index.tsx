import { useTranslations } from 'contexts/useTranslation'
import { useState, useRef, memo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as S from './styles'
import { InputProps } from './types'

const Input = ({
  className,
  style,
  allowClear = false,
  errorMessage,
  value: valueProp,
  onChange,
  ...props
}: InputProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const { current: errorId } = useRef(uuidv4())

  const [value, setValue] = useState<string>(valueProp ?? '')
  const derivedValue = valueProp ?? value
  const isClearButtonActive = allowClear && !!derivedValue
  const isInvalid = !!errorMessage

  const inputRef = useRef<HTMLInputElement>(null)

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
    <S.Wrapper className={className} style={style}>
      <S.InputWrapper
        isClearButtonActive={isClearButtonActive}
        isInvalid={isInvalid}
        onClick={() => inputRef.current?.focus()}
      >
        <S.Input
          ref={inputRef}
          value={derivedValue}
          onChange={handleChange}
          onInput={handleInput}
          aria-invalid={isInvalid}
          aria-errormessage={isInvalid ? errorId : undefined}
          autoComplete="off"
          {...props}
        />
        {allowClear && (
          <S.ClearButton
            aria-label={common.ClearInputLabel}
            disabled={!isClearButtonActive}
            aria-hidden={!isClearButtonActive}
            onClick={handleClearClick}
          />
        )}
      </S.InputWrapper>
      <S.ErrorMessage id={errorId} aria-hidden={!isInvalid} role="alert">
        {errorMessage}
      </S.ErrorMessage>
    </S.Wrapper>
  )
}

export default memo(Input)
