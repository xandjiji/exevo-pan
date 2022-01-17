import styled from 'styled-components'
import { CustomScrollbar } from 'styles'

const Wrapper = styled.div`
  overflow: auto;
  ${CustomScrollbar}
`

const BaseTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    border-bottom: solid 1px var(--separator);
  }

  th {
    padding-bottom: 6px;
    font-size: 16px;
    font-weight: 700;
    color: var(--onSurface);
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
  }

  td {
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 14px;
    font-weight: 300;
    color: var(--onSurface);
  }
`

export const Table = (
  props: React.HTMLAttributes<HTMLTableElement>,
): JSX.Element => (
  <Wrapper>
    <BaseTable {...props} />
  </Wrapper>
)
