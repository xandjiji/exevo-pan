import { memo } from 'react'
import { Day } from './atoms'
import { fillWithDays } from './utils'

interface FillDatesProps {
  firstDay: Date
  amount: number
  step: 1 | -1
}

const FillDates = ({ firstDay, amount, step }: FillDatesProps) => (
  <>
    {fillWithDays(firstDay, amount, step).map((fillDay) => (
      <Day key={+fillDay} disabled tabIndex={-1}>
        {fillDay.getDate()}
      </Day>
    ))}
  </>
)
export default memo(FillDates)
