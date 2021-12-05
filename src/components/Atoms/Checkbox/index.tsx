import { useState, useCallback } from 'react'
import * as S from './styles'
import { CheckboxProps } from './types'

const Checkbox = ({
  label,
  id,
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
    <S.Label>
      <S.InputWrapper style={{ marginRight: label ? 6 : undefined }}>
        <S.Input
          id={id}
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
