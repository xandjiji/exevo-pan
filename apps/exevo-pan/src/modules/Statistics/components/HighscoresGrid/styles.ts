import styled from 'styled-components'
import { InnerContainer } from 'styles'

export const Wrapper = styled.article`
  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 24px;
`

export const PageTitle = styled.h2`
  display: none;
`
