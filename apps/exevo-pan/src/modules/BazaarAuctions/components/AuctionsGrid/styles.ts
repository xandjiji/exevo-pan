import styled, { css } from 'styled-components'
import { Paginator as BasePaginator } from 'components/Atoms'
import FilterIconSvg from 'assets/svgs/filter.svg'
import { InnerContainer, Shadow, Clickable, Smooth } from 'styles'

export const Main = styled.main``

export const Head = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 70px;
  padding-top: 8px;
  padding-bottom: 8px;

  display: flex;
  align-items: flex-end;
  background-color: var(--surface);
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
  background-color: var(--battleYellow);
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
  fill: var(--onSurface);
`

export const FilterIcon = styled(FilterIconSvg)`
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
