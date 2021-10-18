import styled from 'styled-components'
import { MaterialCard } from 'styles'

export const Wrapper = styled.div`
  ${MaterialCard}
  padding: 0;
  overflow: hidden;

  > *:not(:last-child) {
    border-bottom: solid 1px var(--separator);
  }
`
