import clsx from 'clsx'
import styles from './styles.module.css'

export const Chip = ({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx(
      'bg-separator/60 relative flex h-fit w-fit shrink-0 items-center gap-1.5 rounded-xl py-1.5 px-3 font-normal transition-colors',
      styles.hidden,
      className,
    )}
    {...props}
  />
)

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
