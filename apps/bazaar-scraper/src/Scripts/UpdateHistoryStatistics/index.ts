import { History, HistoryStatistics, ServerData } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import { buildCharacterData as characterDataBuilder } from 'shared-utils/dist/buildCharacterData'
import * as task from './tasks'

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
    totalRevenue: task.calculateTotalRevenue(allAuctions),
    totalTibiaCoins: task.calculateTotalNegotiated(allAuctions),
    successRate: task.calculateSuccessRate(allAuctions),
    top10Bid: buildCharacterData(task.getTopTenBy.bid(successfulAuctions)),
    top10Level: buildCharacterData(task.getTopTenBy.level(successfulAuctions)),
    top10Magic: buildCharacterData(task.getTopTenBy.magic(successfulAuctions)),
    top10Club: buildCharacterData(task.getTopTenBy.club(successfulAuctions)),
    top10Fist: buildCharacterData(task.getTopTenBy.fist(successfulAuctions)),
    top10Sword: buildCharacterData(task.getTopTenBy.sword(successfulAuctions)),
    top10Fishing: buildCharacterData(
      task.getTopTenBy.fishing(successfulAuctions),
    ),
    top10Axe: buildCharacterData(task.getTopTenBy.axe(successfulAuctions)),
    top10Distance: buildCharacterData(
      task.getTopTenBy.distance(successfulAuctions),
    ),
    top10Shielding: buildCharacterData(
      task.getTopTenBy.shielding(successfulAuctions),
    ),
    vocationPercentage: task.calculateVocationDistribution(allAuctions),
  })

  await statisticsData.save()

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
