import styled from 'styled-components'
import { MaterialCard, Smooth } from 'styles'
import { PercentageStyleProps } from './types'

export const Wrapper = styled.div`
  ${MaterialCard}
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${Smooth}

  @media (max-width: 440px) {
    width: 100%;
    align-items: center;
  }
`

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.onSurface};
`

export const Percentage = styled.span<PercentageStyleProps>`
  font-size: 46px;
  font-weight: 700;
  color: ${({ theme, positive }) =>
    positive ? theme.colors.green : theme.colors.red};
`
