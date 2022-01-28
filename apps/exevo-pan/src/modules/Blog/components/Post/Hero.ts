import styled from 'styled-components'
import BaseHero from '../Hero'

const Hero = styled(BaseHero)`
  margin-top: 42px;

  @media (min-width: 768px) {
    margin-top: 0;
    padding-bottom: 32px;
  }

  @media (min-width: 1024px) {
    padding-bottom: 96px;
  }
`

export default Hero
