import { memo } from 'react'
import clsx from 'clsx'

const Gradient = ({ className, ...props }: JSX.IntrinsicElements['strong']) => (
  <strong
    className={clsx(
      className,
      'from-primaryHighlight to-rare whitespace-nowrap bg-gradient-to-r bg-clip-text text-transparent',
    )}
    {...props}
  />
)

export default memo(Gradient)
