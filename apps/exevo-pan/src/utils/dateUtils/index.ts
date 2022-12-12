import { DAYS_IN, MILLISECONDS_IN } from './constants'

export const padTime = (time: string | number) =>
  time.toString().padStart(2, '0')

export const padStringDate = (dateString: string): string => {
  const [a, b, c] = dateString.split('/')
  return `${a.padStart(2, '0')}/${b.padStart(2, '0')}/${c}`
}

export const dateToDateObject = (dateValue: Date): DateObject => ({
  seconds: dateValue.getSeconds(),
  minutes: dateValue.getMinutes(),
  hours: dateValue.getHours(),
  day: dateValue.getDate(),
  month: dateValue.getMonth(),
  year: dateValue.getFullYear(),
  weekday: dateValue.getDay(),
})

export const readableCurrentDate = (): string => {
  const { day, month, year } = dateToDateObject(new Date())
  return padStringDate(`${day}/${month + 1}/${year}`)
}

export const standardCurrentDate = (): string => {
  const { day, month, year } = dateToDateObject(new Date())
  return padStringDate(`${month + 1}/${day}/${year}`)
}

export const mmddyyyy2ddmmyyy = (stringDate: string): string => {
  const [month, day, year] = stringDate.split('/')
  return padStringDate(`${day}/${month}/${year}`)
}

const dateStringToNumeric = (dateString: string): number[] =>
  dateString.split('/').map((value) => +value)

export const sortStringDates = (a: string, b: string): number => {
  const [aDay, aMonth, aYear] = dateStringToNumeric(a)
  const [bDay, bMonth, bYear] = dateStringToNumeric(b)

  const aTotalDays = aDay + aMonth * DAYS_IN.MONTH + aYear * DAYS_IN.YEAR
  const bTotalDays = bDay + bMonth * DAYS_IN.MONTH + bYear * DAYS_IN.YEAR

  return aTotalDays - bTotalDays
}

export const timestampDaysDiff = (
  currentTimestamp: number,
  nextTimestamp: number,
  abs = true,
): number => {
  const millisecondsDiff = nextTimestamp - currentTimestamp

  const dayDiff = Math.round(millisecondsDiff / MILLISECONDS_IN.DAY)

  return abs ? Math.abs(dayDiff) : dayDiff
}

export * from './constants'
