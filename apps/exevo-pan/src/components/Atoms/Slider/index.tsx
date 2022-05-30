/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import clsx from 'clsx'
import {
  forwardRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react'
import { useSharedRef, useDrag } from 'hooks'
import {
  defaultTransform,
  clampValue,
  denormalize,
  calculateClosestStep,
  getLeftOffset,
  getKeyboardIncrement,
  toFixedPrecision,
  isInRange,
} from './utils'
import useControlledValue from './useControlledState'
import useCalculateMarks from './useCalculateMarks'
import * as S from './atoms'
import { SliderProps } from './types'

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (componentProps: SliderProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      id: idProp,
      name: nameProp,
      min,
      max,
      value: valueProp,
      defaultValue: defaultValueProp,
      step = 1,
      onChange,
      displayValue = false,
      showInput = false,
      transformDisplayedValues = defaultTransform,
      marks,
      disabled = false,
      label,
      ...props
    } = componentProps

    const innerRef = useSharedRef<HTMLInputElement>(ref)

    const controlledValue = valueProp ? +valueProp : undefined
    const defaultValue = defaultValueProp ? +defaultValueProp : min
    const [stateValue, setValue] = useControlledValue({
      initialValue: controlledValue ?? defaultValue,
      controlledValue,
    })

    const [inputValue, setInputValue] = useState<string | number>(
      controlledValue ?? defaultValue,
    )

    const range: [number, number] = useMemo(() => [min, max], [min, max])

    const value = useMemo(
      () => clampValue(stateValue, range),
      [stateValue, range],
    )

    const { binders, position } = useDrag({ clamped: true })
    const { percentageX } = position

    const calculatedMarks = useCalculateMarks({
      step,
      range,
      marks,
      transformDisplayedValues,
    })

    const isMounted = useRef(false)
    useLayoutEffect(() => {
      if (isMounted.current) {
        const denormalizedValue = denormalize(percentageX, range)
        const newValue = calculateClosestStep(denormalizedValue, step, range)
        setValue(newValue)
      }
    }, [percentageX, range, step, setValue])

    const handleTrackKeyPress = (event: React.KeyboardEvent) => {
      const keyboardIncrement = getKeyboardIncrement(event)

      if (keyboardIncrement !== 0) {
        event.nativeEvent.preventDefault()
        const newValue = value + step * keyboardIncrement
        setValue(toFixedPrecision(newValue, step))
      }
    }

    const handleInput = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setInputValue(newValue)

        const numberValue = parseFloat(newValue)
        if (!Number.isNaN(numberValue) && isInRange(numberValue, range)) {
          setValue(numberValue)
        }
      },
      [range, setValue],
    )

    useEffect(() => {
      if (isMounted.current) {
        const event = new Event('input', { bubbles: true })
        innerRef.current?.dispatchEvent?.(event)
        setInputValue(value)
      } else {
        isMounted.current = true
      }
    }, [innerRef, value])

    const relativeCursorPosition = useMemo(
      () => getLeftOffset(value, range),
      [value, range],
    )

    const transformedText = useMemo(
      () => transformDisplayedValues(value),
      [transformDisplayedValues, value],
    )

    return (
      <div {...props}>
        <div className="flex items-center justify-between">
          {/* useUuid? */}
          <label htmlFor={idProp ?? nameProp}>{label}</label>
          {displayValue && <span>{transformedText}</span>}
        </div>

        {/* RailWrapper */}
        <div className="flex items-center justify-between">
          {/* SliderWrapper */}
          <div className="w-full">
            {/* Rail */}
            <div
              className={clsx(
                'relative flex h-1 w-full items-center pr-4',
                disabled
                  ? 'bg-separator/40 pointer-events-none'
                  : 'bg-primaryVariant cursor-pointer',
              )}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={disabled ? undefined : handleTrackKeyPress}
              {...binders}
            >
              <S.ExtendedClickableArea />
              <S.FullscreenClickable />

              {/* Track */}
              <div
                className={clsx(
                  'absolute top-0 left-0 h-full',
                  disabled ? 'bg-separator' : 'bg-primary',
                )}
                style={{ width: relativeCursorPosition }}
              />
              {/* Cursor */}
              <div
                title={typeof label === 'string' ? label : undefined}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-valuetext={transformedText as string}
                className={clsx(
                  'z-1 h-4 w-4 shrink-0 rounded-full shadow-md',
                  disabled ? 'bg-separator' : 'bg-primaryHighlight',
                )}
                style={{ marginLeft: relativeCursorPosition }}
              />
            </div>

            {!!calculatedMarks.length && (
              /* MarkWrapper */
              <div className="relative mx-auto flex h-2 w-full justify-between">
                {calculatedMarks.map((mark) => (
                  <span
                    key={mark.value}
                    style={{ left: mark.leftOffset }}
                    onClick={() => setValue(mark.value)}
                  >
                    {mark.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {showInput && (
            <input
              aria-label={typeof label === 'string' ? label : undefined}
              type="number"
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              value={inputValue}
              onChange={handleInput}
              onBlur={() => setInputValue(value)}
            />
          )}
        </div>

        <input
          hidden
          ref={innerRef}
          id={idProp}
          name={nameProp}
          disabled={disabled}
          value={value}
          onInput={(event) =>
            onChange?.(event as React.ChangeEvent<HTMLInputElement>)
          }
        />
      </div>
    )
  },
)

export default Slider
