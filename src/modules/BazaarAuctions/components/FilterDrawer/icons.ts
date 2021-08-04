import styled from 'styled-components'
import { ReactComponent as ResetIcon } from 'assets/svgs/reset.svg'
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
  fill: ${({ theme }) => theme.colors.onPrimary};
`

const ImgIcon = styled.img`
  margin-right: 6px;
`

export const Rook = styled(ImgIcon).attrs({
  src: RookIcon,
  alt: 'None',
})``
export const Knight = styled(ImgIcon).attrs({
  src: KnightIcon,
  alt: 'Knight',
})``
export const Paladin = styled(ImgIcon).attrs({
  src: PaladinIcon,
  alt: 'Paladin',
})``
export const Sorcerer = styled(ImgIcon).attrs({
  src: SorcererIcon,
  alt: 'Sorcerer',
})``
export const Druid = styled(ImgIcon).attrs({
  src: DruidIcon,
  alt: 'Druid',
})``

export const Magic = styled(ImgIcon).attrs({
  src: MagicIcon,
  alt: 'Magic Level',
})``
export const Distance = styled(ImgIcon).attrs({
  src: DistanceIcon,
  alt: 'Distance Fighting',
})``
export const Club = styled(ImgIcon).attrs({
  src: ClubIcon,
  alt: 'Club Fighting',
})``
export const Sword = styled(ImgIcon).attrs({
  src: SwordIcon,
  alt: 'Sword Fighting',
})``
export const Axe = styled(ImgIcon).attrs({
  src: AxeIcon,
  alt: 'Axe Fighting',
})``

export const Dove = styled(ImgIcon).attrs({
  src: DoveIcon,
  alt: 'Optional Pvp',
})``
export const WhiteSkull = styled(ImgIcon).attrs({
  src: WhiteSkullIcon,
  alt: 'Open Pvp',
})``
export const OrangeSkull = styled(ImgIcon).attrs({
  src: OrangeSkullIcon,
  alt: 'Retro Open Pvp',
})``
export const RedSkull = styled(ImgIcon).attrs({
  src: RedSkullIcon,
  alt: 'Hardcore Pvp',
})``
export const BlackSkull = styled(ImgIcon).attrs({
  src: BlackSkullIcon,
  alt: 'Retro Hardcore Pvp',
})``

export const EuFlag = styled(ImgIcon).attrs({
  src: EuFlagIcon,
  alt: 'Europe',
})``
export const NaFlag = styled(ImgIcon).attrs({
  src: NaFlagIcon,
  alt: 'North America',
})``
export const BrFlag = styled(ImgIcon).attrs({
  src: BrFlagIcon,
  alt: 'South America',
})``

export const Status = styled.div<StatusStyleProps>`
  margin: 0 6px 0 0;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: solid 1px #00000020;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.14);
  background-color: ${({ color, theme }) => theme.colors[color]};
`

export const Exclamation = styled.div`
  position: relative;
  margin-left: 4px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: solid 2px;
  border-color: ${({ theme }) => theme.colors.separator};

  &::after {
    content: '!';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.separator};
  }
`
