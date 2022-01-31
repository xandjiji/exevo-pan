import styled from 'styled-components'
import { Shadow } from 'styles'

export const Wrapper = styled.div<{ estimatedHeight: number }>`
  border-radius: 5px;
  background-color: var(--surface);
  ${Shadow}
  min-height: ${({ estimatedHeight }) => estimatedHeight}px;

  > * {
    margin: 0 auto;
    flex: none;
    flex-shrink: 0;
  }
`
