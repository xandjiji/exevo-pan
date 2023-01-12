import clsx from 'clsx'

const LoadingAlert = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    role="alert"
    className={clsx(
      'z-99 bg-primaryVariantAlert text-tsm text-onAlert fixed top-7 left-1/2 flex items-center rounded-md py-1.5 px-4 font-bold shadow-md',
      className,
    )}
    style={{ transform: 'translateX(-50%)' }}
    {...props}
  >
    <div className="loading-spinner mr-2 h-3 w-3" role="alert" />
    {children}
  </div>
)

export default LoadingAlert
