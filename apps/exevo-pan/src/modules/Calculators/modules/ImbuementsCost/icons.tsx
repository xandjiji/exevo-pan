import Image from 'next/image'
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

export const VampireTeeth = () => (
  <Image src={vampireteethSrc} width={12} height={12} alt="Vampire Teeth" />
)
export const BloodyPincers = () => (
  <Image src={bloodypincersSrc} width={12} height={9} alt="Bloody Pincers" />
)
export const PieceOfDeadBrain = () => (
  <Image src={deadbrainSrc} width={12} height={10} alt="Piece of Dead Brain" />
)

export const ProtectiveCharm = () => (
  <Image
    src={protectivecharmSrc}
    width={6}
    height={12}
    alt="Protective Charm"
  />
)
export const Sabretooth = () => (
  <Image src={sabretoothSrc} width={7} height={12} alt="Sabretooth" />
)
export const VexclawTalon = () => (
  <Image src={vexclawtalonSrc} width={11} height={12} alt="Vexclaw Talon" />
)
