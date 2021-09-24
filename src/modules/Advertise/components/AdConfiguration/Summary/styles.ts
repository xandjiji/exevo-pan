import styled from 'styled-components'
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
  font-size: 16px;
  letter-spacing: 0.5px;
`

export const SubText = styled.p`
  font-size: 12px;
  font-weight: 300;
`
