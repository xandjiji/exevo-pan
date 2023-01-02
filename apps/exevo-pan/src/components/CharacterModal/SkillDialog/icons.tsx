import Image from 'next/image'
import magicSrc from 'assets/magic.png'
import distanceSrc from 'assets/distance.png'
import axeSrc from 'assets/axe.png'
import clubSrc from 'assets/club.png'
import swordSrc from 'assets/sword.png'

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
