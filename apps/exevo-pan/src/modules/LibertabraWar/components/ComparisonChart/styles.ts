import styled from 'styled-components'
import { MaterialCard, Smooth } from 'styles'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding: 20px 16px 86px 26px;
  ${Smooth}
  height: 500px;

  canvas {
    margin-left: -10px;
  }
`

export const SummaryWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 24px;

  @media (min-width: 768px) {
    gap: 36px;
  }
`

export const GuildSummary = styled.div`
  color: var(--onSurface);
`

export const GuildName = styled.span`
  margin-bottom: 6px;
  display: block;
  font-size: 14px;
  font-weight: 400;
`

export const OnlineCount = styled.span`
  display: block;
  font-size: 20px;
  font-weight: 700;
`
