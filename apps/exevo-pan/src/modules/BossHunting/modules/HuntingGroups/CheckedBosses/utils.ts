import { MILLISECONDS_IN } from 'utils'
import { SS_UTC_HOUR } from 'Constants'

const RADIX = 10

const getDateRelativeToSS = (date: Date) => {
  const utcHour = date.getUTCHours()

  const [utcDateString] = date.toISOString().split('T')
  const [, , day] = utcDateString.split('-')
  return parseInt(day, RADIX) + (utcHour < SS_UTC_HOUR ? -1 : 0)
}

export const isFromSameServerSave = (
  a = new Date(),
  b = new Date(),
): boolean => {
  if (+a - +b >= MILLISECONDS_IN.DAY) {
    return false
  }

  return getDateRelativeToSS(a) === getDateRelativeToSS(b)
}
