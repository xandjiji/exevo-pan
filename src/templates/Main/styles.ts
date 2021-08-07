import styled from 'styled-components'
import { CustomScrollbar } from 'styles'

export const Wrapper = styled.div`
  main {
    height: calc(100vh - 60px);
    overflow: auto;
    ${CustomScrollbar}
  }
`
