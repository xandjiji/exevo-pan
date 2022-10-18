import { broadcast, coloredText, Timer } from 'logging'
import { prisma } from 'services'
import { retryWrapper } from 'utils'
import {
  calculateTotalRevenue,
  calculateTotalNegotiated,
  calculateSuccessRate,
  getTopTenBy,
  calculateVocationDistribution,
} from './tasks'

const SCRIPT_NAME = coloredText('UpdateHistoryStatistics', 'highlight')

const updateData = retryWrapper((data: string) =>
  prisma.$transaction([
    prisma.historyStatistics.deleteMany(),
    prisma.historyStatistics.create({ data: { jsonData: data } }),
  ]),
)

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const data: StatisticsData = {
    totalRevenue: await calculateTotalRevenue(),
    totalTibiaCoins: await calculateTotalNegotiated(),
    successRate: await calculateSuccessRate(),
    vocationPercentage: await calculateVocationDistribution(),
    top10Bid: await getTopTenBy.bid(),
    top10Level: await getTopTenBy.level(),
    top10Magic: await getTopTenBy.magic(),
    top10Club: await getTopTenBy.club(),
    top10Fist: await getTopTenBy.fist(),
    top10Sword: await getTopTenBy.sword(),
    top10Fishing: await getTopTenBy.fishing(),
    top10Axe: await getTopTenBy.axe(),
    top10Distance: await getTopTenBy.distance(),
    top10Shielding: await getTopTenBy.shielding(),
  }

  await updateData(JSON.stringify(data))

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
