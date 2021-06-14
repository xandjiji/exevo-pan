import React, { useState, useEffect, useRef, useMemo } from 'react'
import { debounce } from 'lodash'
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
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState(initialValue ?? min)

  const dispatchSyntheticEvent = useMemo(
    () =>
      debounce(() => {
        const event = new Event('input', { bubbles: true })
        inputRef.current?.dispatchEvent(event)
      }, 250),
    [],
  )

  const { binders, isMousePressed, percentagePosition, setPercentagePosition } =
    useDrag(value / max)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, '')

    /* @ToDo: granularity of increments */
    /* @ToDo: if NaN -> set to Min */
    const newValue: number = parseInt(inputValue, 10)
    setValue(newValue)
    setPercentagePosition(newValue / max)
  }

  useEffect(() => {
    setValue(Math.round(max * percentagePosition))
  }, [max, percentagePosition])

  useEffect(() => {
    dispatchSyntheticEvent()
  }, [value, dispatchSyntheticEvent])

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
      />
      <input
        hidden
        value={value}
        onInput={event =>
          onChange?.(event as React.ChangeEvent<HTMLInputElement>)
        }
        ref={inputRef}
        {...props}
      />
    </S.Wrapper>
  )
}

export default RangeSlider
