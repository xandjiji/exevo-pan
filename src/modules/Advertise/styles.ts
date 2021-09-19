import styled from 'styled-components'
import { CustomScrollbar, InnerContainer, Smooth } from 'styles'

export const Wrapper = styled.main`
  position: relative;

  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;

  max-height: calc(100% - 60px);
  overflow: auto;
  ${CustomScrollbar}

  background-color: var(--background);
  ${Smooth}

  > * {
    margin: 0 auto;
    max-width: 500px;

    &:last-child {
      margin-bottom: 48px;
    }
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
      var(--background),
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
  }

  @media (min-width: 768px) {
    display: flex;
    gap: 24px;
    justify-content: center;

    > * {
      margin: unset;
      height: fit-content;
      width: calc(50% - 12px);
    }
  }
`
