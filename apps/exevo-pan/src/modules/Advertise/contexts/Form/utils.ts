import { getDaysUntilAuctionEnd } from '../../components/AdConfiguration/RangeDatePicker/utils'

const getLastItems = <T>(array: T[], amount: number): T[] =>
  array.slice(Math.max(array.length - amount, 0))

export const getRecommendedDays = (endDate: number): string[] =>
  getLastItems(getDaysUntilAuctionEnd(endDate), 2)
