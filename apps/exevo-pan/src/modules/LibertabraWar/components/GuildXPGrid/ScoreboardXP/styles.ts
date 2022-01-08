import styled from 'styled-components'
import { MaterialCard, Smooth } from 'styles'
import BaseGuildSummary from '../../GuildSummary'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding: 20px;
  text-align: center;
  ${Smooth}
`

export const GuildWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  @media (min-width: 1400px) {
    justify-content: space-around;
    flex-direction: row;
  }
`

export const GuildSummary = styled(BaseGuildSummary)`
  h4 + span {
    display: block;
    margin-bottom: 4px;
    font-size: 24px;

    @media (min-width: 420px) {
      font-size: 32px;
    }

    @media (min-width: 768px) {
      font-size: 54px;
    }

    @media (min-width: 1024px) {
      font-size: 60px;
    }
  }
`
