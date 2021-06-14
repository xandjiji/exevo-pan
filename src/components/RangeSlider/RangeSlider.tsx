import React, { useState, useEffect } from 'react'
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

  const { binders, isMousePressed, percentagePosition, setPercentagePosition } =
    useDrag(value / max)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* @ToDo: prevent the user from typing NaN with regex*/

    onChange?.(event)
    /* @ToDo: granularity of increments */
    /* @ToDo: if NaN -> set to Min */
    const newValue: number = parseInt(event.target.value, 10)
    setValue(newValue)
    setPercentagePosition(newValue / max)
  }

  useEffect(() => {
    setValue(Math.round(max * percentagePosition))
  }, [max, percentagePosition])

  return (
    <S.Wrapper>
      <S.Track {...binders} active={isMousePressed}>
        <S.Cursor style={{ left: `${percentagePosition * 100}%` }} />
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
