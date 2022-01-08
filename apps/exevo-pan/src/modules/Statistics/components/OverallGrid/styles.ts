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

  > * {
    margin-bottom: 16px;
  }
`

export const PageTitle = styled.h2`
  display: none;
`

export const GridRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

export const ItemWrapper = styled(GridRow)`
  > * {
    width: 100%;
  }

  @media (min-width: 768px) {
    > *:first-child {
      width: 240px;
    }

    > *:last-child {
      width: calc(100% - 240px - 16px);
    }
  }
`

export const ChartWrapper = styled(GridRow)`
  @media (min-width: 768px) {
    > * {
      width: calc(50% - 8px);
    }
  }
`
