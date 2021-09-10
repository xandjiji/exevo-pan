import styled, { css } from 'styled-components'
import { MaterialCard, Smooth, Shadow, CustomScrollbar } from 'styles'
import { HeadColumnStyleProps } from './types'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding: 18px 24px;
  overflow: auto;
  ${Smooth}
  ${CustomScrollbar}

  * {
    ${Smooth}
    ${CustomScrollbar}
  }
`

export const CardHead = styled.div`
  padding: 18px 24px;
  margin: -18px -24px 18px -24px;
  width: calc(100% + 48px);
  font-size: 12px;
  font-weight: 300;
  background-color: var(--primary);
  color: var(--onPrimary);
  ${Shadow}
`

export const Title = styled.h4`
  margin-top: 4px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--onPrimary);
`

export const Table = styled.table`
  margin-left: -3px;
  width: calc(100% + 3px);
  border-collapse: collapse;

  caption {
    display: none;
  }
`

export const Row = styled.tr`
  a {
    font-size: 14px;
    font-weight: 400;
    color: var(--primary);
    filter: brightness(130%);
  }
`

export const Head = styled.thead`
  border-bottom: solid 1px var(--separator);
`

export const HeadColumn = styled.th<HeadColumnStyleProps>`
  padding-bottom: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--onSurface);

  ${({ highlighted, desc }) =>
    highlighted &&
    css`
      &::before {
        content: ${desc ? "'▴'" : "'▾'"};
        position: relative;
        top: -1px;
        left: -3px;
      }
    `}
`

export const Body = styled.tbody`
  > *:not(:last-child) {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: var(--separator);
      opacity: 0.3;
    }
  }
`

export const Column = styled.td`
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 14px;
  font-weight: 300;
  color: var(--onSurface);
`
