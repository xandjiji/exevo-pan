import { broadcast, tabBroadcast } from 'logging'
import {
  getLastTimestampsRange,
  filterAuctionsByTimestampRange,
  toReadableRange,
} from './utils'

const getLastDaysNegotiations = (
  successAuctions: PartialCharacterObject[],
): number[] => {
  broadcast('Calculating last month TC volume...', 'neutral')

  const timestampRanges = getLastTimestampsRange()
  const lastMonth: number[] = []

  timestampRanges.forEach(([from, to]) => {
    tabBroadcast(`Summarizing ${toReadableRange([from, to])}...`, 'control')

    const filteredByRange = filterAuctionsByTimestampRange(
      [from, to],
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
  broadcast('Calculating total TC volume...', 'neutral')

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
