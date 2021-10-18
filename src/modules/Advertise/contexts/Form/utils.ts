import { getDaysUntilAuctionEnd } from '../../components/AdConfiguration/RangeDatePicker/utils'

const getLastThree = <T>(array: T[]): T[] =>
  array.slice(Math.max(array.length - 3, 0))

export const getRecommendedDays = (endDate: number): string[] =>
  getLastThree(getDaysUntilAuctionEnd(endDate))
