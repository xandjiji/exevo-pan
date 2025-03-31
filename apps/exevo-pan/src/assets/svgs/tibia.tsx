import { ResetIcon } from 'assets/svgs'
import { loadRawSrc } from 'utils'

const greenSrc = loadRawSrc('/assets/greenbattleye.png')
const yellowSrc = loadRawSrc('/assets/yellowbattleye.png')
const naFlagSrc = loadRawSrc('/assets/na-flag.png')
const euFlagSrc = loadRawSrc('/assets/eu-flag.png')
const brFlagSrc = loadRawSrc('/assets/br-flag.png')
const oceFlagSrc = loadRawSrc('/assets/oce-flag.png')
const blackSkullSrc = loadRawSrc('/assets/blackSkull.png')
const redSkullSrc = loadRawSrc('/assets/redSkull.png')
const whiteSkullSrc = loadRawSrc('/assets/whiteSkull.png')
const orangeSkullSrc = loadRawSrc('/assets/orangeSkull.png')
const doveSrc = loadRawSrc('/assets/dove.png')
const axeSrc = loadRawSrc('/assets/axe.png')
const swordSrc = loadRawSrc('/assets/sword.png')
const clubSrc = loadRawSrc('/assets/club.png')
const fistSrc = loadRawSrc('/assets/fist.png')
const shieldSrc = loadRawSrc('/assets/shield.png')
const distanceSrc = loadRawSrc('/assets/distance.png')
const magicSrc = loadRawSrc('/assets/magic.png')
const druidSrc = loadRawSrc('/assets/druid.png')
const sorcererSrc = loadRawSrc('/assets/sorcerer.png')
const paladinSrc = loadRawSrc('/assets/paladin.png')
const knightSrc = loadRawSrc('/assets/knight.png')
const monkSrc = loadRawSrc('/assets/monk.png')
const rookSrc = loadRawSrc('/assets/rook.png')

export const Reset = (args: JSX.IntrinsicElements['svg']) => (
  <ResetIcon {...args} className="fill-onPrimary h-6 w-6 transition-colors" />
)

export const Rook = () => <img role="none" alt="None" src={rookSrc} />
export const Knight = () => <img role="none" alt="Knight" src={knightSrc} />
export const Paladin = () => <img role="none" alt="Paladin" src={paladinSrc} />
export const Sorcerer = () => (
  <img role="none" alt="Sorcerer" src={sorcererSrc} />
)
export const Druid = () => <img role="none" alt="Druid" src={druidSrc} />
export const Monk = () => <img role="none" alt="Monk" src={monkSrc} />

export const Magic = () => <img role="none" alt="Magic Level" src={magicSrc} />
export const Distance = () => (
  <img role="none" alt="Distance Fighting" src={distanceSrc} />
)
export const Club = () => <img role="none" alt="Club Fighting" src={clubSrc} />
export const Sword = () => (
  <img role="none" alt="Sword Fighting" src={swordSrc} />
)
export const Axe = () => <img role="none" alt="Axe Fighting" src={axeSrc} />
export const Fist = () => <img role="none" alt="Fist Fighting" src={fistSrc} />
export const Shield = () => <img role="none" alt="Shielding" src={shieldSrc} />

export const Dove = () => <img role="none" alt="Optional Pvp" src={doveSrc} />
export const WhiteSkull = () => (
  <img role="none" alt="Open Pvp" src={whiteSkullSrc} />
)
export const OrangeSkull = () => (
  <img role="none" alt="Retro Open Pvp" src={orangeSkullSrc} />
)
export const RedSkull = () => (
  <img role="none" alt="Hardcore Pvp" src={redSkullSrc} />
)
export const BlackSkull = () => (
  <img role="none" alt="Retro Hardcore Pvp" src={blackSkullSrc} />
)

export const EuFlag = () => <img role="none" alt="Europe" src={euFlagSrc} />
export const NaFlag = () => (
  <img role="none" alt="North America" src={naFlagSrc} />
)
export const BrFlag = () => (
  <img role="none" alt="South America" src={brFlagSrc} />
)
export const OceFlag = () => (
  <img role="none" alt="South America" src={oceFlagSrc} />
)

export const BattlEye = ({
  color,
}: {
  color: 'battleGreen' | 'battleYellow'
}) => (
  <img
    role="none"
    alt={`${color === 'battleGreen' ? 'Green' : 'Yellow'} BattlEye`}
    src={color === 'battleGreen' ? greenSrc : yellowSrc}
  />
)
