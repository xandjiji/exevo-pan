import clsx from 'clsx'
import { ErrorOutlineIcon, InfoIcon } from 'assets/svgs'

type AlertProps = {
  noIcon?: boolean
  icon?: (args: JSX.IntrinsicElements['svg']) => JSX.Element
  variant: 'primary' | 'alert'
} & JSX.IntrinsicElements['div']

const IconDefaults: Record<AlertProps['variant'], AlertProps['icon']> = {
  primary: InfoIcon,
  alert: ErrorOutlineIcon,
}

const Alert = ({
  variant,
  noIcon = false,
  icon: IconProp,
  className,
  children,
  ...props
}: AlertProps) => {
  const Icon = IconProp ?? IconDefaults[variant]!

  return (
    <div
      role="alert"
      className={clsx(
        className,
        'text-tsm rounded border-solid py-3 px-4 leading-relaxed tracking-wide shadow-sm transition-colors',
        {
          primary: 'border-primary text-onSurface bg-separator/50',
          alert: 'border-primaryAlert bg-primaryVariantAlert text-onAlert',
        }[variant],
      )}
      style={{ borderWidth: 0, borderLeftWidth: 6 }}
      {...props}
    >
      {!noIcon && (
        <Icon
          className={clsx(
            {
              primary: 'fill-onSurface',
              alert: 'fill-onAlert',
            }[variant],
            'mr-1.5 mb-0.5 h-4 w-4 align-middle',
          )}
        />
      )}
      {children}
    </div>
  )
}

export default Alert
