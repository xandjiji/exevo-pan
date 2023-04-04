import { memo } from 'react'
import clsx from 'clsx'

const Gradient = ({ className, ...props }: JSX.IntrinsicElements['strong']) => (
  <strong
    className={clsx(className, 'rare-gradient-text whitespace-nowrap')}
    {...props}
  />
)

export default memo(Gradient)
