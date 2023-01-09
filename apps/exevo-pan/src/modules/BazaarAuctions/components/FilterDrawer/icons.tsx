import Image from 'next/image'
import { ResetIcon } from 'assets/svgs'
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
import doveSrc from 'assets/dove.png'
import orangeSkullSrc from 'assets/orangeSkull.png'
import whiteSkullSrc from 'assets/whiteSkull.png'
import redSkullSrc from 'assets/redSkull.png'
import blackSkullSrc from 'assets/blackSkull.png'
import brFlagSrc from 'assets/br-flag.png'
import euFlagSrc from 'assets/eu-flag.png'
import naFlagSrc from 'assets/na-flag.png'
import yellowSrc from 'assets/yellowbattleye.png'
import greenSrc from 'assets/greenbattleye.png'

import { StatusStyleProps } from './types'

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

export const Dove = () => <Image role="none" alt="Optional Pvp" src={doveSrc} />
export const WhiteSkull = () => (
  <Image role="none" alt="Open Pvp" src={whiteSkullSrc} />
)
export const OrangeSkull = () => (
  <Image role="none" alt="Retro Open Pvp" src={orangeSkullSrc} />
)
export const RedSkull = () => (
  <Image role="none" alt="Hardcore Pvp" src={redSkullSrc} />
)
export const BlackSkull = () => (
  <Image role="none" alt="Retro Hardcore Pvp" src={blackSkullSrc} />
)

export const EuFlag = () => <Image role="none" alt="Europe" src={euFlagSrc} />
export const NaFlag = () => (
  <Image role="none" alt="North America" src={naFlagSrc} />
)
export const BrFlag = () => (
  <Image role="none" alt="South America" src={brFlagSrc} />
)

export const Status = ({ color }: StatusStyleProps) => (
  <Image
    role="none"
    alt={`${color === 'battleGreen' ? 'Green' : 'Yellow'} BattlEye`}
    src={color === 'battleGreen' ? greenSrc : yellowSrc}
  />
)
