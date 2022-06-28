/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { forwardRef, useRef, useCallback, useMemo } from 'react'
import clsx from 'clsx'
import { useUuid } from 'hooks'
import Label from '../Label'
import useTimeInput from './useTimeInput'
import { TimeInputProps } from './types'

/* @ ToDo:
- hidden input
- controllable
*/

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

const TimeInput = ({
  id: idProp,
  className,
  name,
  label,
  'aria-label': ariaLabel,
  disabled,
  min = 0,
  max = 23,
  error,
  noAlert = false,
  ...props
}: TimeInputProps) => {
  const uuid = useUuid()
  const inputId = idProp ?? uuid
  const accessibleLabel = typeof label === 'string' ? label : ariaLabel

  const errorId = useUuid()

  const hoursRef = useRef<HTMLInputElement>(null)
  const minutesRef = useRef<HTMLInputElement>(null)

  const focusHours = useCallback(() => hoursRef.current?.focus(), [])

  const hourBinders = useTimeInput({
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

  const minuteBinders = useTimeInput({
    min: 0,
    max: 59,
    onKey: useMemo(
      () => ({
        ArrowLeft: focusHours,
      }),
      [focusHours],
    ),
  })

  return (
    <div className={clsx('text-tsm', className)} onClick={focusHours}>
      <Label className="mb-2" htmlFor={inputId} onClick={focusHours}>
        {label}
      </Label>
      <div
        className={clsx(
          'border-1 text-tsm child:shrink-0 flex w-fit items-center gap-[1px] rounded-md border-solid py-[9px] px-3 transition-colors',
          error ? 'border-red' : 'border-separator focus-within:border-primary',
          disabled ? 'bg-separator cursor-default' : 'bg-surface cursor-text',
        )}
      >
        <Input ref={hoursRef} disabled={disabled} {...hourBinders} />
        :
        <Input ref={minutesRef} disabled={disabled} {...minuteBinders} />
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
        hidden
        id={inputId}
        name={name}
        aria-label={accessibleLabel}
        disabled={disabled}
        aria-invalid={!!error}
        aria-errormessage={error ? errorId : undefined}
        {...props}
      />
    </div>
  )
}

export default TimeInput
