import styled from 'styled-components'
import Image from 'next/image'
import ResetIcon from 'assets/svgs/reset.svg'
import RookIcon from 'assets/rook.png'
import KnightIcon from 'assets/knight.png'
import PaladinIcon from 'assets/paladin.png'
import SorcererIcon from 'assets/sorcerer.png'
import DruidIcon from 'assets/druid.png'
import MagicIcon from 'assets/magic.png'
import DistanceIcon from 'assets/distance.png'
import ClubIcon from 'assets/club.png'
import SwordIcon from 'assets/sword.png'
import AxeIcon from 'assets/axe.png'
import DoveIcon from 'assets/dove.png'
import OrangeSkullIcon from 'assets/orangeSkull.png'
import WhiteSkullIcon from 'assets/whiteSkull.png'
import RedSkullIcon from 'assets/redSkull.png'
import BlackSkullIcon from 'assets/blackSkull.png'
import BrFlagIcon from 'assets/br-flag.png'
import EuFlagIcon from 'assets/eu-flag.png'
import NaFlagIcon from 'assets/na-flag.png'

import { StatusStyleProps } from './types'

export const Reset = styled(ResetIcon)`
  fill: var(--onPrimary);
`

export const Rook = styled(Image).attrs({
  src: RookIcon,
  alt: 'None',
  role: 'none',
})``
export const Knight = styled(Image).attrs({
  src: KnightIcon,
  alt: 'Knight',
  role: 'none',
})``
export const Paladin = styled(Image).attrs({
  src: PaladinIcon,
  alt: 'Paladin',
  role: 'none',
})``
export const Sorcerer = styled(Image).attrs({
  src: SorcererIcon,
  alt: 'Sorcerer',
  role: 'none',
})``
export const Druid = styled(Image).attrs({
  src: DruidIcon,
  alt: 'Druid',
  role: 'none',
})``

export const Magic = styled(Image).attrs({
  src: MagicIcon,
  alt: 'Magic Level',
  role: 'none',
})``
export const Distance = styled(Image).attrs({
  src: DistanceIcon,
  alt: 'Distance Fighting',
  role: 'none',
})``
export const Club = styled(Image).attrs({
  src: ClubIcon,
  alt: 'Club Fighting',
  role: 'none',
})``
export const Sword = styled(Image).attrs({
  src: SwordIcon,
  alt: 'Sword Fighting',
  role: 'none',
})``
export const Axe = styled(Image).attrs({
  src: AxeIcon,
  alt: 'Axe Fighting',
  role: 'none',
})``

export const Dove = styled(Image).attrs({
  src: DoveIcon,
  alt: 'Optional Pvp',
  role: 'none',
})``
export const WhiteSkull = styled(Image).attrs({
  src: WhiteSkullIcon,
  alt: 'Open Pvp',
  role: 'none',
})``
export const OrangeSkull = styled(Image).attrs({
  src: OrangeSkullIcon,
  alt: 'Retro Open Pvp',
  role: 'none',
})``
export const RedSkull = styled(Image).attrs({
  src: RedSkullIcon,
  alt: 'Hardcore Pvp',
  role: 'none',
})``
export const BlackSkull = styled(Image).attrs({
  src: BlackSkullIcon,
  alt: 'Retro Hardcore Pvp',
  role: 'none',
})``

export const EuFlag = styled(Image).attrs({
  src: EuFlagIcon,
  alt: 'Europe',
  role: 'none',
})``
export const NaFlag = styled(Image).attrs({
  src: NaFlagIcon,
  alt: 'North America',
  role: 'none',
})``
export const BrFlag = styled(Image).attrs({
  src: BrFlagIcon,
  alt: 'South America',
  role: 'none',
})``

export const Status = styled.div<StatusStyleProps>`
  margin: 0 6px 0 0;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: solid 1px #00000020;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.14);
  background-color: ${({ color }) => `var(--${color})`};
`

export const Exclamation = styled.div`
  position: relative;
  margin-left: 4px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: solid 2px;
  border-color: var(--separator);

  &::after {
    content: '!';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 12px;
    font-weight: 700;
    color: var(--separator);
  }
`
