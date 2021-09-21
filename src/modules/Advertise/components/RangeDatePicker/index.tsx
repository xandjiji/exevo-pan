import { getDaysUntilAuctionEnd } from './utils'
import * as S from './styles'
import { RangeDatePickerProps } from './types'

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const RangeDatePicker = ({
  auctionEnd,
  ...props
}: RangeDatePickerProps): JSX.Element => {
  console.log(getDaysUntilAuctionEnd(auctionEnd))
  return (
    <S.Wrapper {...props}>
      <S.MonthName>Setembro</S.MonthName>
      <S.CalendarGrid>
        {weekdays.map((weekday) => (
          <S.Weekday>{weekday}</S.Weekday>
        ))}
        {getDaysUntilAuctionEnd(auctionEnd).map((dateString) => (
          <S.Day>{new Date(dateString).getDate()}</S.Day>
        ))}
      </S.CalendarGrid>
    </S.Wrapper>
  )
}

export default RangeDatePicker
