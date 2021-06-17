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

  const [currentCursor, setCurrentCursor] = useState<string | null>(null)

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
  const track = useDrag()

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
    if (track.isMousePressed) {
      const x = track.position.x
      if (currentCursor) {
        if (currentCursor === 'A') {
          cursorA.setPosition(prev => ({ ...prev, x }))
        } else {
          cursorB.setPosition(prev => ({ ...prev, x }))
        }
      } else if (
        Math.abs(x - cursorA.position.x) <= Math.abs(x - cursorB.position.x)
      ) {
        setCurrentCursor('A')
      } else {
        setCurrentCursor('B')
      }
    } else {
      setCurrentCursor(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    track.position.x,
    track.isMousePressed,
    cursorA.position.x,
    cursorB.position.x,
    currentCursor,
  ])

  useEffect(() => {
    onChange?.([currentMin, currentMax])
  }, [currentMin, currentMax, onChange])

  useEffect(() => {
    cursorB.setPosition(prev => ({ ...prev, x: trackWidth }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorB.setPosition, trackWidth])

  return (
    <S.Wrapper {...props}>
      <S.ValueDisplay>{currentMin}</S.ValueDisplay>
      <div>
        <S.Track
          ref={trackRef}
          active={track.isMousePressed}
          {...track.binders}
        >
          <S.Cursor
            active={cursorA.isMousePressed}
            style={{ left: valueToTrackPercentage(cursorAPosition) }}
            {...cursorA.binders}
          />
          <S.Cursor
            active={cursorB.isMousePressed}
            style={{ left: valueToTrackPercentage(cursorBPosition) }}
            {...cursorB.binders}
          />
          <S.TrackFill
            style={{
              left: `${Math.min(cursorAPosition, cursorBPosition)}px`,
              width: `${Math.abs(cursorAPosition - cursorBPosition)}px`,
            }}
          />
        </S.Track>
      </div>
      <S.ValueDisplay>{currentMax}</S.ValueDisplay>
    </S.Wrapper>
  )
}

export default RangeSliderInput
