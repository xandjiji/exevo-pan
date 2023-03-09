import clsx from 'clsx'

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
