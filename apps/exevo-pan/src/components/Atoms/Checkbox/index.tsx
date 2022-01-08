import { useState, useCallback } from 'react'
import * as S from './styles'
import { CheckboxProps } from './types'

const Checkbox = ({
  label,
  id,
  disabled = false,
  checked: checkedProp,
  onChange,
  ...props
}: CheckboxProps): JSX.Element => {
  const [innerChecked, setChecked] = useState(checkedProp ?? false)
  const checked = checkedProp ?? innerChecked

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
      setChecked((prevState) => !prevState)
    },
    [onChange],
  )

  return (
    <S.Label disabled={disabled}>
      <S.InputWrapper style={{ marginRight: label ? 6 : undefined }}>
        <S.Input
          id={id}
          disabled={disabled}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <S.TickIcon />
      </S.InputWrapper>
      {label}
    </S.Label>
  )
}

export default Checkbox
