import styled, { css } from 'styled-components'
import { MaterialCard, Shadow } from 'styles'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding: 0 24px 18px 24px;
  overflow: hidden;
`

export const CardHead = styled.div`
  padding: 18px 24px;
  margin: 0 -24px 18px -24px;
  width: calc(100% + 48px);
  font-size: 12px;
  font-weight: 300;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  ${Shadow}
`

export const Title = styled.h2`
  margin-top: 4px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.onPrimary};
`

export const Table = styled.table`
  margin-left: -3px;
  width: calc(100% + 3px);
  border-collapse: collapse;
`

export const Caption = styled.caption`
  display: none;
`

export const TableHead = styled.thead`
  border-bottom: solid 1px ${({ theme }) => theme.colors.separator};
`

export const ListHead = styled.div`
  padding-bottom: 8px;
  display: flex;
  border-bottom: solid 1px ${({ theme }) => theme.colors.separator};

  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.onSurface};
`

const CellLayout = css`
  &:nth-child(1) {
    width: 16px;
    text-align: center;
  }
  &:nth-child(2) {
    padding-left: 8px;
    padding-right: 8px;
    text-align: left;
  }
  &:nth-child(3) {
    width: 80px;
    text-align: right;
  }
`

export const HeadItem = styled.th`
  padding-bottom: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onSurface};

  ${CellLayout}
`

export const RowItem = styled.td`
  padding-top: 6px;
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.onSurface};

  ${CellLayout}
`

export const Link = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
  filter: brightness(130%);
`
