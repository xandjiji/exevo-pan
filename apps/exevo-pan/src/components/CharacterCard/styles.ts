import styled from 'styled-components'
import {
  LabeledTextBox as BaseLabeledTextBox,
  AuctionTimer as BaseAuctionTimer,
  Checkbox as BaseCheckbox,
} from 'components/Atoms'
import Image from 'next/image'
import { MaterialCard } from 'styles'
import TibiaCoinImage from 'assets/tibiacoin.png'

export const Wrapper = styled.article`
  ${MaterialCard}
  padding: 16px;

  &:hover {
    position: relative;
    z-index: 5;
  }

  &[data-highlighted='true'] {
    --surface: var(--kwaiSurface);
    --primary: var(--kwai);
    --primaryVariant: var(--kwaiVariant);

    z-index: 2;

    @media (min-width: 768px) {
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
    }
  }
`

export const InfoGrid = styled.div`
  margin-bottom: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 12px;
`

export const LabeledTextBox = styled(BaseLabeledTextBox)`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
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
  unoptimized: true,
})`
  width: 12px;
  height: 12px;
`

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`

export const FlexFooter = styled.div`
  padding-top: 12px;
  border-top: solid 1px var(--separator);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
`

export const FlexColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;

  > * {
    width: fit-content;
  }
`

export const Checkbox = styled(BaseCheckbox)`
  &:checked {
    background-color: var(--primary);
    border-color: var(--primary);
  }
`

export const CheckboxContainer = styled.div`
  width: 16px;
  height: 16px;
  display: grid;
  place-items: center;
`

export const Strong = styled.span`
  &[data-has-investment='true'] {
    color: var(--primary);
    filter: brightness(130%);
    font-weight: 700;
  }
`

export const Body = styled.div`
  margin-bottom: 12px;
`
