import clsx from 'clsx'

export const Main = ({
  className,
  ...props
}: JSX.IntrinsicElements['main']) => (
  <main
    className={clsx(
      'inner-container grid place-content-start justify-center py-4 md:pt-0',
      className,
    )}
    {...props}
  />
)

export const Spacer = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    role="none"
    className={clsx('bg-separator/40 h-[1px] w-full', className)}
    {...props}
  />
)
