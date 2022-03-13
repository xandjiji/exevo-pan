import styled from 'styled-components'
import { Table as BaseTable } from 'components/Atoms'

export const Wrapper = styled.div`
  position: relative;
`

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

export const ObserverElement = styled.div`
  position: absolute;
  bottom: 440px;
  left: 0;
  z-index: 1;
`
