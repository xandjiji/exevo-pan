import styled from 'styled-components'
import { MaterialCard } from 'styles'

export const Wrapper = styled.div`
  ${MaterialCard}
  padding: 20px 16px 20px 26px;
  width: 100%;

  @media (min-width: 768px) {
    width: calc(50% - 8px);
  }

  canvas {
    margin-left: -6px;
  }
`

export const SummaryWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: 48px;
  }
`

export const ChartWrapper = styled.div`
  width: 100%;
  height: 260px;
`

export const ChipWrapper = styled.div`
  margin-top: 22px;
  display: flex;

  > *:not(:last-child) {
    margin-right: 8px;
  }
`
