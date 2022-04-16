import clsx from 'clsx'

const Cloudy = () => (
  <div
    role="none"
    className="z-2 from-surface pointer-events-none fixed bottom-[60px] left-0 h-6 bg-gradient-to-t to-transparent"
    style={{ width: 'calc(100% - 6px)' }}
  />
)

export default ({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx(
      'inner-padding custom-scrollbar text-onSurface relative h-full overflow-auto py-4',
      className,
    )}
    {...props}
  >
    {children}
    <Cloudy />
  </div>
)
