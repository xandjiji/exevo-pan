/* eslint-disable max-lines-per-function */
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useLayoutEffect,
} from 'react'
import { debounce } from 'lodash'
import { normalize, clampValue } from 'utils'
import useDrag from 'hooks/useDrag'
import { RangeSliderInputProps } from './types'
import * as S from './styles'

const RangeSliderInput = ({
  min,
  max,
  onChange,
  value: propValue = [min, max],
  ...props
}: RangeSliderInputProps): JSX.Element => {
  const [cursorAValue, setCursorAValue] = useState(propValue[0])
  const [cursorBValue, setCursorBValue] = useState(propValue[1])

  const [currentCursor, setCurrentCursor] = useState<'A' | 'B'>('A')
  const [currentTrackCursor, setCurrentTrackCursor] =
    useState<'A' | 'B' | null>(null)

  const track = useDrag()

  const trackRef = useRef<HTMLDivElement>(null)
  const trackWidth: number = trackRef.current?.offsetWidth ?? 1

  const positionToValue = useCallback(
    (position: number): number => {
      return Math.round((max - min) * (position / trackWidth) + min)
    },
    [min, max, trackWidth],
  )

  useEffect(() => {
    if (track.isMousePressed) {
      const x = track.position.x
      const trackValue = clampValue(positionToValue(x), [min, max])

      const newCurrentCursor =
        Math.abs(trackValue - cursorAValue) <=
        Math.abs(trackValue - cursorBValue)
          ? 'A'
          : 'B'

      setCurrentCursor(newCurrentCursor)

      if (currentTrackCursor) {
        const updateCurrentCursorValue = {
          A: setCursorAValue,
          B: setCursorBValue,
        }[currentTrackCursor]
        updateCurrentCursorValue(trackValue)
      } else {
        const updateCurrentCursorValue = {
          A: setCursorAValue,
          B: setCursorBValue,
        }[newCurrentCursor]
        setCurrentTrackCursor(newCurrentCursor)
        updateCurrentCursorValue(trackValue)
      }
    } else {
      setCurrentTrackCursor(null)
    }
  }, [
    track.position.x,
    track.isMousePressed,
    cursorAValue,
    cursorBValue,
    max,
    min,
    positionToValue,
    currentTrackCursor,
  ])

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const { ctrlKey, shiftKey } = event
    const increment = 1 * (+!ctrlKey || 10) * (+!shiftKey || 100)
    const action = {
      ArrowUp: (value: number) => value + increment,
      ArrowRight: (value: number) => value + increment,
      ArrowDown: (value: number) => value - increment,
      ArrowLeft: (value: number) => value - increment,
    }[event.code]

    if (!action) return

    event.nativeEvent.preventDefault()

    if (currentCursor === 'A') {
      setCursorAValue(prev => clampValue(action(prev), [min, max]))
    } else {
      setCursorBValue(prev => clampValue(action(prev), [min, max]))
    }
  }

  const dispatchOnChange = useMemo(
    () =>
      debounce((aValue, bValue) => {
        onChange?.([aValue, bValue].sort((a, b) => a - b) as [number, number])
      }, 500),
    [onChange],
  )

  useEffect(() => {
    dispatchOnChange(cursorAValue, cursorBValue)
  }, [dispatchOnChange, cursorAValue, cursorBValue])

  useLayoutEffect(() => {
    const [newMin, newMax] = propValue
    setCursorAValue(newMin)
    setCursorBValue(newMax)
  }, [propValue])

  const trackFillLeft =
    normalize(Math.min(cursorAValue, cursorBValue), [min, max]) * 100
  const trackFillRight =
    normalize(Math.max(cursorAValue, cursorBValue), [min, max]) * 100

  const cursorAPosition = normalize(cursorAValue, [min, max]) * 100
  const cursorBPosition = normalize(cursorBValue, [min, max]) * 100

  return (
    <S.Wrapper {...props}>
      <S.ValueDisplay>{Math.min(cursorAValue, cursorBValue)}</S.ValueDisplay>
      <div style={{ width: '100%' }}>
        <S.Track
          ref={trackRef}
          active={track.isMousePressed}
          tabIndex={0}
          onKeyDown={event => handleKeyPress(event)}
          {...track.binders}
        >
          <S.Cursor
            role="slider"
            aria-labelledby="range-slider"
            aria-valuenow={cursorAValue}
            style={{ left: `${cursorAPosition}%` }}
          />
          <S.Cursor
            role="slider"
            aria-labelledby="range-slider"
            aria-valuenow={cursorBValue}
            style={{ left: `${cursorBPosition}%` }}
          />
          <S.TrackFill
            style={{
              left: `${trackFillLeft}%`,
              width: `${trackFillRight - trackFillLeft}%`,
            }}
          />
        </S.Track>
      </div>
      <S.ValueDisplay>{Math.max(cursorAValue, cursorBValue)}</S.ValueDisplay>
    </S.Wrapper>
  )
}

export default RangeSliderInput
