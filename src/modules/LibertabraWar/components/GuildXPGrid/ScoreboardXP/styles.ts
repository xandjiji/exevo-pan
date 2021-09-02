import styled from 'styled-components'
import { MaterialCard } from 'styles'
import BaseGuildSummary from '../../GuildSummary'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding: 20px;
  text-align: center;
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
  @media (min-width: 1400px) {
    margin-left: -80px;
  }

  h4 + span {
    display: block;
    margin-bottom: 4px;
    font-size: 16px;

    &::before {
      content: '${({ winning }) => (winning ? '+' : '-')}';
    }

    span {
      font-size: 10px;
    }

    @media (min-width: 420px) {
      font-size: 20px;
      span {
        font-size: 12px;
      }
    }

    @media (min-width: 460px) {
      font-size: 24px;
      span {
        font-size: 12px;
      }
    }

    @media (min-width: 560px) {
      font-size: 32px;
      span {
        font-size: 14px;
      }
    }

    @media (min-width: 660px) {
      font-size: 40px;
      span {
        font-size: 14px;
      }
    }

    @media (min-width: 660px) {
      font-size: 40px;
      span {
        font-size: 14px;
      }
    }

    @media (min-width: 1024px) {
      font-size: 54px;
      span {
        font-size: 16px;
      }
    }
  }
`
