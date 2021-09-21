import { memo, useMemo } from 'react'
import { getDaysUntilAuctionEnd } from './utils'
import * as S from './styles'
import { RangeDatePickerProps } from './types'

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const RangeDatePicker = ({
  auctionEnd,
  ...props
}: RangeDatePickerProps): JSX.Element => {
  const days = useMemo(() => getDaysUntilAuctionEnd(auctionEnd), [auctionEnd])
  const firstWeekday = days[0]

  return (
    <S.Wrapper {...props}>
      <S.MonthName>Setembro</S.MonthName>
      <S.CalendarGrid>
        {weekdays.map((weekday) => (
          <S.Weekday>{weekday}</S.Weekday>
        ))}

        {Array.from({ length: new Date(firstWeekday).getDay() }, () => (
          <div />
        ))}
        {days.map((dateString) => (
          <S.Day>{new Date(dateString).getDate()}</S.Day>
        ))}
      </S.CalendarGrid>
    </S.Wrapper>
  )
}

export default memo(RangeDatePicker)
