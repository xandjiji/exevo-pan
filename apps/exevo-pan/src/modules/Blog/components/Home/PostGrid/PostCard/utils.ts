import { DateObject } from './types'

export const extractDate = (timestamp: number): DateObject => {
  const date = new Date(timestamp)

  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()
  return { month, day, year }
}
