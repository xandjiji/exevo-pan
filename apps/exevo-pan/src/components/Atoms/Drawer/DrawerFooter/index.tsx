import clsx from 'clsx'

const DrawerFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'bg-primary text-onPrimary inner-padding flex h-[60px] flex-none items-center text-base tracking-wider shadow-md',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

export default DrawerFooter
