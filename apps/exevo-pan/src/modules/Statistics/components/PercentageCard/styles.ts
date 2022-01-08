import styled from 'styled-components'
import { MaterialCard, Smooth } from 'styles'
import { PercentageStyleProps } from './types'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  ${Smooth}
`

export const Title = styled.h4`
  font-size: 16px;
  font-weight: 300;
  color: var(--onSurface);
`

export const Percentage = styled.span<PercentageStyleProps>`
  font-size: 46px;
  font-weight: 700;
  color: ${({ positive }) => (positive ? 'var(--green)' : 'var(--red)')};
`
