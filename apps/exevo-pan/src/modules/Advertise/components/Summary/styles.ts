import styled from 'styled-components'
import { Tooltip as BaseTooltip } from 'components/Organisms'
import ReceiptSvg from 'assets/svgs/receipt.svg'
import { MaterialCard } from 'styles'

export const Wrapper = styled.section`
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

export const ReceiptIcon = styled(ReceiptSvg)`
  margin-right: 6px;
  fill: var(--onSurface);
`

export const GroupItem = styled.div``

export const Strong = styled.h3`
  margin-bottom: 2px;
  font-size: 16px;
  letter-spacing: 0.5px;
`

export const AuctionLink = styled.a`
  position: relative;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 1px;
  color: var(--onSurface);
`

export const SubText = styled.p`
  font-size: 12px;
  font-weight: 300;
`

export const Highlight = styled(Strong)`
  display: inline;
  border-bottom: dashed 1px var(--onSurface);
`

export const Tooltip = styled(BaseTooltip)`
  width: 160px;
  text-align: left;
`

export const TooltipTitle = styled.p`
  margin-bottom: 8px;
  font-weight: 700;
`

export const AllDates = styled.ul`
  display: grid;
  grid-gap: 3px;
`

export const FullDate = styled.li`
  &::before {
    content: '·';
    margin-right: 3px;
    font-weight: 700;
  }
`
