import { dateToReadableStringDate, MILLISECONDS_IN } from 'utils'

const minutesToMilliseconds = (minutes: number) =>
  minutes * MILLISECONDS_IN.MINUTE

export const shouldDisplayHighlightedAuction = ({
  timezoneOffsetMinutes,
  days,
}: HighlightedAuctionData): boolean => {
  const offsetMilliseconds = minutesToMilliseconds(
    new Date().getTimezoneOffset() - timezoneOffsetMinutes,
  )

  const readableLocalizedDate = dateToReadableStringDate(
    new Date(+new Date() + offsetMilliseconds),
  )

  return days.includes(readableLocalizedDate)
}
