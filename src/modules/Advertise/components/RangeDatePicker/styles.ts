import styled from 'styled-components'
import { Shadow, Smooth } from 'styles'

export const Wrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  ${Shadow}
`

export const MonthName = styled.p`
  padding: 12px 8px;
  background-color: var(--primary);

  text-align: center;
  font-size: 24px;
  letter-spacing: 0.5px;
  color: var(--onPrimary);
`

export const CalendarGrid = styled.div`
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 6px;

  background-color: var(--surface);
  text-align: center;
`
export const Weekday = styled.span`
  margin-bottom: 6px;
  color: var(--separator);
`

export const Day = styled.span`
  padding: 8px 4px;

  font-size: 16px;

  border-radius: 5px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.09);
  cursor: pointer;
  ${Smooth}

  &:hover {
    ${Shadow}
  }
`
