import { getLastTimestampsRange, filterAuctionsByTimestampRange } from './utils'

const BASE_AUCTION_FEE = 50
const AUCTION_TAX = 0.12

const getLastDaysRevenues = (history: PartialCharacterObject[]): number[] => {
  const timestampRanges = getLastTimestampsRange()
  const lastMonth: number[] = []

  timestampRanges.forEach((range) => {
    const filteredByRange = filterAuctionsByTimestampRange(range, history)
    let revenue = 0
    filteredByRange.forEach(({ hasBeenBidded, currentBid }) => {
      revenue += BASE_AUCTION_FEE

      if (hasBeenBidded) {
        revenue += Math.floor((currentBid - BASE_AUCTION_FEE) * AUCTION_TAX)
      }
    })

    lastMonth.push(revenue)
  })

  return lastMonth
}

export const calculateTotalRevenue = (
  history: PartialCharacterObject[],
): MonthlySummary => {
  const totalCount = history.length

  const totalInitialFeeCoins = totalCount * BASE_AUCTION_FEE

  const successAuctions = history.filter(({ hasBeenBidded }) => hasBeenBidded)
  const totalTaxedCoins = successAuctions.reduce(
    (total, { currentBid }) =>
      total + Math.floor((currentBid - BASE_AUCTION_FEE) * AUCTION_TAX),
    0,
  )
  const totalRevenue = totalInitialFeeCoins + totalTaxedCoins

  return {
    current: totalRevenue,
    lastMonth: getLastDaysRevenues(history),
  }
}
