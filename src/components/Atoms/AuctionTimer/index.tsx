import { useLocation } from 'react-router-dom'
import useCountdownTick from './useCountdownTick'
import { monthStr } from './utils'
import { AuctionTimerProps } from './types'
import * as S from './styles'

const AuctionTimer = ({
  endDate,
  ...props
}: AuctionTimerProps): JSX.Element => {
  // eslint-disable-next-line
  const { pathname } = useLocation()
  const { days, hours, minutes, seconds } = useCountdownTick(+endDate)

  const endTime = `, ${endDate.getHours()}:${endDate
    .getMinutes()
    .toString()
    .padStart(2, '0')}`

  const endDateString = `${endDate.getDate()} ${monthStr[endDate.getMonth()]}`

  const countdownTime = hours
    ? `${hours}h ${minutes}m`
    : `${minutes}m ${seconds}s`

  if (days > 0 || pathname === '/bazaar-history') {
    return (
      <>
        <S.Countdown {...props}>{endDateString}</S.Countdown>
        {endTime}
      </>
    )
  }

  if (hours + minutes + seconds > 0) {
    return (
      <>
        <S.Countdown endingSoon {...props}>
          {countdownTime}
        </S.Countdown>
        {endTime}
      </>
    )
  }

  return (
    <S.Countdown endingSoon {...props}>
      Auction Ended!
    </S.Countdown>
  )
}

export default AuctionTimer
