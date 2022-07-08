import Image from 'next/image'
import goldTokenSrc from 'assets/goldToken.png'
import ropebeltSrc from 'assets/ropeBelt.png'
import silencerclawsSrc from 'assets/silencerClaws.png'
import grimeleechSrc from 'assets/grimeleech.png'

export const GoldToken = () => (
  <Image src={goldTokenSrc} width={12} height={12} alt="Gold Token" />
)

export const RopeBelt = () => (
  <Image src={ropebeltSrc} width={11} height={12} alt="Rope Belt" />
)
export const SilencerClaws = () => (
  <Image src={silencerclawsSrc} width={11} height={12} alt="Silencer Claws" />
)
export const GrimeleechWings = () => (
  <Image
    src={grimeleechSrc}
    width={12}
    height={12}
    alt="Some Grimeleech Wings"
  />
)
