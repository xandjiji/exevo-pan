import styled, { css } from 'styled-components'
import { Paginator as BasePaginator } from 'components/Atoms'
import { ReactComponent as FilterIconSvg } from 'assets/svgs/filter.svg'
import { ReactComponent as SortIconSvg } from 'assets/svgs/sort.svg'
import {
  InnerContainer,
  Shadow,
  Clickable,
  CustomScrollbar,
  Smooth,
} from 'styles'

export const Main = styled.main``

export const Head = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
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

export const ActiveIcon = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.battleYellow};
  ${Shadow}
  ${Smooth}

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;

  &[aria-hidden='true'] {
    opacity: 0;
  }
`

export const IconStyling = css`
  padding: 2px;
  width: 37px;
  height: 37px;
  border-radius: 4px;
  fill: ${({ theme }) => theme.colors.onSurface};
`

export const FilterIcon = styled(FilterIconSvg)`
  ${IconStyling}
`
export const SortIcon = styled(SortIconSvg)`
  ${Clickable}
  ${IconStyling}
`
export const FilterButton = styled.button`
  position: relative;
  ${IconStyling}
  ${Clickable}
  margin-right: 8px;
  padding: 0;

  ${ActiveIcon} {
    position: absolute;
    top: -2px;
    right: -2px;
  }
`

export const Paginator = styled(BasePaginator)`
  margin-left: auto;
`

export const Grid = styled.div`
  padding-top: 16px;
  position: relative;
  height: calc(100% - 70px);
  overflow: auto;
  ${CustomScrollbar}

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
