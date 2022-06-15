import Image from 'next/image'
import knightSrc from 'assets/knight.png'
import paladinSrc from 'assets/paladin.png'
import sorcererSrc from 'assets/sorcerer.png'
import druidSrc from 'assets/druid.png'
import magicSrc from 'assets/magic.png'
import distanceSrc from 'assets/distance.png'
import axeSrc from 'assets/axe.png'

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
export const Axe = () => <Image role="none" alt="Axe Fighting" src={axeSrc} />
