import { memo } from 'react'
import clsx from 'clsx'
import { Chip as BaseChip } from 'components/Atoms'

export const Chip: typeof BaseChip = memo(({ className, ...props }) => (
  <BaseChip className={clsx(className, 'animate-fadeIn')} {...props} />
))

export const Strong = ({
  className,
  ...props
}: JSX.IntrinsicElements['strong']) => (
  <strong className={clsx(className, '-ml-0.5')} {...props} />
)
