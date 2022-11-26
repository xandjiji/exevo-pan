import clsx from 'clsx'

const RareFrame = ({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx(
      className,
      'absolute-centered border-rare/50 shadow-rare shadow-rare/25 rounded-inherit pointer-events-none h-full w-full border-2 border-solid',
    )}
    role="none"
    {...props}
  />
)

export default RareFrame
