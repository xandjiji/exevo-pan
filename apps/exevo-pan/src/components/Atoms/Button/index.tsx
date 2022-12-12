import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { ButtonProps } from './types'

const Button = ({
  className,
  children,
  pill = false,
  hollow = false,
  loading = false,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const isDisabled = loading || disabled

  return (
    <button
      className={clsx(
        'button-component transition-all active:shadow-inner',
        disabled
          ? 'cursor-not-allowed !shadow-none'
          : 'hover:highlight-10 cursor-pointer',
        pill &&
          'flex items-center justify-center gap-1 py-1.5 px-4 text-xs font-bold uppercase tracking-wider',
        !hollow && 'shadow-md hover:shadow-lg',
        hollow &&
          '!text-onSurface active:text-primary child:fill-onSurface !bg-transparent underline opacity-50 disabled:opacity-25',
        disabled &&
          !loading &&
          'bg-separator active:bg-separator child:fill-black cursor-default text-black opacity-60 shadow-none',
        isDisabled ? 'text-black' : 'text-onPrimary',

        className,
      )}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
      disabled={isDisabled}
    >
      {loading ? (
        <div
          className={clsx(
            'loading-spinner border-onPrimary mx-auto block',
            pill && 'h-3 w-3',
          )}
          role="alert"
          aria-label={common.LoadingLabel}
        />
      ) : (
        children
      )}
    </button>
  )
}

export default Button
