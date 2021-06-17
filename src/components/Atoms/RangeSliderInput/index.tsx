/* eslint-disable max-lines-per-function */
import { useState, useEffect, useCallback, useRef } from 'react'
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
  const [[currentMin, currentMax], setValues] = useState<number[]>([
    initialMin,
    initialMax,
  ])

  const trackRef = useRef<HTMLDivElement>(null)
  const trackWidth: number = trackRef.current?.offsetWidth ?? 1

  const positionToValue = useCallback(
    (position: number): number => {
      return Math.round((max - min) * (position / trackWidth) + min)
    },
    [min, max, trackWidth],
  )

  const boundValue = (value: number): number => {
    if (value > trackWidth) return trackWidth
    if (value < 0) return 0
    return value
  }

  const cursorA = useDrag()
  const cursorB = useDrag()

  const cursorAPosition = boundValue(cursorA.position.x)
  const cursorBPosition = boundValue(cursorB.position.x)

  const valueToTrackPercentage = (value: number): string =>
    `${(value / trackWidth) * 100}%`

  useEffect(() => {
    const cursorsValues = [cursorAPosition, cursorBPosition]
      .map(positionToValue)
      .sort((a, b) => a - b)

    setValues(cursorsValues)
  }, [max, min, positionToValue, cursorAPosition, cursorBPosition])

  useEffect(() => {
    onChange?.([currentMin, currentMax])
  }, [currentMin, currentMax, onChange])

  return (
    <S.Wrapper {...props}>
      <S.ValueDisplay>{currentMin}</S.ValueDisplay>
      <S.Track ref={trackRef}>
        <S.Cursor
          style={{ left: valueToTrackPercentage(cursorAPosition) }}
          active={cursorA.isMousePressed}
          {...cursorA.binders}
        />
        <S.Cursor
          style={{ left: valueToTrackPercentage(cursorBPosition) }}
          active={cursorB.isMousePressed}
          {...cursorB.binders}
        />
        <S.TrackFill
          style={{
            left: `${Math.min(cursorAPosition, cursorBPosition)}px`,
            width: `${Math.abs(cursorAPosition - cursorBPosition)}px`,
          }}
        />
      </S.Track>
      <S.ValueDisplay>{currentMax}</S.ValueDisplay>
    </S.Wrapper>
  )
}

export default RangeSliderInput
