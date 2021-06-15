/* eslint-disable max-lines-per-function */
import { useState, useEffect } from 'react'
import useDrag from './useDrag'
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
  const normalizePercentage = (value: number): number =>
    (value - min) / (max - min)

  const [values, setValues] = useState<number[]>([initialMin, initialMax])

  const cursorA = useDrag(normalizePercentage(initialMin))
  const cursorB = useDrag(normalizePercentage(initialMax))

  useEffect(() => {
    const range = max - min
    const cursorsValues = [
      cursorA.percentagePosition,
      cursorB.percentagePosition,
    ]
      .map(percentagePosition => Math.round(range * percentagePosition + min))
      .sort((a, b) => a - b)

    setValues(cursorsValues)
  }, [max, min, cursorA.percentagePosition, cursorB.percentagePosition])

  useEffect(() => {
    onChange?.(values)
  }, [values, onChange])

  return (
    <S.Wrapper {...props}>
      <S.ValueDisplay>{values[0]}</S.ValueDisplay>
      <S.Track>
        <S.Cursor
          style={{ left: `${cursorA.percentagePosition * 100}%` }}
          {...cursorA.binders}
          active={cursorA.isMousePressed}
        />
        <S.Cursor
          style={{ left: `${cursorB.percentagePosition * 100}%` }}
          {...cursorB.binders}
          active={cursorB.isMousePressed}
        />
      </S.Track>
      <S.ValueDisplay>{values[1]}</S.ValueDisplay>
    </S.Wrapper>
  )
}

export default RangeSliderInput
