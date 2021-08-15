import styled from 'styled-components'
import { MaterialCard, Smooth } from 'styles'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding: 20px;
  width: calc(100% - 210px);
  ${Smooth}

  @media (max-width: 440px) {
    width: 100%;
  }
`

export const Title = styled.h2`
  margin-bottom: 8px;
  font-weight: 300;
  text-align: center;
  color: var(--onSurface);
  font-size: 16px;
`

export const ChartWrapper = styled.div`
  width: 100%;
`
