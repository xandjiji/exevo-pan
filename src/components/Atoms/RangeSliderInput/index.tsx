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

  const cursorA = useDrag(normalize(initialMin))
  const cursorB = useDrag(normalize(initialMax))

  useEffect(() => {
    const cursorsValues = [
      cursorA.percentagePosition,
      cursorB.percentagePosition,
    ]
      .map(percentageToValue)
      .sort((a, b) => a - b)

    setValues(cursorsValues)
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
      <S.ValueDisplay>{currentMin}</S.ValueDisplay>
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
      <S.ValueDisplay>{currentMax}</S.ValueDisplay>
    </S.Wrapper>
  )
}

export default RangeSliderInput
