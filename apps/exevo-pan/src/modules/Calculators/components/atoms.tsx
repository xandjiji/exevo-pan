import { memo } from 'react'
import clsx from 'clsx'
import { Chip as BaseChip } from 'components/Atoms'
import styles from './styles.module.css'

export const Chip: typeof BaseChip = memo(({ className, ...props }) => (
  <BaseChip
    className={clsx('relative h-fit w-fit', styles.hidden, className)}
    gray
    {...props}
  />
))

export const ChipWrapper = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx('relative flex items-center gap-4', className)}
    {...props}
  />
)

export const Empty = ({
  className,
  ...props
}: JSX.IntrinsicElements['small']) => (
  <small
    className={clsx('!absolute top-0 left-0', styles.hidden, className)}
    {...props}
  />
)

export const Group = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div className={clsx('text-tsm grid gap-2', className)} {...props} />
)
