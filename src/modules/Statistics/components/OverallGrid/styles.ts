import styled from 'styled-components'
import { CustomScrollbar, InnerContainer, Smooth } from 'styles'

export const Wrapper = styled.div`
  ${InnerContainer}
  padding-top: 16px;
  max-height: calc(100% - 44px);
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.background};
  ${CustomScrollbar}
  ${Smooth}
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
