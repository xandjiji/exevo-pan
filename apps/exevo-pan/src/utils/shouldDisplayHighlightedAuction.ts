import { dateToReadableStringDate, MILLISECONDS_IN } from 'utils'

const minutesToMilliseconds = (minutes: number) =>
  minutes * MILLISECONDS_IN.MINUTE

export const getLocalizedDate = (timezoneOffsetMinutes: number) => {
  const offsetMilliseconds = minutesToMilliseconds(
    new Date().getTimezoneOffset() - timezoneOffsetMinutes,
  )

  return new Date(+new Date() + offsetMilliseconds)
}

export const shouldDisplayHighlightedAuction = ({
  timezoneOffsetMinutes,
  days,
}: Pick<HighlightedAuctionData, 'days' | 'timezoneOffsetMinutes'>): boolean => {
  const readableLocalizedDate = dateToReadableStringDate(
    getLocalizedDate(timezoneOffsetMinutes),
  )

  return days.includes(readableLocalizedDate)
}
