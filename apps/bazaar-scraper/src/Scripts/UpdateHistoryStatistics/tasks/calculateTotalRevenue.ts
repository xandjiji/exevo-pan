/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { broadcast, tabBroadcast, coloredText } from 'logging'
import { prisma } from 'services'
import { getLastTimestampsRange, toReadableTimestamp } from './utils'

const BASE_AUCTION_FEE = 50
const AUCTION_TAX = 0.12

const readableTimestamp = (timestamp: number) =>
  coloredText(toReadableTimestamp(timestamp), 'highlight')

const getLastDaysRevenues = async (): Promise<number[]> => {
  broadcast('Calculating last month revenue...', 'neutral')

  const timestampRanges = getLastTimestampsRange()
  const lastMonth: number[] = []

  for (const [from, to] of timestampRanges) {
    tabBroadcast(
      `Summarizing ${coloredText('[', 'system')}from ${readableTimestamp(
        from,
      )} to ${readableTimestamp(to)}${coloredText(']', 'system')}...`,
      'control',
    )
    const auctionsInCurrentRange = await prisma.currentAuction.findMany({
      where: { auctionEnd: { gte: from, lte: to } },
    })

    let revenue = 0
    auctionsInCurrentRange.forEach(({ hasBeenBidded, currentBid }) => {
      revenue += BASE_AUCTION_FEE

      if (hasBeenBidded) {
        revenue += Math.floor((currentBid - BASE_AUCTION_FEE) * AUCTION_TAX)
      }
    })

    lastMonth.push(revenue)
  }

  return lastMonth
}

export const calculateTotalRevenue = async (): Promise<MonthlySummary> => {
  broadcast('Calculating total revenue...', 'neutral')
  const historyAuctionCount = await prisma.currentAuction.count()

  const totalInitialFeeCoins = historyAuctionCount * BASE_AUCTION_FEE

  const { _count: biddedCount, _sum } = await prisma.currentAuction.aggregate({
    where: { hasBeenBidded: true },
    _count: true,
    _sum: {
      currentBid: true,
    },
  })

  const totalBidded = _sum.currentBid ?? 0
  const totalBaseFees = BASE_AUCTION_FEE * biddedCount

  const totalTaxedCoins = Math.floor(
    (totalBidded - totalBaseFees) * AUCTION_TAX,
  )

  const totalRevenue = totalInitialFeeCoins + totalTaxedCoins

  const lastMonthRevenue = await getLastDaysRevenues()

  return {
    current: totalRevenue,
    lastMonth: lastMonthRevenue,
  }
}
