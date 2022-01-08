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

export const Day = styled.button`
  padding: 8px 4px;

  font-size: 16px;
  color: var(--onSurface);

  border-radius: 5px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.09);
  cursor: pointer;
  ${Smooth}

  &:hover {
    ${Shadow}
  }

  &:active {
    box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14);
  }

  &[aria-selected='true'] {
    background-color: var(--primaryVariant);
  }
`

export const MonthRow = styled.span`
  padding: 8px 0 4px 0;
  margin-bottom: -6px;
  grid-column: 1 / -1;
  color: var(--separator);
`

export const Subtext = styled.p`
  margin-top: -12px;
  font-size: 10px;
  letter-spacing: 0.2px;
`
