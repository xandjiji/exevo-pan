import styled from 'styled-components'
import { InnerContainer } from 'styles'

export const Wrapper = styled.main`
  ${InnerContainer}

  display: grid;
  grid-template-columns: 224px 1fr 320px;
  align-items: start;
  grid-gap: 32px;
`
