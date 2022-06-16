import clsx from 'clsx'
import { ActiveCount as BaseActiveCount } from 'components/Atoms'
import Image from 'next/image'
import lastingSrc from 'assets/lastingSword.gif'
import durableSrc from 'assets/durableSword.gif'
import regularSrc from 'assets/regularSword.gif'
import { ChipWrapperProps } from './types'

export const Group = (args: JSX.IntrinsicElements['div']) => (
  <div className="text-tsm grid gap-2" {...args} />
)

export const ChipWrapper = ({
  className,
  separator = false,
  ...props
}: ChipWrapperProps) => (
  <div
    className={clsx(
      'child:flex child:gap-1.5 child:relative flex items-center',
      separator
        ? 'child:after:content-["/"] last:child:after:hidden child:after:absolute child:after:-right-2.5 gap-4'
        : 'gap-2',
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
