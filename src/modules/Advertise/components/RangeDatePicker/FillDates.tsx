import { memo } from 'react'
import styled from 'styled-components'
import { Day } from './styles'
import { fillWithDays, getDay } from './utils'

interface FillDatesProps {
  firstDay: string
  amount: number
  step: 1 | -1
}

const FillDay = styled(Day)`
  font-weight: 300;
  color: var(--separator);
  cursor: unset;

  && {
    box-shadow: none;
  }
`

const FillDates = ({ firstDay, amount, step }: FillDatesProps): JSX.Element => (
  <>
    {fillWithDays(firstDay, amount, step).map((fillDay) => (
      <FillDay key={fillDay}>{getDay(fillDay)}</FillDay>
    ))}
  </>
)
export default memo(FillDates)
