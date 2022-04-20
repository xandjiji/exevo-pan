/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
import clsx from 'clsx'
import { useIsMounted, useDrag } from 'hooks'
import { normalize, clampValue, debounce } from 'utils'
import { RangeSliderInputProps } from './types'

const ValueDisplay = (args: JSX.IntrinsicElements['span']) => (
  <span
    className="bg-primaryVariant text-tsm text-onSurface w-10 shrink-0 rounded-lg py-[7px] text-center outline-none"
    {...args}
  />
)

const Cursor = (args: JSX.IntrinsicElements['div']) => (
  <span
    className="bg-primary pointer-events-none absolute top-1/2 left-0 -mt-2 -ml-2 h-4 w-4 rounded-full shadow-md"
    {...args}
  />
)

const RangeSliderInput = ({
  className,
  min,
  max,
  onChange,
  value: propValue = [min, max],
  ...props
}: RangeSliderInputProps) => {
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
    <div
      className={clsx('flex w-[270px] items-center gap-3', className)}
      {...props}
    >
      <ValueDisplay>
        {clampValue(Math.min(cursorAValue, cursorBValue), [min, max])}
      </ValueDisplay>
      <div className="w-full">
        <div
          ref={trackRef}
          tabIndex={0}
          onKeyDown={(event) => handleKeyPress(event)}
          className="bg-primaryVariant relative h-1 w-full cursor-pointer shadow"
          {...track.binders}
        >
          <div
            role="none"
            className="absolute top-1/2 left-1/2"
            style={{
              transform: 'translate(-50%, -50%)',
              width: 'calc(100% + 30px)',
              height: 'calc(100% + 30px)',
            }}
          />

          {track.isMousePressed && (
            <div className="z-99 fixed top-0 left-0 h-screen w-screen" />
          )}

          <Cursor
            role="slider"
            aria-label={common.ChangeValueLabel}
            aria-valuenow={cursorAValue}
            aria-valuemax={max}
            aria-valuemin={min}
            style={{ left: `${cursorAPosition}%` }}
          />
          <Cursor
            role="slider"
            aria-label={common.ChangeValueLabel}
            aria-valuenow={cursorBValue}
            aria-valuemax={max}
            aria-valuemin={min}
            style={{ left: `${cursorBPosition}%` }}
          />

          <div
            className="bg-primary absolute top-0 h-full opacity-70"
            style={{
              left: `${trackFillLeft}%`,
              width: `${trackFillRight - trackFillLeft}%`,
            }}
          />
        </div>
      </div>
      <ValueDisplay>
        {clampValue(Math.max(cursorAValue, cursorBValue), [min, max])}
      </ValueDisplay>
    </div>
  )
}

export default memo(RangeSliderInput)
