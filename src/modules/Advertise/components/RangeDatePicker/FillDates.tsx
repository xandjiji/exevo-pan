import { FillDay } from './styles'
import { fillWithDays, getDay } from './utils'

interface FillDatesProps {
  firstDay: string
  amount: number
  step: 1 | -1
}

const FillDates = ({ firstDay, amount, step }: FillDatesProps): JSX.Element => (
  <>
    {fillWithDays(firstDay, amount, step).map((fillDay) => (
      <FillDay key={fillDay}>{getDay(fillDay)}</FillDay>
    ))}
  </>
)
export default FillDates
