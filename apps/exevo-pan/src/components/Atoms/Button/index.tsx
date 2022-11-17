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
        'button-component hover:highlight-10 group cursor-pointer transition-all active:shadow-inner',
        pill &&
          'flex items-center justify-center gap-1 py-1.5 px-4 text-xs font-bold uppercase tracking-wider',
        !hollow && 'shadow-md hover:shadow-lg',
        disabled && hollow && 'child:fill-onSurface',
        hollow &&
          'text-primary active:text-primary child:fill-primary disabled:text-onSurface !bg-transparent underline',
        disabled &&
          !loading &&
          'bg-separator child:fill-black cursor-default text-black opacity-60 shadow-none',
        isDisabled ? 'pointer-events-none text-black' : 'text-onPrimary',

        className,
      )}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
      disabled={isDisabled}
    >
      {loading ? (
        <div
          className="loading-spinner before:bg-primaryVariant after:bg-primary mx-auto"
          style={{
            background:
              'linear-gradient(to right, rgb(var(--primaryVariant)) 10%, rgba(255, 255, 255, 0) 42%)',
          }}
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
