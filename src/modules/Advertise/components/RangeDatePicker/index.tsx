import { memo, useMemo } from 'react'
import FillDates from './FillDates'
import FillColumns from './FillColumns'
import {
  getDaysUntilAuctionEnd,
  getWeekdayNumber,
  getMonth,
  partitionByMonths,
} from './utils'
import * as S from './styles'
import { RangeDatePickerProps } from './types'

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const months = [
  'Jan',
  'Fev',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Set',
  'Oct',
  'Nov',
  'Dec',
]

const RangeDatePicker = ({
  auctionEnd,
  ...props
}: RangeDatePickerProps): JSX.Element => {
  const days = useMemo(() => getDaysUntilAuctionEnd(auctionEnd), [auctionEnd])
  const firstDay = days[0]
  const partitionedDates = useMemo(() => partitionByMonths(days), [days])

  return (
    <S.Wrapper {...props}>
      <S.MonthName>Setembro</S.MonthName>
      <S.CalendarGrid>
        {weekdays.map((weekday) => (
          <S.Weekday>{weekday}</S.Weekday>
        ))}

        <FillDates
          firstDay={firstDay}
          amount={getWeekdayNumber(firstDay)}
          step={-1}
        />

        {partitionedDates.map((monthDates, index) => {
          const monthDatesElements = monthDates.map((dates) => (
            <S.Day>{new Date(dates).getDate()}</S.Day>
          ))

          const hasNextMonth = index + 1 !== partitionedDates.length
          const currentMonthLastDay = monthDates[monthDates.length - 1]
          const currentMonthLastWeekday = getWeekdayNumber(currentMonthLastDay)

          return (
            <>
              {monthDatesElements}
              {hasNextMonth && (
                <S.MonthRow>{months[getMonth(monthDates[0]) + 1]}</S.MonthRow>
              )}
              {!hasNextMonth && (
                <FillDates
                  firstDay={currentMonthLastDay}
                  amount={6 - currentMonthLastWeekday}
                  step={1}
                />
              )}
              {hasNextMonth && (
                <FillColumns amount={currentMonthLastWeekday + 1} />
              )}
            </>
          )
        })}
      </S.CalendarGrid>
    </S.Wrapper>
  )
}

export default memo(RangeDatePicker)
