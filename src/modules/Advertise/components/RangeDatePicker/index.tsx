import { memo, useMemo } from 'react'
import {
  getDaysUntilAuctionEnd,
  fillWithDays,
  getWeekdayNumber,
  getDay,
} from './utils'
import * as S from './styles'
import { RangeDatePickerProps } from './types'

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const RangeDatePicker = ({
  auctionEnd,
  ...props
}: RangeDatePickerProps): JSX.Element => {
  const days = useMemo(() => getDaysUntilAuctionEnd(auctionEnd), [auctionEnd])
  const firstDay = days[0]
  const lastDay = days[days.length - 1]

  return (
    <S.Wrapper {...props}>
      <S.MonthName>Setembro</S.MonthName>
      <S.CalendarGrid>
        {weekdays.map((weekday) => (
          <S.Weekday>{weekday}</S.Weekday>
        ))}

        {fillWithDays(firstDay, getWeekdayNumber(firstDay), -1).map(
          (fillDay) => (
            <S.FillDay>{getDay(fillDay)}</S.FillDay>
          ),
        )}
        {days.map((dateString) => (
          <S.Day>{new Date(dateString).getDate()}</S.Day>
        ))}
        {fillWithDays(lastDay, 6 - getWeekdayNumber(lastDay), 1).map(
          (fillDay) => (
            <S.FillDay>{getDay(fillDay)}</S.FillDay>
          ),
        )}
      </S.CalendarGrid>
    </S.Wrapper>
  )
}

export default memo(RangeDatePicker)
