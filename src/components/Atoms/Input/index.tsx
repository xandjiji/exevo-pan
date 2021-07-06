import { useState } from 'react'
import * as S from './styles'
import { InputProps } from './types'

const Input = ({ allowClear = false, ...props }: InputProps): JSX.Element => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <S.InputWrapper isClearButtonActive={allowClear && !!value} {...props}>
      <S.Input value={value} onChange={handleChange} />
      {allowClear && <S.ClearButton />}
    </S.InputWrapper>
  )
}

export default Input
