import { History, HistoryStatistics, ServerData } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import { buildCharacterData as characterDataBuilder } from 'shared-utils/dist/buildCharacterData'
import {
  calculateTotalRevenue,
  calculateTotalNegotiated,
  calculateSuccessRate,
  getTopTenBy,
  calculateVocationDistribution,
} from './tasks'

const SCRIPT_NAME = coloredText('UpdateHistoryStatistics', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  const serverData = new ServerData()
  await serverData.load()
  const allServers = serverData.getAllServers()

  const buildCharacterData = (auctions: PartialCharacterObject[]) =>
    characterDataBuilder(auctions, allServers)

  const historyData = new History()
  await historyData.load()
  const allAuctions = historyData.getEntireHistory()

  const statisticsData = new HistoryStatistics()
  await statisticsData.load()

  const successfulAuctions = allAuctions.filter(
    ({ hasBeenBidded }) => hasBeenBidded,
  )

  statisticsData.patchData({
    totalRevenue: calculateTotalRevenue(allAuctions),
    totalTibiaCoins: calculateTotalNegotiated(allAuctions),
    successRate: calculateSuccessRate(allAuctions),
    top10Bid: buildCharacterData(getTopTenBy.bid(successfulAuctions)),
    top10Level: buildCharacterData(getTopTenBy.level(successfulAuctions)),
    top10Magic: buildCharacterData(getTopTenBy.magic(successfulAuctions)),
    top10Club: buildCharacterData(getTopTenBy.club(successfulAuctions)),
    top10Fist: buildCharacterData(getTopTenBy.fist(successfulAuctions)),
    top10Sword: buildCharacterData(getTopTenBy.sword(successfulAuctions)),
    top10Fishing: buildCharacterData(getTopTenBy.fishing(successfulAuctions)),
    top10Axe: buildCharacterData(getTopTenBy.axe(successfulAuctions)),
    top10Distance: buildCharacterData(getTopTenBy.distance(successfulAuctions)),
    top10Shielding: buildCharacterData(
      getTopTenBy.shielding(successfulAuctions),
    ),
    vocationPercentage: calculateVocationDistribution(allAuctions),
  })

  await statisticsData.save()

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
