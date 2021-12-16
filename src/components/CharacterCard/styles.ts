import styled, { css } from 'styled-components'
import {
  SpritePortrait as BaseSpriteProtrait,
  LabeledTextBox as BaseLabeledTextBox,
  AuctionTimer as BaseAuctionTimer,
} from 'components/Atoms'
import Image from 'next/image'
import { MaterialCard } from 'styles'
import TibiaCoinImage from 'assets/tibiacoin.png'
import { BattleyeStatusStyleProps } from './types'

export const AlignedFlex = styled.div`
  display: flex;
  align-items: center;
`

export const Wrapper = styled.div<{ highlighted: boolean }>`
  ${MaterialCard}
  padding: 16px;

  &:hover {
    position: relative;
    z-index: 5;
  }

  ${({ highlighted }) =>
    highlighted &&
    css`
      --surface: var(--kwaiSurface);
      --primary: var(--kwai);
      --primaryVariant: var(--kwaiVariant);

      z-index: 2;

      animation: zoom 0.6s ease-out forwards;
      animation-delay: 1s;

      @keyframes zoom {
        0% {
          transform: scale(1);
        }
        20% {
          transform: scale(1.02);
          box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.1);
        }
        80% {
          transform: scale(1.02);
          box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.1);
        }
        100% {
          transform: scale(1);
        }
      }
    `}
`

export const Head = styled(AlignedFlex)`
  margin-bottom: 16px;

  > *:first-child {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
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
  color: var(--onSurface);
`

export const InfoGrid = styled.div`
  margin-bottom: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 12px;
`

export const LabeledTextBox = styled(BaseLabeledTextBox)`
  font-size: 14px;

  > div {
    margin-right: 4px !important;
  }
`

export const BattleyeStatus = styled.div<BattleyeStatusStyleProps>`
  margin-right: 4px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: solid 1px #00000020;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.14);
  background-color: ${({ active }) =>
    active ? 'var(--battleGreen)' : 'var(--battleYellow)'};
`

export const AuctionTimer = styled(BaseAuctionTimer)`
  font-size: 14px;
  *,
  + span {
    font-size: 14px;
  }
`

export const TibiaCoinIcon = styled(Image).attrs({
  src: TibiaCoinImage,
  alt: 'Tibia Coin',
})`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transform: translateY(1px);
`

export const Footer = styled.div`
  padding-top: 12px;
  border-top: solid 1px var(--separator);

  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;

  > * {
    width: fit-content;
  }
`
