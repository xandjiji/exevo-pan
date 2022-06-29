import { DAYS_IN } from './constants'

declare type DateObject = {
  day: number
  month: number
  year: number
}

export const padStringDate = (dateString: string): string => {
  const [a, b, c] = dateString.split('/')
  return `${a.padStart(2, '0')}/${b.padStart(2, '0')}/${c}`
}

export const dateToDateObject = (dateValue: Date): DateObject => {
  const day = dateValue.getDate()
  const month = dateValue.getMonth() + 1
  const year = dateValue.getFullYear()

  return {
    day,
    month,
    year,
  }
}

export const readableCurrentDate = (): string => {
  const { day, month, year } = dateToDateObject(new Date())
  return padStringDate(`${day}/${month}/${year}`)
}

export const standardCurrentDate = (): string => {
  const { day, month, year } = dateToDateObject(new Date())
  return padStringDate(`${month}/${day}/${year}`)
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

export * from './constants'
