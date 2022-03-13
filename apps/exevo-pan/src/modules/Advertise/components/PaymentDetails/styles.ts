import styled from 'styled-components'
import SuccessSvg from 'assets/svgs/check.svg'
import { MaterialCard } from 'styles'

export const Wrapper = styled.section`
  display: grid;
  grid-gap: 24px;
`

export const TransactionInformation = styled.section`
  ${MaterialCard}
  padding: 16px;
  display: grid;
  grid-gap: 24px;
`

export const Title = styled.h2`
  margin-bottom: -4px;
  padding-bottom: 4px;
  display: flex;
  align-items: center;

  font-size: 24px;
  border-bottom: solid 1px var(--separator);
`

export const ReceiptIcon = styled(SuccessSvg)`
  margin-right: 6px;
  fill: var(--primary);
`

export const Text = styled.p`
  font-size: 14px;
  line-height: 1.6;
`

export const Strong = styled.strong`
  color: var(--primary);
  letter-spacing: 0.5px;
  filter: brightness(130%);
`

export const Small = styled.span`
  font-size: 10px;
  letter-spacing: 0.2px;
`
