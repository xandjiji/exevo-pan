import { getLastTimestampsRange, filterAuctionsByTimestampRange } from './utils'

const getLastDaysNegotiations = (
  successAuctions: PartialCharacterObject[],
): number[] => {
  const timestampRanges = getLastTimestampsRange()
  const lastMonth: number[] = []

  timestampRanges.forEach((range) => {
    const filteredByRange = filterAuctionsByTimestampRange(
      range,
      successAuctions,
    )

    let negotiated = 0
    filteredByRange.forEach(({ currentBid }) => {
      negotiated += currentBid
    })

    lastMonth.push(negotiated)
  })

  return lastMonth
}

export const calculateTotalNegotiated = (
  history: PartialCharacterObject[],
): MonthlySummary => {
  const successAuctions = history.filter(({ hasBeenBidded }) => hasBeenBidded)

  const totalNegotiated = successAuctions.reduce(
    (total, { currentBid }) => total + currentBid,
    0,
  )

  return {
    current: totalNegotiated,
    lastMonth: getLastDaysNegotiations(successAuctions),
  }
}
