import styled from 'styled-components'
import { InnerContainer, MaterialCard } from 'styles'

export const Wrapper = styled.section`
  ${InnerContainer}
`
export const Section = styled.div`
  ${MaterialCard}
  ${InnerContainer}
  padding-top: 32px;
  padding-bottom: 32px;
  margin: 0 auto;

  font-size: 16px;
  font-weight: 300;

  @media (min-width: 768px) {
    max-width: 560px;
  }

  @media (min-width: 1024px) {
    padding-left: 40px;
    padding-right: 40px;
    max-width: clamp(45ch, 50%, 75ch);
  }
`
