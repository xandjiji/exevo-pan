import { readableCurrentDate, ddmmyyy2mmddyyyy, sanitizeDateTime } from 'utils'
import { HighlightStatus } from './types'

export const isPastDate = (readableDate: string): boolean => {
  const currentDate = sanitizeDateTime(new Date())
  const checkingDate = new Date(ddmmyyy2mmddyyyy(readableDate))

  return checkingDate < currentDate
}

export const getHighlightStatus = (
  active: boolean,
  days: string[],
): HighlightStatus => {
  if (days.every(isPastDate)) {
    return 'FINISHED'
  }

  if (!active) return 'PAUSED'
  if (days.includes(readableCurrentDate())) return 'RUNNING'
  return 'SCHEDULED'
}
