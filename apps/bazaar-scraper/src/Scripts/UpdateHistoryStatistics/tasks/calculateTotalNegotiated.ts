/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { broadcast, tabBroadcast } from 'logging'
import { prisma } from 'services'
import { retryWrapper } from 'utils'
import { getLastTimestampsRange, toReadableRange } from './utils'

const db = {
  findMany: retryWrapper(prisma.historyAuction.findMany),
  aggregateTotalNegotiated: retryWrapper(() =>
    prisma.historyAuction.aggregate({
      where: { hasBeenBidded: true },
      _sum: { currentBid: true },
    }),
  ),
}

const getLastDaysNegotiations = async (): Promise<number[]> => {
  broadcast('Calculating last month TC volume...', 'neutral')

  const timestampRanges = getLastTimestampsRange()
  const lastMonth: number[] = []

  for (const [from, to] of timestampRanges) {
    tabBroadcast(`Summarizing ${toReadableRange([from, to])}...`, 'control')
    const auctionsInCurrentRange = await db.findMany({
      where: {
        hasBeenBidded: true,
        auctionEnd: { gte: from, lte: to },
      },
    })

    let negotiated = 0
    auctionsInCurrentRange.forEach(({ currentBid }) => {
      negotiated += currentBid
    })

    lastMonth.push(negotiated)
  }

  return lastMonth
}

export const calculateTotalNegotiated = async (): Promise<MonthlySummary> => {
  broadcast('Calculating total TC volume...', 'neutral')

  const { _sum: totalNegotiated } = await db.aggregateTotalNegotiated()

  return {
    current: totalNegotiated.currentBid ?? 0,
    lastMonth: await getLastDaysNegotiations(),
  }
}
