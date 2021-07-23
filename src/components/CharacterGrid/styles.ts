import styled, { css } from 'styled-components'
import { Paginator as BasePaginator } from 'components/Atoms'
import { ReactComponent as FilterIconSvg } from 'assets/svgs/filter.svg'
import { ReactComponent as SortIconSvg } from 'assets/svgs/sort.svg'
import { InnerContainer, Shadow, Clickable, CustomScrollbar } from 'styles'

export const Wrapper = styled.div`
  height: calc(100vh - 60px);
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.background};

  ${CustomScrollbar}
`

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

  @media(min-width: 768px) {
    align-items: center;
  }
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

export const Grid = styled.main`
  margin-top: 70px;
  padding-top: 16px;
  position: relative;

  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-auto-rows: auto;

  background-color: ${({ theme }) => theme.colors.background};

  &::after {
    content: '';
    grid-column: 1 / -1;
    height: 48px;
  }

  &::before {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 72px;
    background-image: linear-gradient(
      to top,
      ${({ theme }) => theme.colors.background},
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
  }

  ${InnerContainer}
`
