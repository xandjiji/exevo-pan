import { useTranslations } from 'contexts/useTranslation'
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useLayoutEffect,
  memo,
} from 'react'
import { useIsMounted, useDrag } from 'hooks'
import { normalize, clampValue, debounce } from 'utils'
import { RangeSliderInputProps } from './types'
import * as S from './styles'

const RangeSliderInput = ({
  min,
  max,
  onChange,
  value: propValue = [min, max],
  ...props
}: RangeSliderInputProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const [cursorAValue, setCursorAValue] = useState(propValue[0])
  const [cursorBValue, setCursorBValue] = useState(propValue[1])

  const [currentCursor, setCurrentCursor] = useState<'A' | 'B'>('A')
  const [currentTrackCursor, setCurrentTrackCursor] = useState<
    'A' | 'B' | null
  >(null)

  const isMounted = useIsMounted()
  const track = useDrag()

  const trackRef = useRef<HTMLDivElement>(null)
  const trackWidth: number = trackRef.current?.offsetWidth ?? 1

  const positionToValue = useCallback(
    (position: number): number =>
      Math.round((max - min) * (position / trackWidth) + min),
    [min, max, trackWidth],
  )

  useEffect(() => {
    if (track.isMousePressed) {
      const { x } = track.position
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
      setCursorAValue((prev) => clampValue(action(prev), [min, max]))
    } else {
      setCursorBValue((prev) => clampValue(action(prev), [min, max]))
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
    if (isMounted) dispatchOnChange(cursorAValue, cursorBValue)
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

  const cursorAPosition =
    normalize(clampValue(cursorAValue, [min, max]), [min, max]) * 100
  const cursorBPosition =
    normalize(clampValue(cursorBValue, [min, max]), [min, max]) * 100

  return (
    <S.Wrapper {...props}>
      <S.ValueDisplay>
        {clampValue(Math.min(cursorAValue, cursorBValue), [min, max])}
      </S.ValueDisplay>
      <div style={{ width: '100%' }}>
        <S.Track
          ref={trackRef}
          active={track.isMousePressed}
          tabIndex={0}
          onKeyDown={(event) => handleKeyPress(event)}
          {...track.binders}
        >
          <S.Cursor
            role="slider"
            aria-label={common.ChangeValueLabel}
            aria-valuenow={cursorAValue}
            aria-valuemax={max}
            aria-valuemin={min}
            style={{ left: `${cursorAPosition}%` }}
          />
          <S.Cursor
            role="slider"
            aria-label={common.ChangeValueLabel}
            aria-valuenow={cursorBValue}
            aria-valuemax={max}
            aria-valuemin={min}
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
      <S.ValueDisplay>
        {clampValue(Math.max(cursorAValue, cursorBValue), [min, max])}
      </S.ValueDisplay>
    </S.Wrapper>
  )
}

export default memo(RangeSliderInput)
