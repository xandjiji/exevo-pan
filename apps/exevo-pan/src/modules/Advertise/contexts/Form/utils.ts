import { dateToReadableStringDate } from 'utils'
import { getDatesUntilEnd } from 'components/Organisms/FutureRangeDatePicker/utils'

const getLastItems = <T>(array: T[], amount: number): T[] =>
  array.slice(Math.max(array.length - amount, 0))

export const getRecommendedDays = (endDate: number): string[] =>
  getLastItems(getDatesUntilEnd(new Date(endDate * 1000)), 2).map(
    dateToReadableStringDate,
  )
