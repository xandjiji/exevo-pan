import styled from 'styled-components'
import { InnerContainer, CustomScrollbar, Smooth } from 'styles'

export const Wrapper = styled.article`
  position: relative;

  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;

  max-height: calc(100% - 44px);
  overflow: auto;
  ${CustomScrollbar}

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

  &::before {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 72px;
    background-image: linear-gradient(
      to top,
      ${({ theme }) => theme.colors.background},
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
  }
`

export const PageTitle = styled.h1`
  display: none;
`
