import { forwardRef, useState, useMemo, useId } from 'react'
import clsx from 'clsx'
import Label from '../Label'
import FormError from '../FormError'
import { TextAreaProps } from './types'

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id: idProp,
      className,
      label,
      value: valueProp,
      defaultValue,
      onChange,
      disabled = false,
      error,
      noResize,
      style,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const textboxId = idProp ?? useId()
    const errorId = useId()

    const [value, setValue] = useState(valueProp ?? defaultValue ?? '')
    const derivedValue = valueProp ?? value

    const handleInput: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      onChange?.(e)
      if (valueProp === undefined) {
        setValue(e.target.value)
      }
    }

    const charCount = useMemo(
      () => derivedValue.toString().length,
      [derivedValue],
    )

    return (
      <div
        className={clsx('text-tsm relative flex flex-col', className)}
        style={style}
      >
        <Label htmlFor={textboxId} className="mb-2 shrink-0">
          {label}
        </Label>
        <textarea
          ref={ref}
          id={textboxId}
          aria-invalid={!!error}
          aria-errormessage={error ? errorId : undefined}
          autoComplete="off"
          disabled={disabled}
          onInput={handleInput}
          className={clsx(
            'border-1 text-tsm custom-scrollbar max-w-full grow rounded-md border-solid py-2.5 px-4 leading-tight outline-none transition-colors',
            noResize && 'resize-none',
            error ? 'border-red' : 'border-separator focus:border-primary',
            disabled
              ? 'text-onSurface/50 bg-separator/50 cursor-not-allowed'
              : 'text-onSurface bg-surface',
          )}
          style={{ minWidth: 'inherit' }}
          value={derivedValue}
          {...props}
        />
        {maxLength !== undefined && (
          <span
            className={clsx(
              'mt-2 text-right text-xs tracking-wider',
              charCount > maxLength && 'text-red',
            )}
          >
            {charCount}/{maxLength}
          </span>
        )}
        <FormError
          id={errorId}
          error={error}
          className="absolute top-[calc(100%+4px)] left-0 shrink-0"
        />
      </div>
    )
  },
)

export default TextArea
