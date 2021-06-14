import React, { useState } from 'react'
import useDrag from './useDrag'
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
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* @ToDo: prevent the user from typing NaN with regex*/

    onChange?.(event)
    /* @ToDo: granularity of increments */
    /* @ToDo: if NaN -> set to Min */
    setValue(parseInt(event.target.value, 10))
  }

  const { binders, isMousePressed, percentagePosition } = useDrag()

  return (
    <S.Wrapper>
      <S.Track {...binders} className={isMousePressed ? `active` : ``}>
        <S.Cursor style={{ left: `${percentagePosition}%` }} />
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
