/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { forwardRef, useRef, useCallback, useMemo, useEffect } from 'react'
import clsx from 'clsx'
import { useUuid, useSharedRef, useIsMounted } from 'hooks'
import Label from '../Label'
import useTimeInput from './useTimeInput'
import { EMPTY_VALUE, value2TimeObject, buildTime } from './utils'
import { TimeInputProps } from './types'

const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(
  (args, ref) => (
    <input
      ref={ref}
      {...args}
      className="focus:bg-primaryVariant text-onSurface text-tsm border-none bg-transparent text-center caret-transparent outline-none transition-colors selection:bg-transparent"
      style={{ width: '3ch' }}
      inputMode="numeric"
    />
  ),
)

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      id: idProp,
      className,
      name,
      label,
      'aria-label': ariaLabel,
      disabled,
      min = 0,
      max = 23,
      value: valueProp,
      defaultValue = EMPTY_VALUE,
      onChange,
      error,
      noAlert = false,
      enterKeyHint,
      onKeyPress,
      ...props
    },
    refProp,
  ) => {
    const uuid = useUuid()
    const inputId = idProp ?? uuid
    const accessibleLabel = typeof label === 'string' ? label : ariaLabel

    const errorId = useUuid()

    const hoursRef = useRef<HTMLInputElement>(null)
    const minutesRef = useRef<HTMLInputElement>(null)

    const focusHours = useCallback(() => hoursRef.current?.focus(), [])

    const initialValue = useRef(value2TimeObject(valueProp ?? defaultValue))
    const controlledValue = useMemo(
      () => (valueProp ? value2TimeObject(valueProp) : undefined),
      [valueProp],
    )

    const { nextValue: dispatchedHours, ...hourBinders } = useTimeInput({
      defaultValue: initialValue.current.hours,
      controlledValue: controlledValue?.hours,
      min,
      max,
      onInferredValue: useCallback(() => minutesRef.current?.focus(), []),
      onKey: useMemo(
        () => ({
          ArrowRight: () => minutesRef.current?.focus(),
        }),
        [],
      ),
    })

    const { nextValue: dispatchedMinutes, ...minuteBinders } = useTimeInput({
      defaultValue: initialValue.current.minutes,
      controlledValue: controlledValue?.minutes,
      min: 0,
      max: 59,
      onDoubleBackspace: focusHours,
      onKey: useMemo(
        () => ({
          ArrowLeft: focusHours,
        }),
        [focusHours],
      ),
    })

    const maxLength = useMemo(() => max.toString().length, [max])
    const innerRef = useSharedRef<HTMLInputElement>(refProp)
    const dispatchedValue = useRef('')
    const isMounted = useIsMounted()
    useEffect(() => {
      if (isMounted) {
        dispatchedValue.current = buildTime(
          dispatchedHours,
          dispatchedMinutes,
          maxLength,
        )
        const event = new Event('input', { bubbles: true })
        innerRef.current?.dispatchEvent?.(event)
      }
    }, [maxLength, dispatchedHours, dispatchedMinutes])

    return (
      <div className={clsx('text-tsm', className)}>
        <Label className="mb-2" htmlFor={inputId} onClick={focusHours}>
          {label}
        </Label>
        <div
          className={clsx(
            'border-1 text-tsm child:shrink-0 flex w-fit items-center justify-center gap-[1px] rounded-md border-solid py-[9px] px-3 transition-colors',
            error
              ? 'border-red'
              : 'border-separator focus-within:border-primary',
            disabled ? 'bg-separator cursor-default' : 'bg-surface cursor-text',
          )}
          onClick={focusHours}
        >
          <Input ref={hoursRef} disabled={disabled} {...hourBinders} />
          :
          <Input
            ref={minutesRef}
            disabled={disabled}
            enterKeyHint={enterKeyHint}
            onKeyPress={onKeyPress}
            {...minuteBinders}
          />
        </div>
        {!noAlert && (
          <span
            id={errorId}
            aria-hidden={!error}
            role="alert"
            className={clsx(
              'text-red px-2.5 text-xs transition-opacity',
              !error && 'opacity-0',
            )}
            suppressHydrationWarning
          >
            {error}
          </span>
        )}
        <input
          ref={innerRef}
          hidden
          id={inputId}
          name={name}
          aria-label={accessibleLabel}
          disabled={disabled}
          aria-invalid={!!error}
          aria-errormessage={error ? errorId : undefined}
          {...props}
          onInput={useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value === dispatchedValue.current) return
              // eslint-disable-next-line no-param-reassign
              event.target.value = dispatchedValue.current
              onChange?.(event as React.ChangeEvent<HTMLInputElement>)
            },
            [onChange],
          )}
        />
      </div>
    )
  },
)

export default TimeInput
