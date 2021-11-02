import styled, { css } from 'styled-components'
import {
  Paginator as BasePaginator,
  LazyRender as BaseLazyRender,
} from 'components/Atoms'
import { CardSkeleton as BaseCardSkeleton } from 'components/CharacterCard'
import FilterIconSvg from 'assets/svgs/filter.svg'
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

export const LazyRender = styled(BaseLazyRender).attrs({
  estimatedHeight: 454,
  mediaQuery: '(min-width: 768px)',
})`
  > * {
    height: 100%;
  }
`

export const CardSkeleton = styled(BaseCardSkeleton)`
  @media (max-width: 767px) {
    &:nth-child(n + 3) {
      display: none;
    }
  }
`
