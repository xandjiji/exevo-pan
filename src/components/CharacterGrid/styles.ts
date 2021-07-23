import styled, { css } from 'styled-components'
import { Paginator as BasePaginator } from 'components/Atoms'
import { ReactComponent as FilterIconSvg } from 'assets/svgs/filter.svg'
import { ReactComponent as SortIconSvg } from 'assets/svgs/sort.svg'
import { InnerContainer, Shadow, Clickable } from 'styles'

export const Wrapper = styled.div``

export const Head = styled.div`
  position: fixed;
  top: 60px;
  width: 100%;
  z-index: 55;
  padding-top: 8px;
  padding-bottom: 8px;

  display: flex;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.colors.surface};
  user-select: none;

  ${InnerContainer}
  ${Shadow}
`

const IconStyling = css`
  padding: 2px;
  width: 37px;
  height: 37px;
  border-radius: 4px;
  fill: ${({ theme }) => theme.colors.onSurface};
`

export const FilterIcon = styled(FilterIconSvg)`
  margin-right: 8px;
  ${Clickable}
  ${IconStyling}
`
export const SortIcon = styled(SortIconSvg)`
  ${Clickable}
  ${IconStyling}
`

export const Paginator = styled(BasePaginator)`
  margin-left: auto;
`
