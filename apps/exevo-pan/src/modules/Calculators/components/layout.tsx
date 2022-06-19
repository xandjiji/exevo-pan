import clsx from 'clsx'

export const Main = ({
  className,
  ...props
}: JSX.IntrinsicElements['main']) => (
  <main
    className={clsx('inner-container grid place-items-center py-4', className)}
    {...props}
  />
)

export const Card = ({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx(
      'border-separator focus-within:border-primaryVariant border-1 grid gap-4 rounded-md border-solid p-4 px-6 transition-colors',
      className,
    )}
    {...props}
  />
)
