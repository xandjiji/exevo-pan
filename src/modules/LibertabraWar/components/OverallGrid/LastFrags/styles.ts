import styled from 'styled-components'
import { Table as BaseTable } from 'components/Atoms'

export const Table = styled(BaseTable)`
  ${BaseTable.HeadColumn}, ${BaseTable.Column} {
    &:nth-child(1) {
      width: 80px;
      text-align: left;
    }
    &:nth-child(2) {
      padding-left: 16px;
      padding-right: 16px;
      text-align: left;
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

export const CharacterColumn = styled(Table.Column)``

export const CharacterInfo = styled.span`
  margin-top: 6px;
  display: block;
  font-size: 10px;
`
