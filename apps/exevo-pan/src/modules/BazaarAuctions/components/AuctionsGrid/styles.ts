import styled, { css } from 'styled-components'
import BaseCharacterCard from 'components/CharacterCard'
import BaseEmptyState from 'components/EmptyState'
import { Paginator as BasePaginator, ActiveCount } from 'components/Atoms'
import FilterIconSvg from 'assets/svgs/filter.svg'
import { InnerContainer, Shadow, Clickable } from 'styles'

export const Head = styled.div`
  position: sticky;
  top: 0px;
  z-index: 71;
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

export const ActiveIcon = styled(ActiveCount)``

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

export const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Grid = styled.div`
  ${InnerContainer}
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;

  display: grid;
  grid-gap: 16px;
  grid-auto-rows: auto;

  grid-template-columns: repeat(auto-fit, minmax(0, 440px));
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  &::after {
    content: '';
    grid-column: 1 / -1;
  }
`

export const CharacterCard = styled(BaseCharacterCard)`
  height: 100%;

  @media (max-width: 767px) {
    animation: fadeIn 0.2s ease-out;
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`

export const EmptyState = styled(BaseEmptyState)`
  span {
    white-space: unset;
  }
  button {
    white-space: nowrap;
  }
  @media (min-width: 768px) {
    margin-top: calc(25vh - 60px);
    span {
      white-space: nowrap;
      font-size: 32px;
    }
  }
`
