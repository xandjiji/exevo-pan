import styled from 'styled-components'

export const Wrapper = styled.div<{ estimatedHeight: number }>`
  min-height: ${({ estimatedHeight }) => estimatedHeight}px;

  > * {
    margin: 0 auto;
    flex: none;
    flex-shrink: 0;
  }
`
