import styled from 'styled-components'
import { CustomScrollbar, InnerContainer, Smooth } from 'styles'

export const Wrapper = styled.article`
  position: relative;

  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;

  max-height: calc(100% - 44px);
  overflow: auto;
  ${CustomScrollbar}

  background-color: var(--background);
  ${Smooth}

  > * {
    margin-bottom: 16px;
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
`

export const PageTitle = styled.h2`
  display: none;
`

export const FirstRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  > * {
    width: 100%;
  }
`
