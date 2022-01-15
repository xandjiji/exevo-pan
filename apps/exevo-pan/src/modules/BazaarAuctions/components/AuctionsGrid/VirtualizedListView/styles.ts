import styled from 'styled-components'
import { InnerContainer } from 'styles'

export const Grid = styled.div`
  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;

  display: grid;
  grid-gap: 16px;
  grid-auto-rows: auto;

  grid-template-columns: repeat(auto-fit, minmax(0, 440px));
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
`
