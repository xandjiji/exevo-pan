import { MILLISECONDS_IN } from 'utils'
import { NotificationDateArgs } from './types'

export const calculateDate = ({
  auctionEnd,
  timeMode,
  timeValue,
}: NotificationDateArgs) => {
  const auctionEndDate = new Date(auctionEnd * 1000)
  const millisecondsBeforeEnd =
    (timeMode === 'minutes' ? MILLISECONDS_IN.MINUTE : MILLISECONDS_IN.HOUR) *
    timeValue

  const notifyAtDate = new Date(+auctionEndDate - millisecondsBeforeEnd)

  return { auctionEndDate, notifyAtDate }
}

export const isNotificationDateValid = (args: NotificationDateArgs) => {
  if (args.timeValue < 0) return false

  const currentDate = new Date()
  const { auctionEndDate, notifyAtDate } = calculateDate(args)

  return notifyAtDate >= currentDate && notifyAtDate <= auctionEndDate
}
