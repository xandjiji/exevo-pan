import styled from 'styled-components'
import { Smooth } from 'styles'

export const Wrapper = styled.div`
  text-align: center;
  line-height: 0.7;

  > * {
    margin: 0 -16px;
  }

  svg {
    margin-top: -2px;
    margin-bottom: -2px;
    fill: var(--surface);
    ${Smooth}
  }
`

export const Content = styled.div`
  background-color: #fff;
  background-color: var(--surface);
  ${Smooth}
`
