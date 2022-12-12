/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import clsx from 'clsx'
import {
  forwardRef,
  useReducer,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useId,
} from 'react'
import {
  useSharedRef,
  useDrag,
  useIsomorphicLayoutEffect,
  useIsMounted,
} from 'hooks'
import { clampValue, isServer } from 'utils'
import {
  defaultTransform,
  denormalize,
  calculateClosestStep,
  getLeftOffset,
  getKeyboardIncrement,
  toFixedPrecision,
} from './utils'
import SliderReducer from './reducer'
import useCalculateMarks from './useCalculateMarks'
import useInputWidth from './useInputWidth'
import Label from '../Label'
import * as S from './atoms'
import { SliderProps } from './types'

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      id: idProp,
      className,
      name,
      min,
      max,
      'aria-label': ariaLabel,
      label,
      value: propValue,
      defaultValue: defaultValueProp,
      step = 1,
      onChange,
      displayValue = false,
      showInput = false,
      transformDisplayedValues = defaultTransform,
      marks,
      disabled = false,
      invert = false,
      enterKeyHint,
      onKeyPress,
      ssr,
      ...props
    },
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const uuid = useId()
    const inputId = idProp ?? uuid
    const accessibleLabel = typeof label === 'string' ? label : ariaLabel

    const innerRef = useSharedRef<HTMLInputElement>(ref)
    const dispatchedValue = useRef(propValue ?? defaultValueProp ?? min)

    const [{ innerValue, inputValue }, dispatch] = useReducer(SliderReducer, {
      isControlled: propValue !== undefined,
      innerValue: dispatchedValue.current,
      inputValue: dispatchedValue.current,
      dispatchChangeEvent: (dispatchValue: number) => {
        dispatchedValue.current = dispatchValue
        const event = new Event('input', { bubbles: true })
        innerRef.current?.dispatchEvent?.(event)
      },
    })

    const range: [number, number] = useMemo(() => [min, max], [min, max])
    const value = useMemo(
      () => clampValue(propValue ?? innerValue, range),
      [propValue, innerValue, range],
    )

    useEffect(() => dispatch({ type: 'SET_VALUE', value }), [value])

    const { binders, position } = useDrag({ clamped: true })
    const percentageX = invert ? 1 - position.percentageX : position.percentageX

    const isMounted = useIsMounted()
    useIsomorphicLayoutEffect(() => {
      if (isMounted) {
        const denormalizedValue = denormalize(percentageX, range)
        dispatch({
          type: 'UPDATE_VALUE',
          value: calculateClosestStep(denormalizedValue, step, range),
        })
      }
    }, [percentageX, range, step])

    const handleTrackKeyPress = (event: React.KeyboardEvent) => {
      const keyboardIncrement = getKeyboardIncrement(event)

      if (keyboardIncrement !== 0) {
        event.nativeEvent.preventDefault()
        const newValue =
          value + step * (invert ? -keyboardIncrement : keyboardIncrement)
        dispatch({
          type: 'UPDATE_VALUE',
          value: clampValue(toFixedPrecision(newValue, step), range),
        })
      }
    }

    const handleInput = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({
          type: 'INPUT_TYPING',
          value: event.target.value,
          range,
        }),
      [range],
    )

    const relativeCursorPosition = useMemo(
      () => getLeftOffset(value, range, invert),
      [value, range, invert],
    )

    const transformedText = useMemo(
      () => transformDisplayedValues(value),
      [transformDisplayedValues, value],
    )

    const inputWidth = useInputWidth({ max, step })

    const calculatedMarks = useCalculateMarks({
      step,
      range,
      marks,
      transformDisplayedValues,
    })
    const hasMarks = !!calculatedMarks.length

    if (ssr && isServer()) return null

    return (
      <div
        className={clsx(hasMarks && 'after:block after:h-8', className)}
        {...props}
      >
        <div
          className={clsx(
            'flex items-center justify-between gap-1.5',
            showInput ? 'mb-2' : 'mb-4',
          )}
        >
          <Label htmlFor={inputId}>{label}</Label>
          {displayValue && <span className="text-tsm">{transformedText}</span>}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full">
            <div
              className={clsx(
                'group relative flex h-1 w-full touch-none items-center rounded-3xl pr-4',
                disabled
                  ? 'bg-separator/40 cursor-not-allowed'
                  : 'bg-primaryVariant cursor-pointer',
              )}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={disabled ? undefined : handleTrackKeyPress}
              {...(disabled ? {} : binders)}
            >
              <S.ExtendedClickableArea />
              <S.FullscreenClickable />

              {/* Track */}
              <div
                className={clsx(
                  'absolute top-0 left-0 h-full rounded-3xl transition-all group-active:transition-none',
                  disabled ? 'bg-separator/80' : 'bg-primary',
                )}
                style={{ width: relativeCursorPosition }}
              />

              {/* Cursor */}
              <div
                title={accessibleLabel}
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
                      onClick={
                        !disabled
                          ? () =>
                              dispatch({
                                type: 'UPDATE_VALUE',
                                value: mark.value,
                              })
                          : undefined
                      }
                      className={clsx(
                        'absolute whitespace-nowrap p-1 text-xs',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
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
              aria-label={accessibleLabel}
              type="number"
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              value={inputValue}
              onChange={handleInput}
              onBlur={() => dispatch({ type: 'SET_VALUE', value })}
              onKeyPress={onKeyPress}
              enterKeyHint={enterKeyHint}
              className={clsx(
                'reset-spinner border-1 text-tsm border-separator out-of-range:!border-red focus:border-primary box-content rounded-md border-solid py-2.5 px-4 outline-none transition-colors',
                disabled
                  ? 'text-onSurface/50 bg-separator/50 cursor-not-allowed'
                  : 'text-onSurface bg-surface',
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
          onInput={useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
              if (+event.target.value === dispatchedValue.current) return
              // eslint-disable-next-line no-param-reassign
              event.target.value = dispatchedValue.current.toString()
              onChange?.(event as React.ChangeEvent<HTMLInputElement>)
            },
            [onChange],
          )}
        />
      </div>
    )
  },
)

export default Slider
