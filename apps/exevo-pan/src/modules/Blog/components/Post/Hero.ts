import styled from 'styled-components'
import BaseHero from '../Hero'

const Hero = styled(BaseHero)`
  margin-top: 42px;
  @media (max-width: 1023px) {
    padding-bottom: 0;
  }

  @media (min-width: 1024px) {
    margin-top: 0;
  }
`

export default Hero
