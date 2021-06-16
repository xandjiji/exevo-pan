/* eslint-disable max-lines-per-function */
import { useState, useEffect, useCallback } from 'react'
import useDrag from './useDrag'
import { toPercentString } from './utils'
import { RangeSliderInputProps } from './types'
import * as S from './styles'

const RangeSliderInput = ({
  min,
  max,
  initialMin = min,
  initialMax = max,
  onChange,
  ...props
}: RangeSliderInputProps): JSX.Element => {
  const normalize = useCallback(
    (value: number): number => (value - min) / (max - min),
    [min, max],
  )

  const percentageToValue = useCallback(
    (percentage: number): number => Math.round((max - min) * percentage + min),
    [min, max],
  )

  const [[currentMin, currentMax], setValues] = useState<number[]>([
    initialMin,
    initialMax,
  ])

  const [inputValues, setInputValues] = useState({
    leftInput: initialMin,
    rightInput: initialMax,
  })

  const cursorA = useDrag(normalize(initialMin))
  const cursorB = useDrag(normalize(initialMax))

  const handleInputChange = (
    changingInput: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = event.target.value.replace(/\D/g, '')

    /* @ToDo: granularity of increments */
    const newValue = parseInt(inputValue, 10)
    if (Number.isNaN(newValue)) return

    const currentInputValue = inputValues[changingInput] as number
    const otherInputValue =
      currentInputValue === currentMin ? currentMax : currentMin
    if (newValue < min) {
      /* @ToDo: invalidate */
      setInputValues(prev => ({
        ...prev,
        [changingInput]: newValue,
      }))
    } else if (newValue > max) {
      setInputValues(prev => ({
        ...prev,
        [changingInput]: max,
      }))
      setValues([otherInputValue, max])
      cursorA.setPercentagePosition(normalize(otherInputValue))
      cursorB.setPercentagePosition(1)
    } else {
      setInputValues(prev => ({
        ...prev,
        [changingInput]: newValue,
      }))
      setValues([otherInputValue, newValue].sort((a, b) => a - b))

      if (cursorA.percentagePosition === normalize(otherInputValue)) {
        cursorB.setPercentagePosition(normalize(newValue))
      } else {
        cursorA.setPercentagePosition(normalize(newValue))
      }
    }
  }

  useEffect(() => {
    const cursorsValues = [
      cursorA.percentagePosition,
      cursorB.percentagePosition,
    ]
      .map(percentageToValue)
      .sort((a, b) => a - b)

    setValues(cursorsValues)

    setInputValues(prev => {
      const [newCurrentMin, newCurrentMax] = cursorsValues
      if (newCurrentMin === prev.leftInput) {
        return {
          ...prev,
          rightInput: newCurrentMax,
        }
      } else if (newCurrentMin === prev.rightInput) {
        return {
          ...prev,
          leftInput: newCurrentMax,
        }
      } else if (newCurrentMax === prev.leftInput) {
        return {
          ...prev,
          rightInput: newCurrentMin,
        }
      } else {
        return {
          ...prev,
          leftInput: newCurrentMin,
        }
      }
    })
  }, [
    max,
    min,
    percentageToValue,
    cursorA.percentagePosition,
    cursorB.percentagePosition,
  ])

  useEffect(() => {
    onChange?.([currentMin, currentMax])
  }, [currentMin, currentMax, onChange])

  return (
    <S.Wrapper {...props}>
      <S.SliderInput
        value={inputValues.leftInput}
        onChange={event => handleInputChange('leftInput', event)}
      />
      <S.Track>
        <S.Cursor
          style={{ left: toPercentString(cursorA.percentagePosition) }}
          active={cursorA.isMousePressed}
          {...cursorA.binders}
        />
        <S.Cursor
          style={{ left: toPercentString(cursorB.percentagePosition) }}
          active={cursorB.isMousePressed}
          {...cursorB.binders}
        />
        <S.TrackFill
          style={{
            left: toPercentString(normalize(currentMin)),
            width: toPercentString(normalize(currentMax - currentMin)),
          }}
        />
      </S.Track>
      <S.SliderInput
        value={inputValues.rightInput}
        onChange={event => handleInputChange('rightInput', event)}
      />
    </S.Wrapper>
  )
}

export default RangeSliderInput
