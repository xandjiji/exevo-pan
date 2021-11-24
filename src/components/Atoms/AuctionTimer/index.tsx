import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { routes } from 'Constants'
import useCountdownTick from './useCountdownTick'
import { AuctionTimerProps } from './types'
import * as S from './styles'

const AuctionTimer = ({
  endDate,
  ...props
}: AuctionTimerProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const { days, hours, minutes, seconds } = useCountdownTick(+endDate)
  const { pathname } = useRouter()
  const isBazaarHistory = pathname === routes.BAZAAR_HISTORY

  const endTime = `, ${endDate.getHours()}:${endDate
    .getMinutes()
    .toString()
    .padStart(2, '0')}`

  const endDateString = `${endDate.getDate()} ${
    common.Month[endDate.getMonth()]
  }`

  const countdownTime = hours
    ? `${hours}h ${minutes}m`
    : `${minutes}m ${seconds}s`

  if (days > 0 || isBazaarHistory) {
    return (
      <>
        <S.Countdown
          suppressHydrationWarning
          role="timer"
          aria-label={
            isBazaarHistory
              ? common.AuctionTimer.finishedAuction
              : common.AuctionTimer.unfinishedAuction
          }
          {...props}
        >
          {endDateString}
        </S.Countdown>
        <S.EndTime>{endTime}</S.EndTime>
      </>
    )
  }

  if (hours + minutes + seconds > 0) {
    return (
      <>
        <S.Countdown
          suppressHydrationWarning
          role="timer"
          aria-label={common.AuctionTimer.auctionEndsIn}
          endingSoon
          {...props}
        >
          {countdownTime}
        </S.Countdown>
        <S.EndTime>{endTime}</S.EndTime>
      </>
    )
  }

  return (
    <S.Countdown
      suppressHydrationWarning
      role="timer"
      aria-label={common.AuctionTimer.auctionIsOver}
      endingSoon
      {...props}
    >
      {common.AuctionTimer.auctionEnded}
    </S.Countdown>
  )
}

export default AuctionTimer
