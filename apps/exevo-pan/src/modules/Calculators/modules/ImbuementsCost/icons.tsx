import Image from 'next/image'
import { SpritePortrait } from 'components/Atoms'
import goldTokenSrc from 'assets/goldToken.png'
import ropebeltSrc from 'assets/ropeBelt.png'
import silencerclawsSrc from 'assets/silencerClaws.png'
import grimeleechSrc from 'assets/grimeleech.png'
import vampireteethSrc from 'assets/vampireTeeth.png'
import bloodypincersSrc from 'assets/bloodyPincers.png'
import deadbrainSrc from 'assets/deadBrain.png'
import protectivecharmSrc from 'assets/protectiveCharm.png'
import sabretoothSrc from 'assets/sabretooth.png'
import vexclawtalonSrc from 'assets/vexclawTalon.png'

export const GoldToken = () => (
  <Image src={goldTokenSrc} width={12} height={12} alt="Gold Token" />
)

export const RopeBelt = () => (
  <SpritePortrait
    src={ropebeltSrc}
    width={32}
    height={32}
    title="Rope Belt"
    alt="Rope Belt"
  />
)
export const SilencerClaws = () => (
  <SpritePortrait
    src={silencerclawsSrc}
    width={32}
    height={32}
    title="Silencer Claws"
    alt="Silencer Claws"
  />
)
export const GrimeleechWings = () => (
  <SpritePortrait
    src={grimeleechSrc}
    width={32}
    height={32}
    title="Some Grimeleech Wings"
    alt="Some Grimeleech Wings"
  />
)

export const VampireTeeth = () => (
  <SpritePortrait
    src={vampireteethSrc}
    width={32}
    height={32}
    title="Vampire Teeth"
    alt="Vampire Teeth"
  />
)
export const BloodyPincers = () => (
  <SpritePortrait
    src={bloodypincersSrc}
    width={32}
    height={32}
    title="Bloody Pincers"
    alt="Bloody Pincers"
  />
)
export const PieceOfDeadBrain = () => (
  <SpritePortrait
    src={deadbrainSrc}
    width={32}
    height={32}
    title="Piece of Dead Brain"
    alt="Piece of Dead Brain"
  />
)

export const ProtectiveCharm = () => (
  <SpritePortrait
    src={protectivecharmSrc}
    width={32}
    height={32}
    title="Protective Charm"
    alt="Protective Charm"
  />
)
export const Sabretooth = () => (
  <SpritePortrait
    src={sabretoothSrc}
    width={32}
    height={32}
    title="Sabretooth"
    alt="Sabretooth"
  />
)
export const VexclawTalon = () => (
  <SpritePortrait
    src={vexclawtalonSrc}
    width={32}
    height={32}
    title="Vexclaw Talon"
    alt="Vexclaw Talon"
  />
)
