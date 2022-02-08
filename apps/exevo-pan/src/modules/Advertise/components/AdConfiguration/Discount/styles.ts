import styled from 'styled-components'
import { MaterialCard, Shadow, Smooth } from 'styles'
import OfferSvg from 'assets/svgs/offer.svg'

export const TIER_1_WIDTH = '30%'

export const Wrapper = styled.div`
  ${MaterialCard}
  padding: 16px;
  display: grid;
  grid-gap: 16px;

  *[aria-hidden='true'] {
    opacity: 0;
  }
`

export const Title = styled.h2`
  margin-bottom: -4px;
  padding-bottom: 4px;
  display: flex;
  align-items: center;

  font-size: 24px;
  border-bottom: solid 1px var(--separator);
`

export const OfferIcon = styled(OfferSvg)`
  margin-right: 6px;
  fill: var(--onSurface);
`

export const Group = styled.div`
  font-size: 14px;
  display: grid;
  gap: 3px;
`

export const Small = styled.small`
  font-weight: 300;
  ${Smooth}
`

export const Strong = styled.strong`
  margin-bottom: 2px;
  font-size: 19px;
`

export const Striked = styled.del`
  font-size: 14px;
  ${Smooth}
`

export const OfferWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const DiscountTag = styled.span`
  padding: 3px 4px;
  border-radius: 4px;
  background-color: var(--primary);

  font-size: 12px;
  letter-spacing: 0.5px;
  font-weight: 700;
  color: var(--onPrimary);

  ${Shadow}
  ${Smooth}
`

export const Bar = styled.div`
  position: relative;
  width: 200px;
  height: 12px;
  border-radius: 3px;
  background-color: var(--separator);
  overflow: hidden;
`

export const Fill = styled.div`
  width: 30%;
  height: 100%;
  background-color: var(--primaryVariant);

  &[data-tier='2'] {
    width: 60%;
    background-color: var(--primary);

    &[data-progress='3'] {
      width: 75%;
    }

    &[data-progress='4'] {
      width: 85%;
    }
  }

  &[data-tier='3'] {
    width: 100%;
    background-color: var(--green);
  }

  &[data-empty='true'] {
    width: 0%;
  }

  ${Smooth}
`

export const TierSeparator = styled.div`
  position: absolute;
  top: 0;

  width: 3px;
  height: 100%;

  background-color: var(--surface);
`
