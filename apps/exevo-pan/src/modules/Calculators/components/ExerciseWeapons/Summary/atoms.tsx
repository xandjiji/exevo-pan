import { ActiveCount as BaseActiveCount } from 'components/Atoms'
import Image from 'next/image'
import swordSrc from 'assets/exerciseWeapon.gif'

export const Group = (args: JSX.IntrinsicElements['div']) => (
  <div className="text-tsm grid gap-2" {...args} />
)

export const ChipWrapper = (args: JSX.IntrinsicElements['div']) => (
  <div
    className="child:flex child:gap-1.5 child:after:content-['/'] last:child:after:hidden child:after:absolute child:after:-right-2 child:relative flex items-center gap-3"
    {...args}
  />
)

export const ActiveCount: typeof BaseActiveCount = (args) => (
  <BaseActiveCount
    {...args}
    className="absolute right-0 -top-2.5 w-fit !rounded p-1 font-bold tracking-wide"
    style={{ transform: 'translateX(33%)' }}
  />
)

export const Weapon = () => (
  <Image role="none" width={16} height={16} alt="Sword" src={swordSrc} />
)
