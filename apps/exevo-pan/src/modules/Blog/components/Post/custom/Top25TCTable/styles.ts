import styled from 'styled-components'

export const ClickableTR = styled.tr`
  cursor: pointer;

  &:hover td:first-child [data-offset='true'] {
    transform: translateX(3px);
  }
`
