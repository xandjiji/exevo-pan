import styled from 'styled-components'
import { Smooth } from 'styles'

export const Wrapper = styled.div`
  text-align: center;
  line-height: 0.7;

  > * {
    margin: 0 -16px;
  }

  svg {
    fill: #fff;
    fill: var(--surface);
  }
`

export const Content = styled.div`
  background-color: #fff;
  background-color: var(--surface);
  ${Smooth}
`
