import {
  readableCurrentDate,
  standardCurrentDate,
  ddmmyyy2mmddyyyy,
} from 'utils'
import { HighlightStatus } from './types'

export const isPastDate = (readableDate: string): boolean => {
  const currentTimestamp = +new Date(standardCurrentDate())
  const checkingTimestamp = +new Date(ddmmyyy2mmddyyyy(readableDate))

  return checkingTimestamp < currentTimestamp
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
