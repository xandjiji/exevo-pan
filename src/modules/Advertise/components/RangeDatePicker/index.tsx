import { Fragment, memo, useMemo, useState, useCallback } from 'react'
import Weekdays from './Weekdays'
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
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const RangeDatePicker = ({
  auctionEnd,
  ...props
}: RangeDatePickerProps): JSX.Element => {
  const [selectedDates, setSelectedDates] = useState(new Set<string>([]))

  const days = useMemo(() => getDaysUntilAuctionEnd(auctionEnd), [auctionEnd])
  const partitionedDates = useMemo(() => partitionByMonths(days), [days])
  const firstDay = days[0]

  const toggleDate = useCallback(
    (date: string) =>
      setSelectedDates((currentDates) => {
        const newSet = new Set([...currentDates])
        if (currentDates.has(date)) {
          newSet.delete(date)
        } else {
          newSet.add(date)
        }
        return newSet
      }),
    [],
  )

  return (
    <S.Wrapper {...props}>
      <S.MonthName aria-label="Current month">Setembro</S.MonthName>
      <S.CalendarGrid>
        <Weekdays />

        <FillDates
          firstDay={firstDay}
          amount={getWeekdayNumber(firstDay)}
          step={-1}
        />

        {partitionedDates.map((monthDates, index) => {
          const monthDatesElements = monthDates.map((date) => (
            <S.Day
              key={date}
              aria-label={date}
              aria-selected={selectedDates.has(date)}
              onClick={() => toggleDate(date)}
            >
              {new Date(date).getDate()}
            </S.Day>
          ))

          const hasNextMonth = index + 1 !== partitionedDates.length
          const currentMonthLastDay = monthDates[monthDates.length - 1]
          const currentMonthLastWeekday = getWeekdayNumber(currentMonthLastDay)

          return (
            <Fragment key={`month-${currentMonthLastDay}`}>
              {monthDatesElements}
              {hasNextMonth && (
                <S.MonthRow aria-label="Next month">
                  {months[getMonth(monthDates[0]) + 1]}
                </S.MonthRow>
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
            </Fragment>
          )
        })}
      </S.CalendarGrid>
    </S.Wrapper>
  )
}

export default memo(RangeDatePicker)
