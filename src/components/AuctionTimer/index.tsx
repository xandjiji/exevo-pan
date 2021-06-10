import { useLocation } from 'react-router-dom'
import useTimeDiff from './useTimeDiff'
import { AuctionTimerProps } from './types'
import * as S from './styles'

const monthStr = [
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

const AuctionTimer = ({ endDate }: AuctionTimerProps): JSX.Element => {
  const { pathname } = useLocation()
  const { days, hours, minutes, seconds } = useTimeDiff(+endDate)

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
        <S.Countdown>{endDateString}</S.Countdown>
        {endTime}
      </>
    )
  }

  if (hours + minutes + seconds > 0) {
    return (
      <>
        <S.Countdown endingSoon>{countdownTime}</S.Countdown>
        {endTime}
      </>
    )
  }

  return <S.Countdown endingSoon>Auction Ended!</S.Countdown>
}

export default AuctionTimer
