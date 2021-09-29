import styled from 'styled-components'
import SuccessSvg from 'assets/svgs/check.svg'
import { MaterialCard } from 'styles'

export const Wrapper = styled.section`
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
