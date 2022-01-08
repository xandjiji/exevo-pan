import styled from 'styled-components'
import { CustomScrollbar, Smooth } from 'styles'

export const Wrapper = styled.div`
  main {
    height: calc(100vh - 60px);
    overflow: auto;
    background-color: var(--background);
    scroll-behavior: smooth;
    ${CustomScrollbar}
    ${Smooth}
  }
`
