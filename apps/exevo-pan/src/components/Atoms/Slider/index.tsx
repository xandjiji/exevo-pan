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
import { useSharedRef, useDrag, useUuid } from 'hooks'
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
import useInputWidth from './useInputWidth'
import Label from '../Label'
import * as S from './atoms'
import { SliderProps } from './types'

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (componentProps: SliderProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      id: idProp,
      className,
      name,
      min,
      max,
      'aria-label': ariaLabel,
      label,
      value: valueProp,
      defaultValue: defaultValueProp,
      step = 1,
      onChange,
      displayValue = false,
      showInput = false,
      transformDisplayedValues = defaultTransform,
      marks,
      disabled = false,
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

    const uuid = useUuid()
    const inputId = idProp ?? uuid

    const { binders, position } = useDrag({ clamped: true })
    const { percentageX } = position

    const calculatedMarks = useCalculateMarks({
      step,
      range,
      marks,
      transformDisplayedValues,
    })
    const hasMarks = !!calculatedMarks.length

    const inputWidth = useInputWidth({ max, step })

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
      <div className={clsx(hasMarks && 'pb-5', className)} {...props}>
        <div className="mb-2 flex items-center justify-between gap-1.5">
          <Label htmlFor={inputId}>{label}</Label>
          {displayValue && <span className="text-tsm">{transformedText}</span>}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full">
            <div
              className={clsx(
                'group relative flex h-1 w-full items-center rounded-3xl pr-4',
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
                  'absolute top-0 left-0 h-full rounded-3xl transition-all group-active:transition-none',
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
                  'z-1 h-4 w-4 shrink-0 rounded-full shadow-md transition-all group-active:transition-none',
                  disabled ? 'bg-separator' : 'bg-primaryHighlight',
                )}
                style={{ marginLeft: relativeCursorPosition }}
              />
            </div>

            {hasMarks && (
              <div className="absolute top-full left-0 mt-4 h-2 w-full px-2">
                <div className="relative h-full w-full">
                  {calculatedMarks.map((mark) => (
                    <span
                      key={mark.value}
                      style={{
                        left: mark.leftOffset,
                        transform: 'translateX(-50%)',
                      }}
                      onClick={() => setValue(mark.value)}
                      className={clsx(
                        'absolute cursor-pointer whitespace-nowrap p-1 text-xs',
                        value === mark.value
                          ? 'text-primaryHighlight font-bold'
                          : 'text-onSurface',
                      )}
                    >
                      {mark.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showInput && (
            <input
              aria-label={ariaLabel}
              type="number"
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              value={inputValue}
              onChange={handleInput}
              onBlur={() => setInputValue(value)}
              className={clsx(
                'reset-spinner border-1 text-tsm text-onSurface border-separator out-of-range:!border-red focus:border-primary box-content rounded-md border-solid py-2.5 px-4 outline-none transition-colors',
                disabled ? 'bg-separator' : 'bg-surface',
              )}
              style={{ width: inputWidth }}
            />
          )}
        </div>

        <input
          hidden
          ref={innerRef}
          id={inputId}
          name={name}
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
