import { HistoryStatistics } from 'Data'
import { prisma } from 'services'
import { broadcast, coloredText, Timer } from 'logging'
import {
  calculateTotalRevenue,
  calculateTotalNegotiated,
  calculateSuccessRate,
  calculateTop10,
  calculateVocationDistribution,
} from './tasks'

const SCRIPT_NAME = coloredText('UpdateHistoryStatistics', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  /* const statisticsData = new HistoryStatistics()
  await statisticsData.load() */

  /*   const allAuctions = await prisma.currentAuction.findMany()
  const successAuctionsBid = await prisma.currentAuction.aggregate({
    where: { hasBeenBidded: true },
    _count: true,
    _sum: {
      currentBid: true,
    },
  }) */

  console.log(await calculateTotalRevenue())

  /* const successfulAuctions = allAuctions.filter(
    ({ hasBeenBidded }) => hasBeenBidded,
  ) */

  /* statisticsData.patchData({
    totalRevenue: calculateTotalRevenue(allAuctions),
    totalTibiaCoins: calculateTotalNegotiated(allAuctions),
    successRate: calculateSuccessRate(allAuctions),
    top10Bid: calculateTop10.byBid(successfulAuctions),
    top10Level: calculateTop10.byLevel(successfulAuctions),
    top10Magic: calculateTop10.byMagic(successfulAuctions),
    top10Club: calculateTop10.byClub(successfulAuctions),
    top10Fist: calculateTop10.byFist(successfulAuctions),
    top10Sword: calculateTop10.bySword(successfulAuctions),
    top10Fishing: calculateTop10.byFishing(successfulAuctions),
    top10Axe: calculateTop10.byAxe(successfulAuctions),
    top10Distance: calculateTop10.byDistance(successfulAuctions),
    top10Shielding: calculateTop10.byShielding(successfulAuctions),
    vocationPercentage: calculateVocationDistribution(allAuctions),
  }) */

  /* await statisticsData.save() */

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
