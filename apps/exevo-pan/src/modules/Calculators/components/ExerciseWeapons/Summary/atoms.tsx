import clsx from 'clsx'
import { ActiveCount as BaseActiveCount } from 'components/Atoms'
import Image from 'next/image'
import lastingSrc from 'assets/lastingSword.gif'
import durableSrc from 'assets/durableSword.gif'
import regularSrc from 'assets/regularSword.gif'
import styles from './styles.module.css'
import { TimeBubbleProps } from './types'

export const Group = (args: JSX.IntrinsicElements['div']) => (
  <div className="text-tsm grid gap-2" {...args} />
)

export const ChipWrapper = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx(
      'child:flex child:shrink-0 child:relative child:gap-1.5 relative flex items-center gap-4',
      className,
    )}
    {...props}
  />
)

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

export const ActiveCount: typeof BaseActiveCount = (args) => (
  <BaseActiveCount
    {...args}
    className="z-1 absolute right-0 -top-2.5 w-fit !rounded p-1 font-bold tracking-wide"
    style={{ transform: 'translateX(33%)' }}
  />
)

export const TimeBubble = ({
  time,
  children,
  className,
  ...props
}: TimeBubbleProps) => (
  <div
    className={clsx(
      'flex flex-col items-center gap-1 font-light',
      styles.hidden,
      className,
    )}
    {...props}
  >
    <Chip>{time}</Chip>
    <small>{children}</small>
  </div>
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

export const Weapon = {
  lasting: () => (
    <Image
      role="none"
      width={16}
      height={16}
      alt="Lasting exercise weapon"
      src={lastingSrc}
    />
  ),
  durable: () => (
    <Image
      role="none"
      width={16}
      height={16}
      alt="Durable exercise weapon"
      src={durableSrc}
    />
  ),
  regular: () => (
    <Image
      role="none"
      width={16}
      height={16}
      alt="Regular exercise weapon"
      src={regularSrc}
    />
  ),
}
