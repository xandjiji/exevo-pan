import styled from 'styled-components'
import {
  SpritePortrait as BaseSpriteProtrait,
  FavButton as BaseFavButton,
  LabeledTextBox as BaseLabeledTextBox,
  AuctionTimer as BaseAuctionTimer,
} from 'components/Atoms'
import { MaterialCard } from 'styles'
import TibiaCoinImage from 'assets/tibiacoin.png'
import { BattleyeStatusStyleProps } from './types'

export const AlignedFlex = styled.div`
  display: flex;
  align-items: center;
`

export const Wrapper = styled.div`
  ${MaterialCard}
  padding: 16px;
`

export const Head = styled(AlignedFlex)`
  margin-bottom: 16px;

  > *:first-child {
    width: 56px;
    height: 56px;
  }
`

export const SpritePortrait = styled(BaseSpriteProtrait)`
  margin-top: -24px;
  margin-left: -24px;
  width: 64px;
  height: 64px;
`

export const HeadInfo = styled.div`
  margin: 0 16px;
  width: 100%;
`

export const Subtitle = styled.span`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.onSurface};
`

export const FavButton = styled(BaseFavButton)`
  align-self: flex-start;
`
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 12px;
`

export const LabeledTextBox = styled(BaseLabeledTextBox)`
  font-size: 14px;
`

export const BattleyeStatus = styled.div<BattleyeStatusStyleProps>`
  margin-right: 4px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: solid 1px #00000020;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.14);
  background-color: ${({ active, theme }) =>
    active ? theme.colors.battleGreen : theme.colors.battleYellow};
`

export const AuctionTimer = styled(BaseAuctionTimer)`
  font-size: 14px;
  *,
  + span {
    font-size: 14px;
  }
`

export const TibiaCoinIcon = styled.img.attrs({
  src: TibiaCoinImage as string,
  alt: 'Tibia Coin',
})`
  margin-right: 4px;
  width: 12px;
  height: 12px;
  transform: translateY(1px);
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.14) 1px 1px 2px 1px;
`
