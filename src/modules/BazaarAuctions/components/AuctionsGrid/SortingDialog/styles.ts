import styled from 'styled-components'
import SortIconSvg from 'assets/svgs/sort.svg'
import { Clickable } from 'styles'
import { IconStyling } from '../styles'

export const SortIcon = styled(SortIconSvg)`
  ${Clickable}
  ${IconStyling}
  vertical-align: middle;
`

export const Dialog = styled.div`
  > *:not(:last-child) {
    margin-bottom: 12px;
  }
  > *:first-child {
    margin-bottom: 16px;
  }
`
