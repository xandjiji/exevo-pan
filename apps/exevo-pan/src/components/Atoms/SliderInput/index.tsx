import { useTranslations } from 'contexts/useTranslation'
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
  memo,
} from 'react'
import clsx from 'clsx'
import { useIsMounted, useDrag } from 'hooks'
import { clampValue, normalize, strToInt, debounce } from 'utils'
import { Cursor, TrackFill } from '../RangeSliderInput/atomics'
import { SliderInputProps } from './types'

const SliderInput = ({
  className,
  style,
  min,
  max,
  onChange,
  value: propValue = min,
  ...props
}: SliderInputProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const [value, setValue] = useState<number>(propValue)
  const [sliderInputValue, setSliderInputValue] = useState<string>(
    propValue.toString(),
  )

  const inputRef = useRef<HTMLInputElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const trackWidth: number = trackRef.current?.offsetWidth ?? 1

  const positionToValue = useCallback(
    (position: number): number =>
      Math.round((max - min) * (position / trackWidth) + min),
    [min, max, trackWidth],
  )

  const valueToTrackPercentage = (currentValue: number): string =>
    `${clampValue(normalize(currentValue, [min, max]), [0, 1]) * 100}%`

  const isMounted = useIsMounted()
  const { binders, isMousePressed, position } = useDrag()

  const cursorPosition = clampValue(position.x, [0, trackWidth])
  const intSliderInputValue = strToInt(sliderInputValue)
  const isValid =
    sliderInputValue === '-' ||
    sliderInputValue === clampValue(intSliderInputValue, [min, max]).toString()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const matches = event.target.value.match(/^-?[0-9]*/) ?? ['']
    const sanitized = matches[0]
    const newValue = strToInt(sanitized)

    if (Number.isNaN(newValue) || newValue < min) {
      setSliderInputValue(sanitized)
    } else {
      const boundedValue = clampValue(newValue, [min, max])
      setValue(boundedValue)
      setSliderInputValue(boundedValue.toString())
    }
  }

  const handleInputBlur = (event: React.FocusEvent) => {
    if (!isValid || (event.target as HTMLInputElement).value === '-') {
      setSliderInputValue(min.toString())
      setValue(min)
    }
  }

  const handleInputKeyPress = (event: React.KeyboardEvent) => {
    const { ctrlKey, shiftKey } = event
    const increment = 1 * (+!ctrlKey || 10) * (+!shiftKey || 100)
    const action = {
      ArrowUp: (prev: number) => prev + increment,
      ArrowDown: (prev: number) => prev - increment,
    }[event.code]

    if (!action) return

    event.nativeEvent.preventDefault()
    setValue((prev) => clampValue(action(prev), [min, max]))
  }

  const handleTrackKeyPress = (event: React.KeyboardEvent) => {
    const { ctrlKey, shiftKey } = event
    const increment = 1 * (+!ctrlKey || 10) * (+!shiftKey || 100)
    const action = {
      ArrowUp: (prev: number) => prev + increment,
      ArrowRight: (prev: number) => prev + increment,
      ArrowDown: (prev: number) => prev - increment,
      ArrowLeft: (prev: number) => prev - increment,
    }[event.code]

    if (!action) return

    event.nativeEvent.preventDefault()
    setValue((prev) => clampValue(action(prev), [min, max]))
  }

  useEffect(() => {
    if (isMousePressed) {
      const newValue = positionToValue(cursorPosition)
      setValue(newValue)
    }
  }, [isMousePressed, positionToValue, cursorPosition])

  const dispatchSyntheticEvent = useMemo(
    () =>
      debounce(() => {
        const event = new Event('input', { bubbles: true })
        inputRef.current?.dispatchEvent(event)
      }, 250),
    [],
  )

  useEffect(() => {
    setSliderInputValue(value.toString())
    if (isMounted) dispatchSyntheticEvent()
  }, [value, dispatchSyntheticEvent])

  useLayoutEffect(() => {
    setValue(propValue)
  }, [propValue])

  return (
    <div
      className={clsx('flex w-[270px] items-center gap-3 pl-2', className)}
      style={style}
    >
      <div style={{ width: '100%' }}>
        <TrackFill
          ref={trackRef}
          isMousePressed={isMousePressed}
          tabIndex={0}
          onKeyDown={handleTrackKeyPress}
          {...binders}
        >
          <Cursor
            role="slider"
            aria-label={common.ChangeValueLabel}
            aria-valuenow={value}
            aria-valuemax={max}
            aria-valuemin={min}
            style={{ left: valueToTrackPercentage(value) }}
          />
          <div
            className="bg-primary after:bg-primary pointer-events-none absolute top-0 left-0 h-full after:pointer-events-none after:absolute after:right-full after:top-0 after:h-full after:w-[7px]"
            style={{ width: valueToTrackPercentage(value) }}
          />
        </TrackFill>
      </div>
      <input
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        aria-invalid={!isValid}
        value={sliderInputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyPress}
        className={clsx(
          'text-tsm selection:bg-primary selection:text-onPrimary w-10 shrink-0 rounded-lg border-none py-[7px] text-center outline-none transition-colors',
          isValid
            ? 'bg-primaryVariant text-onSurface'
            : 'bg-red text-onPrimary selection',
        )}
      />
      <input
        hidden
        aria-invalid={!isValid}
        value={value}
        onInput={(event) =>
          onChange?.(event as React.ChangeEvent<HTMLInputElement>)
        }
        ref={inputRef}
        {...props}
      />
    </div>
  )
}

export default memo(SliderInput)
