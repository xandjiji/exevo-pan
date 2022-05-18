/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useTranslations } from 'contexts/useTranslation'
import { useState, useRef, memo } from 'react'
import clsx from 'clsx'
import { useUuid } from 'hooks'
import ClearIcon from 'assets/svgs/cross.svg'
import { InputProps, InputValue } from './types'

const Input = ({
  className,
  style,
  allowClear = false,
  errorMessage,
  value: valueProp,
  onChange,
  hasAlert = true,
  ...props
}: InputProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const errorId = useUuid()

  const [value, setValue] = useState<InputValue>(valueProp ?? '')
  const derivedValue = valueProp ?? value
  const isClearButtonActive = allowClear && !!derivedValue
  const isInvalid = !!errorMessage

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleClearClick = () => {
    if (inputRef.current) {
      if (isClearButtonActive) {
        const event = new Event('input', { bubbles: true })
        setValue('')
        inputRef.current.value = ''
        inputRef.current.dispatchEvent(event)
      }
      inputRef.current.focus()
    }
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
  }

  return (
    <div className={clsx('text-tsm', className)} style={style}>
      <div
        className={clsx(
          'border-1 bg-surface flex w-full cursor-text rounded-md border-solid transition-colors',
          isInvalid
            ? 'border-red'
            : 'border-separator focus-within:border-primary',
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          value={derivedValue}
          onChange={handleChange}
          onInput={handleInput}
          aria-invalid={isInvalid}
          aria-errormessage={isInvalid ? errorId : undefined}
          autoComplete="off"
          className="text-tsm text-onSurface w-full border-none bg-transparent py-2.5 px-4 outline-none transition-all"
          style={{ paddingRight: isClearButtonActive ? 0 : undefined }}
          {...props}
        />
        {allowClear && (
          <button
            type="button"
            aria-label={common.ClearInputLabel}
            disabled={!isClearButtonActive}
            aria-hidden={!isClearButtonActive}
            onClick={handleClearClick}
            className={clsx(
              'text-none w-[40px] shrink-0 transition-opacity',
              isClearButtonActive
                ? 'cursor-pointer'
                : 'pointer-events-none opacity-0',
            )}
          >
            <ClearIcon className="fill-onSurface h-5 w-5" />
          </button>
        )}
      </div>
      {hasAlert && (
        <span
          id={errorId}
          aria-hidden={!isInvalid}
          role="alert"
          className={clsx(
            'text-red px-2.5 text-xs transition-opacity',
            !isInvalid && 'opacity-0',
          )}
          suppressHydrationWarning
        >
          {errorMessage}
        </span>
      )}
    </div>
  )
}

export default memo(Input)
