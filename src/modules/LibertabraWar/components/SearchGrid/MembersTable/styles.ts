import styled from 'styled-components'
import { Table as BaseTable, Input as BaseInput } from 'components/Atoms'

export const Table = styled(BaseTable)`
  ${BaseTable.HeadColumn}, ${BaseTable.Column} {
    &:nth-child(1) {
      width: 100%;
      padding-left: 8px;
      padding-right: 8px;
      text-align: left;
    }

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      padding-left: 8px;
      padding-right: 8px;
      min-width: 50px;
      text-align: center;
    }

    &:nth-child(2) {
      min-width: 64px;
    }
  }

  ${BaseTable.Column} {
    &:nth-child(2) {
      font-size: 10px;
    }
  }
`

export const ControlHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

export const Input = styled(BaseInput)`
  max-width: 200px;
  [role='alert'] {
    display: none;
  }
`
