import {
  readableCurrentDate,
  ddmmyyy2mmddyyyy,
  sanitizeDateTime,
  dateToReadableStringDate,
  DAYS_IN,
  MILLISECONDS_IN,
} from 'utils'
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

const MONTH = DAYS_IN.MONTH * MILLISECONDS_IN.DAY
export const forwardOneMonth = () => new Date(+new Date() + MONTH)

export const SEPARATOR = ','
export const toggleJoinedDateString = ({
  toggleDate,
  joinedDateString,
}: {
  toggleDate: Date
  joinedDateString: string
}): string => {
  const readableDateSet = new Set(joinedDateString.split(SEPARATOR))
  const toggleDateString = dateToReadableStringDate(toggleDate)

  if (readableDateSet.has(toggleDateString)) {
    readableDateSet.delete(toggleDateString)
  } else {
    readableDateSet.add(toggleDateString)
  }

  return [...readableDateSet].join(SEPARATOR)
}
