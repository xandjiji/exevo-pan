import React, { useState } from 'react'
import { RangeSliderProps } from './types'
import * as S from './styles'

const RangeSlider = ({
  min,
  max,
  initialValue,
  onChange,
  ...props
}: RangeSliderProps): JSX.Element => {
  const [value, setValue] = useState(initialValue ?? min)
  console.log(value)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* @ToDo: prevent the user from typing NaN with regex*/

    onChange?.(event)
    /* @ToDo: granularity of increments */
    /* @ToDo: if NaN -> set to Min */
    setValue(parseInt(event.target.value, 10))
  }

  return (
    <S.Wrapper>
      <S.Track>
        <S.Cursor />
      </S.Track>
      <S.Input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        {...props}
      />
    </S.Wrapper>
  )
}

export default RangeSlider
