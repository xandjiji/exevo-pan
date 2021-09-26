import { Fragment, memo, useMemo } from 'react'
import { useForm } from '../../../contexts/Form'
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

const RangeDatePicker = (): JSX.Element => {
  const { selectedCharacter, selectedDates, dispatch } = useForm()

  const days = useMemo(
    () => getDaysUntilAuctionEnd(selectedCharacter?.auctionEnd),
    [selectedCharacter],
  )
  const partitionedDates = useMemo(() => partitionByMonths(days), [days])
  const firstDay = days[0]

  return (
    <>
      <S.Wrapper>
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
                aria-selected={selectedDates.includes(date)}
                onClick={() => dispatch({ type: 'TOGGLE_DATE', date })}
              >
                {new Date(date).getDate()}
              </S.Day>
            ))

            const hasNextMonth = index + 1 !== partitionedDates.length
            const currentMonthLastDay = monthDates[monthDates.length - 1]
            const currentMonthLastWeekday =
              getWeekdayNumber(currentMonthLastDay)

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
      <S.Subtext>Choose the days you want to highlight your auction.</S.Subtext>
    </>
  )
}

export default memo(RangeDatePicker)
