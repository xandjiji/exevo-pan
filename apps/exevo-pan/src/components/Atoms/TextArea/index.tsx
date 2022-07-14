import { forwardRef, Ref, useState, useCallback } from 'react'
import clsx from 'clsx'
import { useUuid, useSharedRef } from 'hooks'
import Label from '../Label'
import { TextAreaProps } from './types'

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id: idProp,
      className,
      'aria-label': ariaLabel,
      label,
      value: propValue,
      defaultValue: defaultValueProp,
      disabled = false,
      error,
      noResize,
      style,
      ...props
    },
    refProp,
  ) => {
    const innerRef = useSharedRef<HTMLTextAreaElement>(refProp)

    const textboxId = idProp ?? useUuid()
    const errorId = useUuid()

    return (
      <div className={clsx('text-tsm flex flex-col', className)} style={style}>
        <Label htmlFor={textboxId} className="mb-2 shrink-0">
          {label}
        </Label>
        <textarea
          ref={innerRef}
          id={textboxId}
          aria-invalid={!!error}
          aria-errormessage={error ? errorId : undefined}
          autoComplete="off"
          disabled={disabled}
          className={clsx(
            'border-1 text-tsm border-separator focus:border-primary custom-scrollbar max-w-full grow rounded-md border-solid py-2.5 px-4 leading-tight outline-none transition-colors',
            noResize && 'resize-none',
            disabled
              ? 'text-onSurface/50 bg-separator/50'
              : 'text-onSurface bg-surface',
          )}
          style={{ minWidth: 'inherit' }}
        />
      </div>
    )
  },
)

export default TextArea
