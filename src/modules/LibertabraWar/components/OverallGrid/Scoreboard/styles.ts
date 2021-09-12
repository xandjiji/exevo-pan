import styled from 'styled-components'
import { MaterialCard, Smooth } from 'styles'

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

  @media (min-width: 768px) {
    flex-direction: unset;
    gap: 132px;
  }

  @media (min-width: 1024px) {
    flex-direction: column;
    gap: 48px;
  }
`
