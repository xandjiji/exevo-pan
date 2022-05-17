import clsx from 'clsx'
import styles from './styles.module.css'

export const Group = (args: JSX.IntrinsicElements['div']) => (
  <div {...args} className="text-s grid gap-[3px]" />
)

export const Small = (args: JSX.IntrinsicElements['small']) => (
  <small {...args} className="font-light transition-colors" />
)

export const Strong = (args: JSX.IntrinsicElements['strong']) => (
  <strong {...args} className="mb-0.5 text-[19px]" />
)

export const Striked = ({
  className,
  ...props
}: JSX.IntrinsicElements['del']) => (
  <del className={clsx('text-s transition-all', className)} {...props} />
)

export const DiscountTag = ({
  className,
  ...props
}: JSX.IntrinsicElements['span']) => (
  <span
    className={clsx(
      'bg-primary text-tsm text-onPrimary rounded py-[3px] px-1 font-bold tracking-wide shadow-md transition-all',
      className,
    )}
    {...props}
  />
)

export const Bar = (args: JSX.IntrinsicElements['div']) => (
  <div
    {...args}
    className="bg-separator relative h-3 max-w-[220px] overflow-hidden rounded"
  />
)

export const TierSeparator = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx(
      'bg-surface absolute top-0 h-full w-[3px]',
      styles.tierSeparator,
      className,
    )}
    {...props}
  />
)

export const Fill = (args: JSX.IntrinsicElements['div']) => (
  <div {...args} className={styles.fill} />
)
