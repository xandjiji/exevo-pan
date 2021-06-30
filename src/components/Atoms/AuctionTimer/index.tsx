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
  const { days, hours, minutes, seconds } = useCountdownTick(+endDate)
  const { pathname } = useLocation()
  const isBazaarHistory = pathname === '/bazaar-history'

  const endTime = `, ${endDate.getHours()}:${endDate
    .getMinutes()
    .toString()
    .padStart(2, '0')}`

  const endDateString = `${endDate.getDate()} ${monthStr[endDate.getMonth()]}`

  const countdownTime = hours
    ? `${hours}h ${minutes}m`
    : `${minutes}m ${seconds}s`

  if (days > 0 || isBazaarHistory) {
    return (
      <>
        <S.Countdown
          role="timer"
          aria-label={
            isBazaarHistory ? 'Auction finished at' : 'Auction ends at'
          }
          {...props}
        >
          {endDateString}
        </S.Countdown>
        {endTime}
      </>
    )
  }

  if (hours + minutes + seconds > 0) {
    return (
      <>
        <S.Countdown
          role="timer"
          aria-label="Auction ends in"
          endingSoon
          {...props}
        >
          {countdownTime}
        </S.Countdown>
        {endTime}
      </>
    )
  }

  return (
    <S.Countdown
      role="timer"
      aria-label="Auction is over"
      endingSoon
      {...props}
    >
      Auction Ended!
    </S.Countdown>
  )
}

export default AuctionTimer
