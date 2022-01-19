import styled from 'styled-components'
import { InnerContainer } from 'styles'
import BaseHero from '../Hero'
import BaseNewsletter from '../Newsletter'

export const Wrapper = styled.main`
  ${InnerContainer}

  display: grid;
  grid-template-columns: 224px 1fr 320px;
  align-items: start;
  grid-gap: 32px;
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

export const Newsletter = styled(BaseNewsletter)`
  position: sticky;
  top: 120px;
`
