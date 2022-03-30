import { useTranslations } from 'contexts/useTranslation'
import useCountdownTick from './useCountdownTick'
import { AuctionTimerProps } from './types'
import * as S from './styles'

const AuctionTimer = ({
  endDate,
  past,
  ...props
}: AuctionTimerProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const { days, hours, minutes, seconds } = useCountdownTick(+endDate)

  const endTime = `, ${endDate.getHours()}:${endDate
    .getMinutes()
    .toString()
    .padStart(2, '0')}`

  if (days > 0 || past) {
    const endDateString = `${endDate.getDate()} ${
      common.Month[endDate.getMonth()]
    }${past ? ` ${endDate.getFullYear()}` : ''}`

    return (
      <>
        <S.Countdown
          suppressHydrationWarning
          role="timer"
          aria-label={
            past
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
    const countdownTime = hours
      ? `${hours}h ${minutes}m`
      : `${minutes}m ${seconds}s`

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
