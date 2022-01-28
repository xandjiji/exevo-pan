import styled from 'styled-components'
import { InnerContainer } from 'styles'

export const Wrapper = styled.article`
  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;
  display: grid;
  grid-gap: 16px;
  overflow: hidden;
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
