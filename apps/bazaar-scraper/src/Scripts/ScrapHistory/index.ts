import { History } from 'Data'
import { broadcast, coloredText, Timer } from 'logging'
import ScrapServers from 'Scripts/ScrapServers'
import * as task from './tasks'

const SCRIPT_NAME = coloredText('ScrapHistory', 'highlight')

const main = async (): Promise<void> => {
  const timer = new Timer()
  broadcast(`Starting ${SCRIPT_NAME} script routine`, 'success')

  await ScrapServers()

  const historyData = new History()
  await historyData.load()

  const unscrapedIds = historyData.getUnscrapedIds(
    await task.fetchHighestAuctionId(),
  )

  if (unscrapedIds.length) {
    await task.fetchUnscrapedAuctions(unscrapedIds, historyData)
  }

  const maturedIds = historyData.getMaturedAuctionIds()
  if (maturedIds.length) {
    await task.fetchMaturedAuctions(maturedIds, historyData)
  }

  broadcast(
    `${SCRIPT_NAME} script routine finished in ${timer.elapsedTime()}`,
    'success',
  )
}

export default main
