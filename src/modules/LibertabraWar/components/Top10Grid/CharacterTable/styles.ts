import styled from 'styled-components'
import { Table as BaseTable } from 'components/Atoms'

export const Table = styled(BaseTable)`
  ${BaseTable.HeadColumn}, ${BaseTable.Column} {
    &:nth-child(1) {
      width: 16px;
      text-align: center;
    }
    &:nth-child(2) {
      width: 100%;
      padding-left: 8px;
      padding-right: 8px;
      text-align: left;
    }

    &:nth-child(3),
    &:nth-child(4) {
      padding-left: 8px;
      padding-right: 8px;
      width: fit-content;
      text-align: center;
    }
  }

  ${BaseTable.Column} {
    &:nth-child(1) {
      font-size: 10px;
      line-height: 1.6;
      vertical-align: top;
    }
  }
`
