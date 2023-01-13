import clsx from 'clsx'

export const Strong = ({
  className,
  ...props
}: JSX.IntrinsicElements['strong']) => (
  <strong className={clsx(className, '-ml-0.5')} {...props} />
)
