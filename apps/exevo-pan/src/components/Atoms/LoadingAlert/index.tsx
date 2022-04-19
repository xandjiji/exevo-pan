import clsx from 'clsx'

const LoadingAlert = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    role="alert"
    className={clsx(
      'z-99 bg-alert text-tsm fixed top-7 left-1/2 flex items-center rounded-md py-[6px] px-4 font-bold text-black shadow-md',
      className,
    )}
    style={{ transform: 'translateX(-50%)' }}
    {...props}
  >
    <div className="loading-spinner bg-alert after:bg-alert mr-2 h-3 w-3" />
    {children}
  </div>
)

export default LoadingAlert
