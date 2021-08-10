import styled from 'styled-components'
import { CustomScrollbar, InnerContainer, Smooth, Spinner } from 'styles'

export const Wrapper = styled.article`
  position: relative;

  ${InnerContainer}
  padding-top: 16px;

  max-height: calc(100% - 44px);
  overflow: auto;
  ${CustomScrollbar}

  background-color: ${({ theme }) => theme.colors.background};
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
      ${({ theme }) => theme.colors.background},
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
  }
`

export const PageTitle = styled.h1`
  display: none;
`

export const Loading = styled(Spinner)`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
`

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  > * {
    margin-bottom: 16px;
  }
`

export const ChartWrapper = styled(ItemWrapper)`
  @media (min-width: 768px) {
    > * {
      width: calc(50% - 8px);
    }
  }
`
