import clsx from 'clsx'
import styles from './styles.module.css'

export const Chip = ({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx(
      'bg-separator/60 flex items-center rounded-xl py-1.5 px-3 font-normal transition-colors',
      styles.hidden,
      className,
    )}
    {...props}
  />
)

export const Group = (args: JSX.IntrinsicElements['div']) => (
  <div className="text-tsm grid gap-2" {...args} />
)
