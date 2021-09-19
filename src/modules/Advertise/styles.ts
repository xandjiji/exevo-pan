import styled from 'styled-components'
import { CustomScrollbar, InnerContainer, Smooth } from 'styles'

export const Wrapper = styled.main`
  position: relative;

  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;
  margin: 0 auto;

  max-height: calc(100% - 60px);
  max-width: 500px;
  overflow: auto;
  ${CustomScrollbar}

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

  > *:last-child {
    margin-bottom: 48px;
  }

  @media (min-width: 768px) {
    display: flex;
    gap: 24px;
    max-width: 1200px;

    > * {
      height: fit-content;
      width: calc(50% - 12px);
    }
  }
`
