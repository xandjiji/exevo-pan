import clsx from 'clsx'

const ActiveCount = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'bg-battleYellow flex cursor-default items-center justify-center rounded py-0.5 px-1 text-[11px] font-bold text-black shadow-md transition-opacity',
      props['aria-hidden'] && 'opacity-0',
      className,
    )}
    {...props}
  />
)

export default ActiveCount
