import {
  ddmmyyy2mmddyyyy,
  sanitizeDateTime,
  getLocalizedDate,
  dateToReadableStringDate,
  shouldDisplayHighlightedAuction,
  MINUTES_IN,
  MILLISECONDS_IN,
  getNumberSign,
} from 'utils'
import { HighlightStatus } from './types'

export const isPastDate = (
  readableDate: string,
  timezoneOffsetMinutes: number,
): boolean => {
  const currentDate = sanitizeDateTime(getLocalizedDate(timezoneOffsetMinutes))
  const checkingDate = new Date(ddmmyyy2mmddyyyy(readableDate))

  return checkingDate < currentDate
}

export const getHighlightStatus = ({
  active,
  days,
  timezoneOffsetMinutes,
  auctionEnd,
}: Pick<
  HighlightedAuctionData,
  'active' | 'days' | 'timezoneOffsetMinutes' | 'auctionEnd'
>): HighlightStatus => {
  if (
    days.every((day) => isPastDate(day, timezoneOffsetMinutes)) ||
    auctionEnd <= +new Date()
  ) {
    return 'FINISHED'
  }

  if (!active) return 'PAUSED'
  if (shouldDisplayHighlightedAuction({ days, timezoneOffsetMinutes }))
    return 'RUNNING'
  return 'SCHEDULED'
}

export const toReadableLocalizedDate = (timezoneOffsetMinutes: number) =>
  dateToReadableStringDate(getLocalizedDate(timezoneOffsetMinutes))

export const getTimezoneDiff = (timezoneOffsetMinutes: number) => {
  const hoursDiff =
    (new Date().getTimezoneOffset() - timezoneOffsetMinutes) / MINUTES_IN.HOUR

  return `${getNumberSign(hoursDiff)}${Math.abs(hoursDiff)}h`
}

export const offsettedCurrentISODate = (timezoneOffsetMinutes: number) =>
  new Date(
    +new Date() +
      +getTimezoneDiff(timezoneOffsetMinutes).replace('h', '') *
        MILLISECONDS_IN.HOUR,
  ).toLocaleString('pt-BR', {
    hour12: false,
  })
