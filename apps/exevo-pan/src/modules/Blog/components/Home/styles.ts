import styled from 'styled-components'
import { InnerContainer } from 'styles'
import BaseHero from '../Hero'

export const Wrapper = styled.main`
  ${InnerContainer}
  padding-bottom: 32px;

  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 1024px) {
    flex-direction: row-reverse;
  }
`

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 1024px) {
    position: sticky;
    top: 120px;
    flex-shrink: 0;
    height: min-content;
  }
`

export const Hero = styled(BaseHero)`
  h1 {
    font-size: 48px;
  }

  @media (min-width: 768px) {
    .hero-image {
      margin-left: -112px;
    }

    h1 {
      font-size: 64px;
    }
  }
`
