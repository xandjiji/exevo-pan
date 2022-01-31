import styled from 'styled-components'
import { Shadow } from 'styles'

export const Wrapper = styled.div`
  border-radius: 5px;
  background-color: var(--surface);
  ${Shadow}

  > * {
    margin: 0 auto;
    flex: none;
    flex-shrink: 0;
  }
`
