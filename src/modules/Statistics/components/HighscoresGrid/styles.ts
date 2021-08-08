import styled from 'styled-components'
import { InnerContainer, Smooth } from 'styles'

export const Wrapper = styled.article`
  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  background-color: ${({ theme }) => theme.colors.background};
  ${Smooth}

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 1600px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`

export const PageTitle = styled.h1`
  display: none;
`
