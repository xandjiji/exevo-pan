import styled from 'styled-components'
import { MaterialCard, Shadow } from 'styles'
import OfferSvg from 'assets/svgs/offer.svg'

export const Wrapper = styled.div`
  ${MaterialCard}
  padding: 16px;
  display: grid;
  grid-gap: 16px;
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
`

export const OfferWrapper = styled(Group)`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const Strong = styled.strong`
  margin-bottom: 2px;
  font-size: 19px;
`

export const Striked = styled.del`
  font-size: 14px;
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
`
