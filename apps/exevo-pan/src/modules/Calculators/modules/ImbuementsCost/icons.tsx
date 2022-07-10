import Image from 'next/image'
import clsx from 'clsx'
import { SpritePortrait } from 'components/Atoms'
import smallGoldTokenSrc from 'assets/labelGoldToken.png'
import ropebeltSrc from 'assets/ropeBelt.png'
import silencerclawsSrc from 'assets/silencerClaws.png'
import grimeleechSrc from 'assets/grimeleech.png'
import vampireteethSrc from 'assets/vampireTeeth.png'
import bloodypincersSrc from 'assets/bloodyPincers.png'
import deadbrainSrc from 'assets/deadBrain.png'
import protectivecharmSrc from 'assets/protectiveCharm.png'
import sabretoothSrc from 'assets/sabretooth.png'
import vexclawtalonSrc from 'assets/vexclawTalon.png'
import goldTokenSrc from 'assets/goldToken.png'
import marketSrc from 'assets/market.png'
import { BuyIconProps } from './types'

export const LabelGoldToken = () => (
  <Image src={smallGoldTokenSrc} width={12} height={12} alt="Gold Token" />
)

export const RopeBelt = () => (
  <SpritePortrait src={ropebeltSrc} width={32} height={32} alt="Rope Belt" />
)
export const SilencerClaws = () => (
  <SpritePortrait
    src={silencerclawsSrc}
    width={32}
    height={32}
    alt="Silencer Claws"
  />
)
export const GrimeleechWings = () => (
  <SpritePortrait
    src={grimeleechSrc}
    width={32}
    height={32}
    alt="Some Grimeleech Wings"
  />
)

export const VampireTeeth = () => (
  <SpritePortrait
    src={vampireteethSrc}
    width={32}
    height={32}
    alt="Vampire Teeth"
  />
)
export const BloodyPincers = () => (
  <SpritePortrait
    src={bloodypincersSrc}
    width={32}
    height={32}
    alt="Bloody Pincers"
  />
)
export const PieceOfDeadBrain = () => (
  <SpritePortrait
    src={deadbrainSrc}
    width={32}
    height={32}
    alt="Piece of Dead Brain"
  />
)

export const ProtectiveCharm = () => (
  <SpritePortrait
    src={protectivecharmSrc}
    width={32}
    height={32}
    alt="Protective Charm"
  />
)
export const Sabretooth = () => (
  <SpritePortrait src={sabretoothSrc} width={32} height={32} alt="Sabretooth" />
)
export const VexclawTalon = () => (
  <SpritePortrait
    src={vexclawtalonSrc}
    width={32}
    height={32}
    alt="Vexclaw Talon"
  />
)

export const GoldToken = ({ highlight }: BuyIconProps) => (
  <SpritePortrait
    src={goldTokenSrc}
    width={32}
    height={32}
    alt="Gold Token"
    className={clsx('transition-all', !highlight && 'opacity-25')}
  />
)

export const Market = ({ highlight }: BuyIconProps) => (
  <SpritePortrait
    src={marketSrc}
    width={32}
    height={32}
    title="Market"
    alt="Market"
    className={clsx('transition-all', !highlight && 'opacity-25')}
  />
)
