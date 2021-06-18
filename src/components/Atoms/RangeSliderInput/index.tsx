import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { debounce } from 'lodash'
import { clampValue } from 'utils'
import useDrag, { DragObject } from 'hooks/useDrag'
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

  const valueToTrackPercentage = (value: number): string =>
    `${(value / trackWidth) * 100}%`

  const cursorA = useDrag()
  const cursorB = useDrag()
  const track = useDrag()

  const [currentCursor, setCurrentCursor] = useState<DragObject | null>(null)
  const [currentTrackCursor, setCurrentTrackCursor] =
    useState<DragObject | null>(null)

  const cursorAPosition = clampValue(cursorA.position.x, [0, trackWidth])
  const cursorBPosition = clampValue(cursorB.position.x, [0, trackWidth])

  const cursorMin = cursorAPosition < cursorBPosition ? cursorA : cursorB

  useEffect(() => {
    const cursorsValues = [cursorAPosition, cursorBPosition]
      .map(positionToValue)
      .sort((a, b) => a - b)

    setValues(cursorsValues)
  }, [max, min, positionToValue, cursorAPosition, cursorBPosition])

  useEffect(() => {
    if (track.isMousePressed) {
      const x = track.position.x
      const newCurrentCursor =
        Math.abs(x - cursorA.position.x) <= Math.abs(x - cursorB.position.x)
          ? cursorA
          : cursorB
      setCurrentCursor(newCurrentCursor)
      if (currentTrackCursor) {
        currentTrackCursor.setPosition(prev => ({ ...prev, x }))
      } else {
        setCurrentTrackCursor(newCurrentCursor)
        newCurrentCursor.setPosition(prev => ({ ...prev, x }))
      }
    } else {
      setCurrentTrackCursor(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    track.position.x,
    track.isMousePressed,
    cursorA.position.x,
    cursorB.position.x,
  ])

  const dispatchOnChange = useMemo(
    () =>
      debounce(() => {
        onChange?.([currentMin, currentMax])
      }, 250),
    [currentMin, currentMax, onChange],
  )

  useEffect(() => {
    dispatchOnChange()
  }, [dispatchOnChange])

  useEffect(() => {
    cursorB.setPosition(prev => ({ ...prev, x: trackWidth }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorB.setPosition, trackWidth])

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (!currentCursor) return

    const action = {
      ArrowUp: (value: number) => value + 1,
      ArrowRight: (value: number) => value + 1,
      ArrowDown: (value: number) => value - 1,
      ArrowLeft: (value: number) => value - 1,
    }[event.code]

    if (!action) return

    event.nativeEvent.preventDefault()

    const newValues =
      currentCursor.position.x === cursorMin.position.x
        ? [clampValue(action(currentMin), [min, max]), currentMax]
        : [currentMin, clampValue(action(currentMax), [min, max])]

    setValues(newValues.sort((a, b) => a - b))
  }

  return (
    <S.Wrapper {...props}>
      <S.ValueDisplay>{currentMin}</S.ValueDisplay>
      <div style={{ width: '100%' }}>
        <S.Track
          ref={trackRef}
          active={track.isMousePressed}
          tabIndex={0}
          onKeyDown={event => handleKeyPress(event)}
          {...track.binders}
        >
          <S.Cursor
            onClick={() => setCurrentCursor(cursorA)}
            active={cursorA.isMousePressed}
            style={{ left: valueToTrackPercentage(cursorAPosition) }}
            {...cursorA.binders}
          />
          <S.Cursor
            onClick={() => setCurrentCursor(cursorB)}
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
