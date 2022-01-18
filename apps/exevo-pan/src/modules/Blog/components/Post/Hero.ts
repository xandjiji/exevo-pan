import styled from 'styled-components'
import { Hero as BaseHero } from '..'

const Hero = styled(BaseHero)`
  margin-top: 42px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`

export default Hero
