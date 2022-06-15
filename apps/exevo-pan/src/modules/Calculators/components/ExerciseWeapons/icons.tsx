import Image from 'next/image'
import ResetIcon from 'assets/svgs/reset.svg'
import rookSrc from 'assets/rook.png'
import knightSrc from 'assets/knight.png'
import paladinSrc from 'assets/paladin.png'
import sorcererSrc from 'assets/sorcerer.png'
import druidSrc from 'assets/druid.png'
import magicSrc from 'assets/magic.png'
import distanceSrc from 'assets/distance.png'
import clubSrc from 'assets/club.png'
import swordSrc from 'assets/sword.png'
import axeSrc from 'assets/axe.png'

export const Reset = (args: JSX.IntrinsicElements['svg']) => (
  <ResetIcon {...args} className="fill-onPrimary transition-colors" />
)

export const Rook = () => <Image role="none" alt="None" src={rookSrc} />
export const Knight = () => <Image role="none" alt="Knight" src={knightSrc} />
export const Paladin = () => (
  <Image role="none" alt="Paladin" src={paladinSrc} />
)
export const Sorcerer = () => (
  <Image role="none" alt="Sorcerer" src={sorcererSrc} />
)
export const Druid = () => <Image role="none" alt="Druid" src={druidSrc} />

export const Magic = () => (
  <Image role="none" alt="Magic Level" src={magicSrc} />
)
export const Distance = () => (
  <Image role="none" alt="Distance Fighting" src={distanceSrc} />
)
export const Club = () => (
  <Image role="none" alt="Club Fighting" src={clubSrc} />
)
export const Sword = () => (
  <Image role="none" alt="Sword Fighting" src={swordSrc} />
)
export const Axe = () => <Image role="none" alt="Axe Fighting" src={axeSrc} />
