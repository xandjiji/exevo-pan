import styled from 'styled-components'
import { ReactComponent as SortIconSvg } from 'assets/svgs/sort.svg'
import { Clickable } from 'styles'
import { IconStyling } from '../styles'

export const SortIcon = styled(SortIconSvg)`
  ${Clickable}
  ${IconStyling}
`

export const Dialog = styled.div`
  > *:not(:last-child) {
    margin-bottom: 16px;
  }
`
