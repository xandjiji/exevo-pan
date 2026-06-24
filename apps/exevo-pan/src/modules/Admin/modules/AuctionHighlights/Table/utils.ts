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

const formatRelativeTimeFromNow = (date: Date | number): string => {
  const diffMs = +new Date(date) - Date.now()
  const absDiffMs = Math.abs(diffMs)
  const isFuture = diffMs > 0
  const prefix = isFuture ? 'in ' : ''
  const suffix = isFuture ? '' : ' ago'

  if (absDiffMs < MILLISECONDS_IN.HOUR) {
    const minutes = Math.max(1, Math.round(absDiffMs / MILLISECONDS_IN.MINUTE))

    return `(${prefix}${minutes} minute${minutes === 1 ? '' : 's'}${suffix})`
  }

  if (absDiffMs < MILLISECONDS_IN.DAY) {
    const hours = Math.round(absDiffMs / MILLISECONDS_IN.HOUR)

    return `(${prefix}${hours} hour${hours === 1 ? '' : 's'}${suffix})`
  }

  const days = Math.round(absDiffMs / MILLISECONDS_IN.DAY)

  return `(${prefix}${days} day${days === 1 ? '' : 's'}${suffix})`
}

export const formatAuctionEndTooltip = (auctionEnd: Date | number): string => {
  const date = new Date(auctionEnd)
  const readable = date.toLocaleString('pt-BR', { hour12: false })

  return `${readable} ${formatRelativeTimeFromNow(date)}`
}
