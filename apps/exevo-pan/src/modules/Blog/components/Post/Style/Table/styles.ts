import styled from 'styled-components'
import { CustomScrollbar, Smooth } from 'styles'

export const Wrapper = styled.div`
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 6px 6px 0 0;
  overflow: auto;
  ${CustomScrollbar}
  ${Smooth}
* {
    ${Smooth}
  }
`

export const BaseTable = styled.table`
  max-width: 100%;
  border-collapse: collapse;

  thead {
    border-bottom: solid 1px var(--separator);
  }

  th,
  td {
    padding: 8px;

    vertical-align: middle;

    * {
      vertical-align: middle;
    }
  }

  th {
    font-size: 16px;
    font-weight: 400;
    color: var(--onPrimary);
    background-color: var(--primary);
  }

  tbody {
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

    tr:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  td {
    font-size: 14px;
    font-weight: 300;
    color: var(--onSurface);
  }
`
