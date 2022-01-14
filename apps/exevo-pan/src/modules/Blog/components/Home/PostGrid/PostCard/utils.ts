import { DateObject } from './types'

export const extractDate = (timestamp: number): DateObject => {
  const date = new Date(timestamp)

  const month = date.getMonth()
  const day = date.getDay() + 1
  const year = date.getFullYear()
  return { month, day, year }
}
