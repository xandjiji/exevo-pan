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
  const normalizePercentage = (value: number) => {
    return (value - min) / (max - min)
  }

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState(initialValue ?? min)
  const [sliderInputValue, setSliderInputValue] = useState(initialValue ?? min)

  const dispatchSyntheticEvent = useMemo(
    () =>
      debounce(() => {
        const event = new Event('input', { bubbles: true })
        inputRef.current?.dispatchEvent(event)
      }, 250),
    [],
  )

  const { binders, isMousePressed, percentagePosition, setPercentagePosition } =
    useDrag(normalizePercentage(initialValue ?? min))

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, '')

    /* @ToDo: granularity of increments */
    const newValue = parseInt(inputValue, 10)
    if (Number.isNaN(newValue)) {
      setValue(min)
      setSliderInputValue(min)
      setPercentagePosition(0)
    } else if (newValue < min) {
      setSliderInputValue(newValue)
    } else if (newValue > max) {
      setValue(max)
      setSliderInputValue(max)
      setPercentagePosition(1)
    } else {
      setValue(newValue)
      setSliderInputValue(newValue)
      setPercentagePosition(normalizePercentage(newValue))
    }
  }

  useEffect(() => {
    const range = max - min
    const newValue = Math.round(range * percentagePosition + min)
    setValue(newValue)
    setSliderInputValue(newValue)
  }, [max, min, percentagePosition])

  useEffect(() => {
    dispatchSyntheticEvent()
  }, [value, dispatchSyntheticEvent])

  return (
    <S.Wrapper>
      <S.Track {...binders} active={isMousePressed}>
        <S.Cursor style={{ left: `${percentagePosition * 100}%` }} />
      </S.Track>
      <S.SliderInput
        type="number"
        min={min}
        max={max}
        value={sliderInputValue}
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
