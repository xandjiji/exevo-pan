import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react'
import { debounce } from 'lodash'
import useDrag from 'hooks/useDrag'
import { clampValue, normalize } from 'utils'
import { SliderInputProps } from './types'
import * as S from './styles'

const SliderInput = ({
  min,
  max,
  onChange,
  value: propValue = min,
  ...props
}: SliderInputProps): JSX.Element => {
  const [value, setValue] = useState<number>(propValue)
  const [sliderInputValue, setSliderInputValue] = useState<string>(
    propValue.toString(),
  )

  const inputRef = useRef<HTMLInputElement | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const trackWidth: number = trackRef.current?.offsetWidth ?? 1

  const positionToValue = useCallback(
    (position: number): number => {
      return Math.round((max - min) * (position / trackWidth) + min)
    },
    [min, max, trackWidth],
  )

  const valueToTrackPercentage = (currentValue: number): string =>
    `${normalize(currentValue, [min, max]) * 100}%`

  const { binders, isMousePressed, position } = useDrag()

  const cursorPosition = clampValue(position.x, [0, trackWidth])
  const intSliderInputValue = parseInt(sliderInputValue, 10)
  const isValid =
    sliderInputValue === '-' ||
    sliderInputValue === clampValue(intSliderInputValue, [min, max]).toString()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const matches = event.target.value.match(/^-?[0-9]*/) ?? ['']
    const sanitized = matches[0]
    const newValue = parseInt(sanitized, 10)

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
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const action = {
      ArrowUp: (prev: number) => prev + 1,
      ArrowRight: (prev: number) => prev + 1,
      ArrowDown: (prev: number) => prev - 1,
      ArrowLeft: (prev: number) => prev - 1,
    }[event.code]

    if (!action) return

    event.nativeEvent.preventDefault()
    setValue(prev => clampValue(action(prev), [min, max]))
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
    dispatchSyntheticEvent()
  }, [value, dispatchSyntheticEvent])

  useLayoutEffect(() => {
    setValue(propValue)
  }, [propValue])

  return (
    <S.Wrapper>
      <div style={{ width: '100%' }}>
        <S.Track
          ref={trackRef}
          active={isMousePressed}
          tabIndex={0}
          onKeyDown={handleKeyPress}
          {...binders}
        >
          <S.Cursor style={{ left: valueToTrackPercentage(value) }} />
          <S.TrackFill style={{ width: valueToTrackPercentage(value) }} />
        </S.Track>
      </div>
      <S.SliderInput
        valid={isValid}
        value={sliderInputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      <input
        hidden
        value={value}
        onInput={event =>
          onChange?.(event as React.ChangeEvent<HTMLInputElement>)
        }
        ref={inputRef}
        {...props}
      />
    </S.Wrapper>
  )
}

export default SliderInput
