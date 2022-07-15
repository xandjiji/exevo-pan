import { memo } from 'react'
import clsx from 'clsx'
import { FormErrorProps } from './types'

const FormError = ({ error, className, ...props }: FormErrorProps) => (
  <span
    aria-hidden={!error}
    role="alert"
    className={clsx(
      'text-red px-2.5 text-xs transition-opacity',
      !error && 'opacity-0',
      className,
    )}
    suppressHydrationWarning
    {...props}
  >
    {error}
  </span>
)

export default memo(FormError)
