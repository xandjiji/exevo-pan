import clsx from 'clsx'

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'bg-separator relative inline-block overflow-hidden rounded opacity-60 after:absolute after:top-0 after:left-0 after:h-full after:w-full',
      className,
    )}
    {...props}
  />
)

export default Skeleton
