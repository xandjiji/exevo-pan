import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import useCountdownTick from './useCountdownTick'
import { CountdownProps, AuctionTimerProps } from './types'

const Countdown = ({
  endingSoon = false,
  className,
  ...props
}: CountdownProps) => (
  <span
    className={clsx(
      'transition-colors',
      endingSoon ? 'text-red' : 'text-onSurface',
      className,
    )}
    {...props}
  />
)

const EndTime = ({ className, ...props }: JSX.IntrinsicElements['span']) => (
  <span className={clsx('text-onSurface', className)} {...props} />
)

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
        <Countdown
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
        </Countdown>
        <EndTime>{endTime}</EndTime>
      </>
    )
  }

  if (hours + minutes + seconds > 0) {
    const countdownTime = hours
      ? `${hours}h ${minutes}m`
      : `${minutes}m ${seconds}s`

    return (
      <>
        <Countdown
          suppressHydrationWarning
          role="timer"
          aria-label={common.AuctionTimer.auctionEndsIn}
          endingSoon
          {...props}
        >
          {countdownTime}
        </Countdown>
        <EndTime>{endTime}</EndTime>
      </>
    )
  }

  return (
    <Countdown
      suppressHydrationWarning
      role="timer"
      aria-label={common.AuctionTimer.auctionIsOver}
      endingSoon
      {...props}
    >
      {common.AuctionTimer.auctionEnded}
    </Countdown>
  )
}

export default AuctionTimer
