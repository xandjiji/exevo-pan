import styled from 'styled-components'
import { CustomScrollbar } from 'styles'

export const Wrapper = styled.div`
  height: calc(100% - 44px);
  overflow: auto;
  ${CustomScrollbar}
`
