import styled from 'styled-components'
import { InnerContainer, CustomScrollbar, Smooth, Spinner } from 'styles'

export const Wrapper = styled.article`
  position: relative;

  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;

  max-height: calc(100% - 44px);
  overflow: auto;
  ${CustomScrollbar}

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 24px;

  background-color: var(--background);
  ${Smooth}

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
      var(--background),
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
  }

  &::after {
    content: '';
    grid-column: 1 / -1;
    height: 24px;
  }
`

export const PageTitle = styled.h2`
  display: none;
`

export const Loading = styled(Spinner)`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
`
